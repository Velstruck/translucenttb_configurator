# TranslucentTB Configs

A modern, web-based configurator and AI generator for [TranslucentTB](https://github.com/TranslucentTB/TranslucentTB), the popular Windows taskbar utility. 

This Next.js application allows users to visually build, preview, and generate dynamic configurations for how their taskbar reacts to various Windows states (Desktop, Maximized Window, Start Menu Opened, etc.).

## Features

- 🖥️ **Manual Builder & Visualizer:** Select from built-in presets (Dynamic Glass, Midnight Slate, Nordic Frost, Minimalist) and instantly see how your taskbar will look across different Windows simulation states using the mock desktop environment.
- 🤖 **AI Studio:** Powered by Google Gemini. Describe your perfect taskbar vibe in natural language (e.g., *"Make it completely transparent on the desktop, but blur with a dark red tint when a window is maximized"*) and the AI will generate the strict JSON configuration for you.
- 💾 **Cloud Dashboard:** Sign in with Clerk to securely save up to 10 of your favorite configurations to your personal dashboard (powered by Supabase) for easy retrieval and copying later.
- 📋 **One-Click Copy:** Easily copy the generated JSON directly to your clipboard to paste into your TranslucentTB `config.json` file.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS & Framer Motion
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **AI Engine:** Google Gemini (Structured JSON Outputs)

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the `.env.example` file to `.env.local` and add your API keys (Clerk, Supabase, Gemini).
3. Set up the Supabase database using the included `supabase_setup.sql` script.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
