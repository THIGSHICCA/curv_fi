"use client";

import { useState } from "react";
import BudgetInput from "@/components/BudgetInput";
import BudgetVisualization from "@/components/GeneratedBudget";

export default function DashboardPage() {
  const [showBudget, setShowBudget] = useState(false);
  const [formData, setFormData] = useState({
    requirements: "",
    durationWeeks: "",
    avgIncome: "",
    avgExpenses: "",
    budgetCurrency: "", // client currency
    agencyCountry: "",
    clientCountry: "",
  });

  const [budgetOutput, setBudgetOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateBudget = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Map frontend formData to backend expected format
      const payload = {
        projectRequirement: formData.requirements,
        agencyCountry: formData.agencyCountry,
        clientCountry: formData.clientCountry,
        clientCurrency: formData.budgetCurrency || "USD",
      };

      const res = await fetch("/api/GeminiApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setBudgetOutput(data);
        setShowBudget(true);
      } else {
        alert(data.error || "Failed to generate budget");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-viridian-50 p-6 md:p-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-center">
        <BudgetInput
          formData={formData}
          setFormData={setFormData}
          onGenerate={handleGenerateBudget}
          shrink={showBudget}
        />

        {loading && (
          <p className="text-lg text-center">Calculating budget...</p>
        )}

        {showBudget && budgetOutput && (
          <BudgetVisualization
            total_budget={budgetOutput.total_budget}
            allocation_breakdown={budgetOutput.allocation_breakdown}
            fundManagement={budgetOutput.fundManagement}
            clientCurrency={budgetOutput.clientCurrency}
          />
        )}
      </div>
    </div>
  );
}
