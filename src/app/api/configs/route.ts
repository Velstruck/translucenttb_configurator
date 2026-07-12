import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { MAX_SAVED_CONFIGS } from "@/lib/constants";

// GET — Fetch all configs for the current user
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("saved_configs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch configurations." },
        { status: 500 }
      );
    }

    return NextResponse.json({ configs: data, count: data.length });
  } catch (error) {
    console.error("GET /api/configs error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// POST — Save a new config (with 10-config limit)
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, config_json } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a title for your configuration." },
        { status: 400 }
      );
    }

    if (!config_json || !config_json.desktop_appearance) {
      return NextResponse.json(
        { error: "Invalid configuration data." },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Check the current count
    const { count, error: countError } = await supabase
      .from("saved_configs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      console.error("Supabase count error:", countError);
      return NextResponse.json(
        { error: "Failed to check config limit." },
        { status: 500 }
      );
    }

    if (count !== null && count >= MAX_SAVED_CONFIGS) {
      return NextResponse.json(
        {
          error: `You have reached the maximum of ${MAX_SAVED_CONFIGS} saved configurations. Please delete an existing one to save a new one.`,
        },
        { status: 403 }
      );
    }

    // Insert the new config
    const { data, error: insertError } = await supabase
      .from("saved_configs")
      .insert({
        user_id: userId,
        title: title.trim(),
        config_json,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ config: data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/configs error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// DELETE — Remove a config by ID
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const configId = searchParams.get("id");

    if (!configId) {
      return NextResponse.json(
        { error: "Config ID is required." },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verify ownership before deleting
    const { data: existing, error: fetchError } = await supabase
      .from("saved_configs")
      .select("id")
      .eq("id", configId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Configuration not found or access denied." },
        { status: 404 }
      );
    }

    const { error: deleteError } = await supabase
      .from("saved_configs")
      .delete()
      .eq("id", configId)
      .eq("user_id", userId);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/configs error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
