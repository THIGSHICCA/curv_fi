'use client';

import { useState } from 'react';
import BudgetInput from '@/components/BudgetInput';
import GeneratedBudget from '@/components/GeneratedBudget';

export default function DashboardPage() {
  const [showBudget, setShowBudget] = useState(false);
  const [formData, setFormData] = useState({
    avgIncome: '', // optional
    avgExpenses: '', // optional
    requirements: '',
    durationWeeks: '',
    budgetCurrency: '',
    agencyCountry: '',
    clientCountry: '',
  });

  // Example budget calculation logic
  const calculateBudget = () => {
    const totalIncome = parseFloat(formData.avgIncome) || 0;
    const totalExpenses = parseFloat(formData.avgExpenses) || 0;

    // Simple example allocation: 50% dev, 20% marketing, remaining = cashflow
    const dev = totalIncome * 0.5;
    const marketing = totalIncome * 0.2;
    const remaining = totalIncome - dev - marketing - totalExpenses;

    return { dev, marketing, remaining };
  };

  const budget = calculateBudget();

  return (
    <div className="min-h-screen bg-gray-100 p-4 transition-all duration-500">
      <div className={`flex flex-col md:flex-row gap-4 transition-all duration-500`}>
        {/* Budget Input */}
        <BudgetInput
          formData={formData}
          setFormData={setFormData}
          onGenerate={() => setShowBudget(true)}
          shrink={showBudget} // shrink input div after generate
        />

        {/* Generated Budget */}
        {showBudget && (
          <GeneratedBudget
            budget={budget}
            budgetCurrency={formData.budgetCurrency}
            durationWeeks={formData.durationWeeks}
            agencyCountry={formData.agencyCountry}
            clientCountry={formData.clientCountry}
            requirements={formData.requirements}
          />
        )}
      </div>
    </div>
  );
}
