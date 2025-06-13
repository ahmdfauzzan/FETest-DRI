"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  UtensilsCrossed,
  Palette,
  FileText,
  UserCog,
  Settings,
  ChevronLeft,
  Menu,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logosqure.png";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", badge: "3" },
  { icon: Package, label: "Stock" },
  { icon: Users, label: "Customer", active: true },
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Palette, label: "Design" },
  { icon: FileText, label: "Report" },
  { icon: UserCog, label: "Role & Admin" },
  { icon: Settings, label: "Settings" },
];

const integrationItems = [
  { icon: Package, label: "Stock" },
  { icon: Package, label: "Supply" },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${className}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {!isCollapsed && <Image src={logo} alt="Logo" className="h-6" />}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform text-gray-400 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          {!isCollapsed && (
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Menu
            </p>
          )}
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = item.active;
              return (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive
                          ? "text-blue-700"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {item.badge && !isCollapsed && (
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="p-4">
          {!isCollapsed && (
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Integration
            </p>
          )}
          <nav className="space-y-1">
            {integrationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">SN</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Savannah N
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Food Quality Manager
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
