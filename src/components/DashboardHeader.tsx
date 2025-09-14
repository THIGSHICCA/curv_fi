"use client";

import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaCoins } from "react-icons/fa";

interface DashboardHeaderMinimalProps {
  onLogout: () => void;
}

const DashboardHeaderMinimal: React.FC<DashboardHeaderMinimalProps> = ({
  onLogout,
}) => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("/api/credit", {
          headers: { Authorization: `Bearer ${token}` },
        });

        interface CreditResponse {
          coins: number;
        }

        let data: CreditResponse = { coins: 0 };
        if (res.ok) {
          try {
            data = (await res.json()) as CreditResponse;
          } catch {
            console.warn("Failed to parse JSON from /api/credit");
          }
        } else {
          console.error(`Credit API error: ${res.status}`);
        }

        setCredits(data.coins ?? 0);
      } catch (err) {
        console.error("Fetch credits failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-white/20 
                 px-4 py-3 flex justify-end items-center gap-4 rounded-2xl shadow-lg">
      {/* Credits */}
      <div
        className="flex items-center gap-1 bg-white/0 backdrop-blur-sm border border-white/30 
                      text-viridian-900 dark:text-white px-3 py-1 rounded-full 
                      text-sm font-semibold shadow-sm">
        <FaCoins className="w-3 h-3 text-viridian-700 dark:text-yellow-400" />
        {loading ? "..." : credits}
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="bg-viridian-600/90 hover:bg-viridian-700 text-white 
                   p-2 rounded-full transition-colors shadow-md"
        title="Logout">
        <FaSignOutAlt className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DashboardHeaderMinimal;
