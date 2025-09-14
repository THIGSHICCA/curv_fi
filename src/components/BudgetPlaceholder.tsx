"use client";
import { FaChartPie, FaRegLightbulb } from "react-icons/fa";

const BudgetPlaceholder: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-2xl shadow-lg p-8 border border-white/20 h-full 
      bg-white/10 backdrop-blur-md">
      <FaChartPie className="text-viridian-600 text-5xl mb-4 drop-shadow-md" />
      <h3 className="text-2xl font-bold text-viridian-900 dark:text-white mb-3">
        Your Budget Plan Will Appear Here
      </h3>
      <p className="text-viridian-700 dark:text-gray-200 mb-6">
        Fill in the details on the left and click{" "}
        <span className="font-semibold">"Generate Financial Plan"</span> to get
        a detailed breakdown.
      </p>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-sm text-viridian-800 dark:text-gray-100 w-full max-w-md">
        <div className="flex items-start gap-2 mb-2">
          <FaRegLightbulb className="text-viridian-500 mt-1" />
          <p>
            <strong>Example:</strong> A web project might allocate{" "}
            <span className="font-semibold">40% labor</span>,{" "}
            <span className="font-semibold">20% overhead</span>,{" "}
            <span className="font-semibold">10% contingency</span>, and{" "}
            <span className="font-semibold">30% profit</span>.
          </p>
        </div>
        <p className="text-xs text-viridian-600 dark:text-gray-300">
          Tip: Add detailed requirements for a more accurate estimate.
        </p>
      </div>
    </div>
  );
};

export default BudgetPlaceholder;
