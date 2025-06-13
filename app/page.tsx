"use client";

import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setSearchTerm } from "@/lib/features/customerSlice";
import { Sidebar } from "@/components/Sidebar";
import { CustomerTable } from "@/components/CustomerTable";
import { AddCustomerModal } from "@/components/AddCustomerModal";
import { AnalyticsSidebar } from "@/components/AnalyticsSidebar";
import { Plus, Search, Filter, RefreshCw, Grid3X3 } from "lucide-react";
import Image from "next/image";
import imageklrga from "@/assets/img1.jpg";

const tabs = [
  { name: "Customer", active: true },
  { name: "Promo", active: false },
  { name: "Voucher", active: false },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    customers,
    searchTerm,
    sortField,
    sortDirection,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.customers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [customers, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedCustomers.length / itemsPerPage
  );
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="p-6 pb-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Customer
          </h1>
          <p className="text-gray-500 text-sm pt-2">
            You can manage and organize your customer and other things here
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="border-b border-gray-200 flex justify-end">
            <nav className="-mb-px flex space-x-16">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`relative py-3 px-4 font-semibold text-base transition-colors ${
                    tab.active
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[160%] after:h-[3px] after:bg-blue-500 after:rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="xl:flex">
          {/* Left Content */}
          <div className="flex-1 px-6">
            {/* Customer Management Section - Matching Reference Design */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl relative overflow-hidden h-56">
              {/* Background Pattern/Image Area */}
              <div className="absolute right-0 top-0 h-full w-2/5">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${imageklrga.src})`,
                    clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-white text-3xl font-bold mb-3">
                    Customer
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed max-w-md">
                    On this menu you will be able to create, edit, and also
                    delete
                    <br />
                    the customer. Also you can manage it easily.
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 border border-white/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Customer</span>
                  </button>

                  {/* Search Box */}
                  <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm flex-1 max-w-md">
                    <div className="flex items-center px-3 text-gray-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search Customer..."
                      value={searchTerm}
                      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                      className="px-2 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none text-sm flex-1 min-w-0 bg-transparent"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2.5 text-white text-sm font-medium transition-colors">
                      Search
                    </button>
                  </div>

                  <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2.5 rounded-lg text-sm text-white transition-all duration-200 border border-white/20">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2.5 rounded-lg text-sm text-white transition-all duration-200 border border-white/20">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>

                  <button className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 border border-white/20 text-white">
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <CustomerTable
              customers={paginatedCustomers}
              totalPages={totalPages}
            />
          </div>

          <AnalyticsSidebar />
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
