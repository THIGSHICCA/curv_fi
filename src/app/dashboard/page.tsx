'use client';

import { useState } from 'react';
import BudgetInput from '@/components/BudgetInput';
import GeneratedBudget from '@/components/GeneratedBudget';

export default function DashboardPage() {
  const [showBudget, setShowBudget] = useState(false);
  const [formData, setFormData] = useState({
    requirements: '',
    durationWeeks: '',
    budgetCurrency: '', // e.g., 'LKR', 'USD'
    agencyCountry: '',
    clientCountry: '',
  });

  // Example backend-like budget object
  const backendBudgetExample = {
    projectRequirement: formData.requirements,
    agencyCountry: formData.agencyCountry,
    clientCountry: formData.clientCountry,
    clientCurrency: formData.budgetCurrency || 'USD',
    suggested_team_size: 1,
    total_budget: { min: 40330, max: 44580 },
    allocation_breakdown: [
      {
        category: 'Salaries',
        amount: { min: 25650, max: 28350 },
        percentage: { min: 64, max: 64 },
      },
      {
        category: 'Software & Tools',
        amount: { min: 3070, max: 3410 },
        percentage: { min: 8, max: 8 },
      },
      {
        category: 'Marketing & Sales',
        amount: { min: 4650, max: 5145 },
        percentage: { min: 12, max: 12 },
      },
      {
        category: 'Contingency',
        amount: { min: 6940, max: 7685 },
        percentage: { min: 17, max: 17 },
      },
    ],
    fundManagement: {
      upfront: {
        min: 16132,
        max: 17832,
        description: 'Covers labor & essential tools. Pay upfront to ensure project start.',
      },
      milestone: {
        min: 24198,
        max: 26748,
        description:
          'Covers remaining costs. Pay after milestone completion to maintain positive cashflow.',
      },
      advice:
        'Allocate funds in order: Salaries → Tools → Contingency → Profit. Track weekly to ensure cashflow positivity.',
    },
  };

  return (
    <div className=" min-h-screen bg-viridian-50 p-6 md:p-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row  items-start justify-center">
        {/* Budget Input */}
        <BudgetInput
          formData={formData}
          setFormData={setFormData}
          onGenerate={() => setShowBudget(true)}
          shrink={showBudget}
        />

        {/* Generated Budget */}
        {showBudget && (
          <GeneratedBudget
  budgetCurrency={backendBudgetExample.clientCurrency}
  total_budget={backendBudgetExample.total_budget}
  allocation_breakdown={backendBudgetExample.allocation_breakdown}
  suggested_team_size={backendBudgetExample.suggested_team_size}
  fundManagement={backendBudgetExample.fundManagement}
/>
 )}
    </div>
    </div>
  );
}
