import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Default budget categories
const DEFAULT_CATEGORIES = [
  "Salaries",
  "Software & Tools",
  "Marketing & Sales",
  "Contingency",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectRequirements = "Beginner project",
      budgetCurrency = "LKR",
      from = "Sri Lanka",
      to = "Sri Lanka",
    } = body;

    // Default numeric calculation for a beginner project
    const totalBudget = 50000; // default suggestion, AI can override
    const allocationBreakdown = DEFAULT_CATEGORIES.map((cat) => ({
      category: cat,
      amount: Math.round(totalBudget / DEFAULT_CATEGORIES.length),
      percentage: Math.round(100 / DEFAULT_CATEGORIES.length),
    }));

    // Build prompt for Gemini AI
    const prompt = `
You are an AI assistant that helps beginner freelance developers or small agencies figure out how much they can charge for a simple project and how to manage the funds.

Project Details:
- Project Requirements: ${projectRequirements}
- From Country: ${from}
- To Country: ${to}
- Budget Currency: ${budgetCurrency}

Output JSON schema:
{
  "suggested_team_size": number, 
  "total_budget": number, 
  "allocation_breakdown": [
    { "category": string, "amount": number, "percentage": number }
  ],
  "fund_management": string
}

Rules:
1. Assume this is a **first project** for a beginner with **0 experience**.
2. Suggest a **reasonable total charge** in the given currency.
3. Suggest a **practical team size**, even if small (1-2 people).
4. Allocate budget across categories (Salaries, Tools, Marketing, Contingency) with amounts and percentages. Percentages must sum to 100.
5. Include advice on **fund management** for beginners (e.g., saving, reinvesting, emergency funds).
6. Round all numeric values to nearest integer.
7. Return **valid JSON only**, no Markdown or extra text.
8. Keep everything realistic for a small beginner project.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY || "",
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/```json|```/g, "")
        .trim() || "{}";

    let aiJson;
    try {
      aiJson = JSON.parse(aiText);
    } catch {
      aiJson = { raw: aiText, error: "Failed to parse JSON" };
    }

    return NextResponse.json({
      projectRequirements,
      budgetCurrency,
      total_budget: totalBudget,
      allocation_breakdown: allocationBreakdown,
      ...aiJson,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
