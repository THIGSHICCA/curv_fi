'use client';

import React from 'react';

interface GeneratedBudgetProps {
  budget: {
    dev: number;
    marketing: number;
    remaining: number;
  };
}

const GeneratedBudget: React.FC<GeneratedBudgetProps> = ({ budget }) => {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md w-full md:w-1/2 transition-all duration-500">
      <h2 className="text-2xl  font-bold mb-4">Generated Budget</h2>
      <p>Development: ${budget.dev.toFixed(2)}</p>
      <p>Marketing: ${budget.marketing.toFixed(2)}</p>
      <p>Remaining: ${budget.remaining.toFixed(2)}</p>
    </div>
  );
};

export default GeneratedBudget;
