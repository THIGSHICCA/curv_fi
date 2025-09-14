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
  shrink?: boolean;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  formData,
  setFormData,
  onGenerate,
  shrink = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center mx-auto md:mx-10 md:py-20">
      {/* Card */}
      <div
        className="bg-gradient-to-br from-viridian-50 to-viridian-200 text-gray-200  p-4 md:p-12 rounded-3xl shadow-2xl border border-gray-200 
        transition-all duration-500 "
        
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-viridian-900">
          Agency Budget Inputs
        </h2>

        {/* Avg Income & Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 ">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Average Annual Income (Optional)
            </label>
            <input
              type="number"
              name="avgIncome"
              value={formData.avgIncome || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Average Annual Expenses (Optional)
            </label>
            <input
              type="number"
              name="avgExpenses"
              value={formData.avgExpenses || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-700 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-2 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 ">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements || ''}
            onChange={handleChange}
            rows={3}
            className="p-2 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full resize-y"
            placeholder="Describe the client or project requirements"
          />
        </div>

        {/* Duration & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Expected Duration (weeks)</label>
            <input
              type="number"
              name="durationWeeks"
              value={formData.durationWeeks || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Budget Currency</label>
            <select
              name="budgetCurrency"
              value={formData.budgetCurrency || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            >
              <option value=""></option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        {/* Countries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Agency Country</label>
            <input
              type="text"
              name="agencyCountry"
              value={formData.agencyCountry || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Client Country</label>
            <input
              type="text"
              name="clientCountry"
              value={formData.clientCountry || ''}
              onChange={handleChange}
              className="p-3 text-black border border-gray-300 rounded-xl focus:border-viridian-500 focus:ring-2 focus:ring-viridian-200 transition w-full"
            />
          </div>
        </div>

        <button
          className="bg-viridian-600 hover:bg-viridian-700 text-white font-semibold py-1 rounded-xl w-full transition-colors shadow-md text-lg"
          onClick={onGenerate}
        >
          Generate Financial Plan
        </button>
      </div>
    </div>
  );
};

export default BudgetInput;
