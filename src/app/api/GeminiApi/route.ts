import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Default categories for allocation
const DEFAULT_CATEGORIES = [
  "Salaries",
  "Software & Tools",
  "Marketing & Sales",
  "Contingency",
];

// Default hourly rates by agency country
const DEFAULT_HOURLY_RATES: Record<string, number> = {
  "Sri Lanka": 300,
  India: 250,
  USA: 20,
  UK: 18,
};

// Simple exchange rates (agency -> client)
const EXCHANGE_RATES: Record<string, number> = {
  "LKR->LKR": 1,
  "LKR->USD": 1 / 350,
  "LKR->EUR": 1 / 370,
  "USD->USD": 1,
  "USD->LKR": 350,
};

// Helper: round to nearest 10 and generate range
function getRoundedRange(value: number, percent: number = 5) {
  const min = Math.floor((value * (1 - percent / 100)) / 10) * 10;
  const max = Math.ceil((value * (1 + percent / 100)) / 10) * 10;
  return { min, max };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectRequirement,
      agencyCountry = "Sri Lanka",
      clientCountry = "Sri Lanka",
      clientCurrency = "LKR",
    } = body;

    // 1️⃣ Ask AI to classify project size and estimated hours
    const prompt = `
You are an AI assistant. Given a short software project description, classify its size as small, medium, or large and suggest approximate total hours for each role: frontend, backend, PM, QA.
Return only JSON.

Project: "${projectRequirement}"

Output JSON format:
{
  "project_size": "small|medium|large",
  "estimated_hours": {
    "frontend": number,
    "backend": number,
    "pm": number,
    "qa": number
  }
}
`;

    const aiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const aiData = await aiResponse.json();
    const aiText =
      aiData.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/```json|```/g, "")
        .trim() || "{}";

    let aiJson: any;
    try {
      aiJson = JSON.parse(aiText);
    } catch {
      // fallback for beginner small project
      aiJson = {
        project_size: "small",
        estimated_hours: { frontend: 20, backend: 10, pm: 5, qa: 5 },
      };
    }

    const hours = aiJson.estimated_hours;
    const projectSize = aiJson.project_size;

    // 2️⃣ Budget calculation in agency currency
    const hourlyRate = DEFAULT_HOURLY_RATES[agencyCountry] || 300;
    const laborCost =
      (hours.frontend + hours.backend + hours.pm + hours.qa) * hourlyRate;

    const overhead = Math.round(laborCost * 0.12); // 12% for tools/licenses
    const contingency = Math.round((laborCost + overhead) * 0.08); // 8%
    const profit = Math.round((laborCost + overhead + contingency) * 0.3); // 30%
    const totalBudget = laborCost + overhead + contingency + profit;

    // 3️⃣ Currency conversion to client currency
    const exchangeKey = `${
      agencyCountry === "Sri Lanka" ? "LKR" : "USD"
    }->${clientCurrency}`;
    const conversionRate = EXCHANGE_RATES[exchangeKey] || 1;

    const laborClient = Math.round(laborCost * conversionRate);
    const overheadClient = Math.round(overhead * conversionRate);
    const contingencyClient = Math.round(contingency * conversionRate);
    const profitClient = Math.round(profit * conversionRate);
    const totalBudgetClient = Math.round(totalBudget * conversionRate);

    // 4️⃣ Convert each numeric to range
    const laborRange = getRoundedRange(laborClient);
    const overheadRange = getRoundedRange(overheadClient);
    const contingencyRange = getRoundedRange(contingencyClient);
    const profitRange = getRoundedRange(profitClient);
    const totalBudgetRange = getRoundedRange(totalBudgetClient);
    function getAllocationPercentages(
      labor: number,
      overhead: number,
      contingency: number,
      profit: number,
      total: number
    ) {
      return {
        salaries: Math.round((labor / total) * 100),
        tools: Math.round((overhead / total) * 100),
        marketing: Math.round((profit / 2 / total) * 100),
        contingency: Math.round(((contingency + profit / 2) / total) * 100),
      };
    }

    const percentages = getAllocationPercentages(
      laborClient,
      overheadClient,
      contingencyClient,
      profitClient,
      totalBudgetClient
    );

    const allocationBreakdown = DEFAULT_CATEGORIES.map((cat) => {
      let amount: any;
      let percent = 0;
      switch (cat) {
        case "Salaries":
          amount = laborRange;
          percent = percentages.salaries;
          break;
        case "Software & Tools":
          amount = overheadRange;
          percent = percentages.tools;
          break;
        case "Marketing & Sales":
          amount = {
            min: Math.round(profitRange.min / 2),
            max: Math.round(profitRange.max / 2),
          };
          percent = percentages.marketing;
          break;
        case "Contingency":
          amount = {
            min: contingencyRange.min + Math.round(profitRange.min / 2),
            max: contingencyRange.max + Math.round(profitRange.max / 2),
          };
          percent = percentages.contingency;
          break;
      }
      return { category: cat, amount, percentage: percent };
    });

    // 7️⃣ Fund management
    const upfrontPercentage = 0.4;
    const milestonePercentage = 0.6;
    const fundManagement = `
Request approx. ${Math.round(
      upfrontPercentage * totalBudgetRange.min
    )} - ${Math.round(
      upfrontPercentage * totalBudgetRange.max
    )} ${clientCurrency} upfront.
Use remaining approx. ${Math.round(
      milestonePercentage * totalBudgetRange.min
    )} - ${Math.round(
      milestonePercentage * totalBudgetRange.max
    )} ${clientCurrency} after milestone completion.
Track weekly to ensure positive cashflow.
`;

    return NextResponse.json({
      projectRequirement,
      agencyCountry,
      clientCountry,
      clientCurrency,
      project_size: projectSize,
      suggested_team_size: 1,
      total_budget: totalBudgetRange,
      labor_cost: laborRange,
      overhead: overheadRange,
      contingency: contingencyRange,
      profit: profitRange,
      allocation_breakdown: allocationBreakdown,
      fundManagement,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate budget" },
      { status: 500 }
    );
  }
}
