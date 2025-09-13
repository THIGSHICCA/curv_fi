'use client';

import React from 'react';

interface BudgetInputProps {
  formData: {
    avgIncome?: string;
    avgExpenses?: string;
    requirements: string;
    durationWeeks: string;
    budgetCurrency: string;
    agencyCountry: string;
    clientCountry: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      avgIncome?: string;
      avgExpenses?: string;
      requirements: string;
      durationWeeks: string;
      budgetCurrency: string;
      agencyCountry: string;
      clientCountry: string;
    }>
  >;
  onGenerate: () => void;
  shrink?: boolean; // control width
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  formData,
  setFormData,
  onGenerate,
  shrink = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`
        bg-white text-black p-6 rounded-lg shadow-md
        transition-all duration-500
        ${shrink ? 'w-full md:w-1/2' : 'w-full'}
      `}
    >
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Agency Budget Inputs
      </h2>

      {/* Row 1: Avg Income & Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Average Annual Income (Optional)</label>
          <input
            type="number"
            name="avgIncome"
            className="p-2 border rounded w-full"
            value={formData.avgIncome || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Average Annual Expenses (Optional)</label>
          <input
            type="number"
            name="avgExpenses"
            className="p-2 border rounded w-full"
            value={formData.avgExpenses || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2: Requirements */}
      <div className="mb-3">
        <label className="mb-1 font-medium block">Requirements</label>
        <textarea
          name="requirements"
          className="p-2 border rounded w-full"
          rows={4}
          value={formData.requirements || ''}
          onChange={handleChange}
          placeholder="Describe the client or project requirements"
        />
      </div>

      {/* Row 3: Duration & Budget Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Expected Duration (weeks)</label>
          <input
            type="number"
            name="durationWeeks"
            className="p-2 border rounded w-full"
            value={formData.durationWeeks || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Budget Currency</label>
          <select
            name="budgetCurrency"
            value={formData.budgetCurrency || ''}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Budget Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      {/* Row 4: Agency Country & Client Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Agency Country</label>
          <input
            type="text"
            name="agencyCountry"
            className="p-2 border rounded w-full"
            value={formData.agencyCountry || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Client Country</label>
          <input
            type="text"
            name="clientCountry"
            className="p-2 border rounded w-full"
            value={formData.clientCountry || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-700"
        onClick={onGenerate}
      >
        Generate Financial Plan
      </button>
    </div>
  );
};

export default BudgetInput;
