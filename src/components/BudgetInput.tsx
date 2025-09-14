"use client";

import React from "react";

export interface FormData {
  requirements: string;
  durationWeeks: string;
  avgIncome: string;
  avgExpenses: string;
  budgetCurrency: string;
  agencyCountry: string;
  clientCountry: string;
}

interface BudgetInputProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onGenerate: () => void;
  shrink?: boolean;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  formData,
  setFormData,
  onGenerate,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center mx-auto">
      <div
        className="bg-white/10 backdrop-blur-lg border border-white/20 
        p-8 md:p-10 rounded-3xl shadow-xl w-full transition-all duration-500">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-viridian-900 dark:text-white">
          Budget Inputs
        </h2>

        {/* Requirements */}
        <div className="mb-6 flex flex-col">
          <label className="mb-2 text-sm font-medium text-viridian-800 dark:text-gray-200">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={20}
            placeholder="Describe the client or project requirements"
            className="p-3 text-viridian-900 dark:text-white bg-white/0 backdrop-blur-sm 
              border border-white/20 rounded-xl focus:border-viridian-500 focus:ring-2 
              focus:ring-viridian-200 transition w-full resize-y"
          />
        </div>

        {/* 3 Inputs per line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Budget Currency */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-viridian-800 dark:text-gray-200">
              Budget Currency
            </label>
            <select
              name="budgetCurrency"
              value={formData.budgetCurrency}
              onChange={handleChange}
              className="p-3 text-viridian-900 dark:text-white bg-white/0 backdrop-blur-sm 
                border border-white/20 rounded-xl focus:border-viridian-500 
                focus:ring-2 focus:ring-viridian-200 transition w-full">
              <option value="">Select currency</option>
              <option value="USD">USD</option>
              <option value="LKR">LKR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Agency Country */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-viridian-800 dark:text-gray-200">
              Agency Country
            </label>
            <input
              type="text"
              name="agencyCountry"
              value={formData.agencyCountry}
              onChange={handleChange}
              placeholder="Enter agency country"
              className="p-3 text-viridian-900 dark:text-white bg-white/0 backdrop-blur-sm 
                border border-white/20 rounded-xl focus:border-viridian-500 focus:ring-2 
                focus:ring-viridian-200 transition w-full"
            />
          </div>

          {/* Client Country */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-viridian-800 dark:text-gray-200">
              Client Country
            </label>
            <input
              type="text"
              name="clientCountry"
              value={formData.clientCountry}
              onChange={handleChange}
              placeholder="Enter client country"
              className="p-3 text-viridian-900 dark:text-white bg-white/0 backdrop-blur-sm 
                border border-white/20 rounded-xl focus:border-viridian-500 focus:ring-2 
                focus:ring-viridian-200 transition w-full"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          className="bg-viridian-600 hover:bg-viridian-700 text-white font-semibold 
            py-3 rounded-xl w-full transition-all shadow-md text-lg">
          Generate Financial Plan
        </button>
      </div>
    </div>
  );
};

export default BudgetInput;
