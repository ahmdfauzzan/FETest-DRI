"use client";

import { useState, useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setSearchTerm } from "@/lib/features/customerSlice";
import { Sidebar } from "@/components/Sidebar";
import { CustomerTable } from "@/components/CustomerTable";
import { AddCustomerModal } from "@/components/AddCustomerModal";
import { AnalyticsSidebar } from "@/components/AnalyticsSidebar";
import { Plus, Search, Filter, RefreshCw, Grid3X3, Menu } from "lucide-react";

const tabs = [
  { name: "Customer", active: true },
  { name: "Promo", active: false },
  { name: "Voucher", active: false },
];

function HomeContent() {
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Customer</h1>
          <div className="w-9"></div> {/* Spacer for centering */}
        </div>

        {/* Header - Desktop */}
        <div className="hidden lg:block p-6 pb-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Customer
          </h1>
          <p className="text-gray-500 text-sm pt-2">
            You can manage and organize your customer and other things here
          </p>
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-6 pb-4">
          <div className="border-b border-gray-200 flex justify-center lg:justify-end">
            <nav className="-mb-px flex space-x-8 lg:space-x-16 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`relative py-3 px-2 lg:px-4 font-semibold text-sm lg:text-base transition-colors whitespace-nowrap ${
                    tab.active
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:w-[120%] lg:after:w-[160%] after:h-[3px] after:bg-blue-500 after:rounded-full"
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
          <div className="flex-1 px-4 lg:px-6">
            {/* Customer Management Section - Responsive Design */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl relative overflow-hidden">
              {/* Background Pattern/Image Area - Responsive */}
              <div className="absolute right-0 top-0 h-full w-1/3 md:w-2/5 opacity-20 md:opacity-100">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800")`,
                    clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                />
              </div>

              {/* Content - Responsive */}
              <div className="relative z-10 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
                    Customer
                  </h2>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-md">
                    On this menu you will be able to create, edit, and also
                    delete the customer. Also you can manage it easily.
                  </p>
                </div>

                {/* Action Bar - Responsive Layout */}
                <div className="space-y-3 md:space-y-0 md:flex md:items-center md:gap-3 md:flex-wrap">
                  {/* Add Customer Button */}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 border border-white/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Customer</span>
                  </button>

                  {/* Search Box - Full width on mobile */}
                  <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm md:flex-1 md:max-w-sm lg:max-w-md">
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
                    <button className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4 py-2.5 text-white text-sm font-medium transition-colors">
                      Search
                    </button>
                  </div>

                  {/* Action Buttons - Hide on very small screens, show as row on larger mobile */}
                  <div className="flex space-x-2 md:space-x-3">
                    <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2.5 rounded-lg text-sm text-white transition-all duration-200 border border-white/20">
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">Filter</span>
                    </button>

                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2.5 rounded-lg text-sm text-white transition-all duration-200 border border-white/20"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <button className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 border border-white/20 text-white">
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
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

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}
