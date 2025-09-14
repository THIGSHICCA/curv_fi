"use client";
import { useState } from "react";
import BackgroundEffects from "@/components/BackgroundEffect";
import BudgetInput from "@/components/BudgetInput";
import BudgetVisualization from "@/components/GeneratedBudget";
import DashboardHeaderMinimal from "@/components/DashboardHeader";
import BudgetPlaceholder from "@/components/BudgetPlaceholder";
import { FullscreenLoader } from "@/components/Loader"; // import loader

export default function DashboardPage() {
  const [showBudget, setShowBudget] = useState(false);
  const [formData, setFormData] = useState({
    requirements: "",
    durationWeeks: "",
    avgIncome: "",
    avgExpenses: "",
    budgetCurrency: "",
    agencyCountry: "",
    clientCountry: "",
  });
  const [budgetOutput, setBudgetOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateBudget = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <BackgroundEffects />

      <div className="min-h-screen z-10 items-center py-10 transition-all duration-500 relative">
        <div className="container mx-auto flex flex-col md:flex-row gap-6">
          {/* Left Side: Input */}
          <BudgetInput
            formData={formData}
            setFormData={setFormData}
            onGenerate={handleGenerateBudget}
          />

          {/* Right Side: Header + Output */}
          <div className="flex-1 flex flex-col gap-4">
            <DashboardHeaderMinimal onLogout={handleLogout} />

            {/* Show states */}
            {!showBudget && <BudgetPlaceholder />}

            {showBudget && budgetOutput && (
              <BudgetVisualization
                total_budget={budgetOutput.total_budget}
                allocation_breakdown={budgetOutput.allocation_breakdown}
                fundManagement={budgetOutput.fundManagement}
                clientCurrency={budgetOutput.clientCurrency}
                suggested_team_size={budgetOutput.suggested_team_size} // ✅ from backend
              />
            )}
          </div>
        </div>

        {/* Fullscreen Loader Overlay */}
        {loading && <FullscreenLoader message="Calculating budget..." />}
      </div>
    </div>
  );
}
