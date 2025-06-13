"use client";

import { TrendingUp } from "lucide-react";

const topMenuItems = [
  { name: "Nasi Goreng Jamur Special Resto Pak Min", rank: 1 },
  { name: "Tongseng Sapi Gurih", rank: 2 },
  { name: "Nasi Gudeg Telur Ceker", rank: 3 },
  { name: "Nasi Ayam serundeng", rank: 4 },
  { name: "Nasi Goreng Seafood", rank: 5 },
];

export function AnalyticsSidebar() {
  return (
    <div className="w-full xl:w-80 bg-[#f9f9f9] px-6 min-h-screen">
      {/* See Analytics Card */}
      <div className="bg-[#6366f1] rounded-2xl p-6 text-white relative overflow-hidden mb-10">
        <h3 className="text-lg mb-32 leading-snug">
          See analytics of
          <br />
          the Customer
          <br />
          Clearly
        </h3>
        <button className="bg-white/20 hover:bg-white/30 text-base px-6 py-3 transition rounded-xl">
          See Analytics
        </button>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Top Menu Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Top Menu{" "}
          <span className="text-orange-500 font-semibold">This Week</span>
        </h3>
        <p className="text-sm text-gray-400 mb-6">10 - 12 Agustus 2023</p>

        <div className="space-y-4">
          {topMenuItems.map((item) => (
            <div
              key={item.rank}
              className={`flex items-start gap-3 ${
                item.rank === 1
                  ? "bg-white p-4 rounded-xl shadow-md relative border border-gray-100"
                  : "text-gray-500 px-2"
              }`}
            >
              <span
                className={`font-semibold text-base ${
                  item.rank === 1 ? "text-black" : ""
                }`}
              >
                {item.rank}.
              </span>
              <p
                className={`leading-relaxed text-base ${
                  item.rank === 1 ? "font-semibold text-black" : ""
                }`}
              >
                {item.name}
              </p>

              {item.rank === 1 && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-sm px-2 py-1 rounded-md font-bold">
                  1
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        <div className="mt-8 h-36 bg-gradient-to-b from-orange-100 to-white rounded-xl flex items-end justify-center p-6 relative overflow-hidden border border-orange-200/40">
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 300 120"
            fill="none"
          >
            <path
              d="M20 90 Q60 70 100 75 Q140 80 180 55 Q220 30 280 35"
              stroke="#f97316"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 90 Q60 70 100 75 Q140 80 180 55 Q220 30 280 35 L280 120 L20 120 Z"
              fill="url(#gradient)"
              fillOpacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 flex items-center space-x-2 text-orange-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Trend Mingguan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
