import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_SYSTEM_PROMPT, TRANSLUCENTTB_SCHEMA } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Parse the user's prompt
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a description for your taskbar." },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: "Prompt is too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: `${GEMINI_SYSTEM_PROMPT}\n\nStrict JSON Schema to follow:\n${JSON.stringify(TRANSLUCENTTB_SCHEMA, null, 2)}`,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    // Generate the config
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse and validate the JSON
    let config;
    try {
      config = JSON.parse(text);
    } catch {
      console.error("Failed to parse Gemini response as JSON:", text);
      return NextResponse.json(
        { error: "AI generated an invalid response. Please try again." },
        { status: 500 }
      );
    }

    // Basic validation: ensure desktop_appearance exists
    if (!config.desktop_appearance || !config.desktop_appearance.accent) {
      return NextResponse.json(
        { error: "AI generated an incomplete configuration. Please try again." },
        { status: 500 }
      );
    }

    // Inject missing properties to ensure complete TranslucentTB config
    config.$schema = "https://TranslucentTB.github.io/settings.schema.json";
    config.ignored_windows = config.ignored_windows || {
      window_class: [],
      window_title: [],
      process_name: [],
    };
    config.disable_saving = config.disable_saving ?? false;
    config.verbosity = config.verbosity || "warn";

    return NextResponse.json({ config });
  } catch (error: unknown) {
    console.error("Generate config error:", error);

    // Handle rate limiting
    if (error instanceof Error && error.message?.includes("429")) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate configuration. Please try again." },
      { status: 500 }
    );
  }
}
