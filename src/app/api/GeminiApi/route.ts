import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Proper Gemini API call
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    // Extract first candidate text
    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
