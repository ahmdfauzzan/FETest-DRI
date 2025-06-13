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
    <div className="w-full xl:w-80 xl:border-l xl:border-gray-200 bg-white">
      <div className="px-6 pb-6">
        {/* Analytics Card - Full Width dengan Margin Negatif */}
        <div className="-mx-6 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 text-white relative overflow-hidden mb-6 xl:mb-8">
          <div className="px-6 py-6 xl:py-8 relative z-10">
            <h3 className="text-lg xl:text-xl font-semibold mb-1 xl:mb-2">
              See analytics of the Customer Clearly
            </h3>
            <p className="text-blue-100 mb-6 xl:mb-8 text-sm">Dengan jelas</p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 xl:px-6 py-2.5 xl:py-3 rounded-lg text-sm font-medium border border-white/20 transition-all duration-200">
              See Analytics
            </button>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <div className="w-full h-full bg-gradient-to-l from-white/30 to-transparent"></div>
          </div>
        </div>

        {/* Top Menu Section */}
        <div className="bg-white rounded-xl border border-gray-100 xl:border-none xl:bg-transparent xl:rounded-none">
          <div className="p-4 xl:p-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Menu Teratas
              </h3>
              <span className="text-sm text-gray-500">Minggu Ini</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">10 - 12 Agustus 2023</p>

            <div className="space-y-4">
              {topMenuItems.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-start space-x-3 group"
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      item.rank === 1
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                    }`}
                  >
                    {item.rank}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors duration-200">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Trend Chart */}
            <div className="mt-8 h-32 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl flex items-end justify-center p-4 relative overflow-hidden border border-orange-100/50">
              <svg
                className="w-full h-full absolute inset-0"
                viewBox="0 0 300 100"
                fill="none"
              >
                <path
                  d="M20 80 Q60 60 100 65 Q140 70 180 45 Q220 20 280 25"
                  stroke="#f97316"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 80 Q60 60 100 65 Q140 70 180 45 Q220 20 280 25 L280 100 L20 100 Z"
                  fill="url(#gradient)"
                  fillOpacity="0.2"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative z-10 flex items-center space-x-2 text-orange-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Trend Mingguan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
