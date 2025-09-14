'use client';

import React from 'react';
import { BiDollar, BiEuro, BiRupee, BiPound, BiCalculator, BiGroup } from 'react-icons/bi';
import BudgetBarChart from './BarChart'; // import the chart component

interface AmountRange { min: number; max: number; }
interface Allocation { category: string; amount: AmountRange; percentage: AmountRange; }
interface FundManagementDetail { min: number; max: number; description: string; }
interface FundManagement { upfront?: FundManagementDetail; milestone?: FundManagementDetail; advice?: string; }

interface GeneratedBudgetProps {
  budgetCurrency?: string;
  total_budget?: AmountRange;
  allocation_breakdown?: Allocation[];
  suggested_team_size?: number;
  fundManagement?: FundManagement;
  projectRequirement?: string;
  agencyCountry?: string;
  clientCountry?: string;
}

const GeneratedBudget: React.FC<GeneratedBudgetProps> = ({
  budgetCurrency = "USD",
  total_budget,
  allocation_breakdown = [],
  suggested_team_size = 1,
  fundManagement = {},
  projectRequirement = "",
  agencyCountry = "",
  clientCountry = "",
}) => {

  const renderCurrencyIcon = () => {
    switch (budgetCurrency.toUpperCase()) {
      case "USD": return <BiDollar className="inline mr-1" />;
      case "EUR": return <BiEuro className="inline mr-1" />;
      case "INR": return <BiRupee className="inline mr-1" />;
      case "GBP": return <BiPound className="inline mr-1" />;
      default: return <span className="inline mr-1">{budgetCurrency}</span>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-viridian-50 to-viridian-200 text-gray-900 p-4 md:p-6 rounded-3xl shadow-2xl border border-gray-200 max-w-3xl mx-20 m-2">

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-viridian-900 p-6 ">
        Generated Budget Plan
      </h2>

      {/* Total Budget & Team Size */}
    {/* Total Budget */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-2">

<div className="flex justify-between items-center bg-white/80 p-3 rounded-xl mx-auto">
  <span className="font-medium text-lg flex items-center gap-2 ">
    <BiCalculator className="text-viridian-700 text-2xl" />:</span>
  <span className="font-bold text-viridian-800 text-xl ">
    {renderCurrencyIcon()}{total_budget?.min?.toLocaleString()} - {renderCurrencyIcon()}{total_budget?.max?.toLocaleString()}
  </span>
</div>

{/* Suggested Team Size */}
<div className="flex justify-between items-center bg-white/80 p-3 rounded-xl shadow mx-auto">
  <span className="font-medium flex items-center gap-2">
    <BiGroup className="text-viridian-700 text-2xl" />
    : {suggested_team_size}
  </span>
</div>
</div>
      {/* Project Info */}
      {(projectRequirement || agencyCountry || clientCountry) && (
        <div className="bg-white/70 p-4 rounded-xl shadow mb-2">
          {projectRequirement && <p><span className="font-medium">Project Requirement:</span> {projectRequirement}</p>}
          {agencyCountry && <p><span className="font-medium">Agency Country:</span> {agencyCountry}</p>}
          {clientCountry && <p><span className="font-medium">Client Country:</span> {clientCountry}</p>}
        </div>
      )}

      {/* Allocation Breakdown as Bar Chart */}
      {allocation_breakdown.length > 0 && (
        <BudgetBarChart allocation_breakdown={allocation_breakdown} budgetCurrency={budgetCurrency} />
      )}

      {/* Fund Management */}
      {fundManagement && (
        <div className="mt-6">
          <h3 className="text-xl text-center font-semibold mb-2 text-viridian-800">Fund Management</h3>

          {fundManagement.upfront && (
            <div className="bg-white/70 p-4 rounded-xl shadow mb-2 border border-gray-200">
              {renderCurrencyIcon()} {fundManagement.upfront.min.toLocaleString()} - {renderCurrencyIcon()} {fundManagement.upfront.max.toLocaleString()}
              <p className="text-gray-700 mt-1">{fundManagement.upfront.description}</p>
            </div>
          )}

          {fundManagement.milestone && (
            <div className="bg-white/70 p-4 rounded-xl shadow mb-3 border border-gray-200">
              {renderCurrencyIcon()} {fundManagement.milestone.min.toLocaleString()} - {renderCurrencyIcon()} {fundManagement.milestone.max.toLocaleString()}
              <p className="text-gray-700 mt-1">{fundManagement.milestone.description}</p>
            </div>
          )}

          {/* Output box for Fund Management advice */}
          {fundManagement.advice && (
            <div className="bg-white/70 p-4 rounded-xl shadow border border-gray-200 mt-3">
              <span className="font-medium">Advice / Notes:</span>
              <p className="text-gray-700 mt-1">{fundManagement.advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratedBudget;
