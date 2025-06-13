"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  deleteCustomer,
  setSorting,
  setCurrentPage,
  type Customer,
} from "@/lib/features/customerSlice";
import {
  Eye,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
  totalPages: number;
}

const levelColors = {
  Warga:
    "inline-flex px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700",
  Juragan:
    "inline-flex px-3 py-1 text-xs font-medium bg-cyan-100 text-cyan-700",
  Sultan:
    "inline-flex px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700",
  Konglomerat:
    "inline-flex px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700",
};

export function CustomerTable({ customers, totalPages }: CustomerTableProps) {
  const dispatch = useAppDispatch();
  const { sortField, sortDirection, currentPage } = useAppSelector(
    (state) => state.customers
  );

  const handleSort = (field: keyof Customer) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    dispatch(setSorting({ field, direction }));
  };

  const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(customerId));
    }
  };

  const formatCurrency = (amount: number) => {
    return `IDR ${amount.toLocaleString("id-ID")}`;
  };

  const SortIcon = ({ field }: { field: keyof Customer }) => {
    if (sortField !== field)
      return <ChevronUp className="w-4 h-4 text-gray-300" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    const pageButtonClass = (page: number) =>
      currentPage === page
        ? "px-3 py-2 text-sm rounded-lg transition-colors min-w-[40px] bg-white text-gray-900 border border-gray-200 shadow-sm"
        : "px-3 py-2 text-sm rounded-lg transition-colors min-w-[40px] text-gray-700 hover:bg-gray-100";

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={pageButtonClass(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={pageButtonClass(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-gray-400">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={pageButtonClass(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-gray-400">
            ...
          </span>
        );
      }

      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={pageButtonClass(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-100 hidden md:table-header-group">
            <tr>
              {["name", "level", "favoriteMenu", "totalTransaction"].map(
                (field) => (
                  <th
                    key={field}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-600"
                  >
                    <button
                      onClick={() => handleSort(field as keyof Customer)}
                      className="flex items-center space-x-2 hover:text-gray-900 transition-colors"
                    >
                      <span>
                        {
                          {
                            name: "Customer Name",
                            level: "Level",
                            favoriteMenu: "Favorite Menu",
                            totalTransaction: "Total Transaction",
                          }[field]
                        }
                      </span>
                      <SortIcon field={field as keyof Customer} />
                    </button>
                  </th>
                )
              )}
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b md:table-row flex flex-col md:flex-row"
              >
                <td className="px-6 py-4 text-sm font-bold">
                  <span className="block md:hidden text-gray-500 font-semibold mb-1">
                    Customer Name:
                  </span>
                  {customer.name}
                </td>
                <td className="px-6 py-4">
                  <span className="block md:hidden text-gray-500 font-semibold mb-1">
                    Level:
                  </span>
                  <span className={levelColors[customer.level]}>
                    {customer.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">
                  <span className="block md:hidden text-gray-500 font-semibold mb-1">
                    Favorite Menu:
                  </span>
                  {customer.favoriteMenu}
                </td>
                <td className="px-6 py-4 text-sm font-bold">
                  <span className="block md:hidden text-gray-500 font-semibold mb-1">
                    Total Transaction:
                  </span>
                  {formatCurrency(customer.totalTransaction)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-2">
                    <button className="bg-gray-100 flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hover:border-blue-200">
                      <Eye className="w-4 h-4" />
                      <span>Detail</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition bg-red-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
        <p className="text-sm text-gray-500">
          Showing {customers.length} Data Customers
        </p>
        <div className="flex items-center space-x-1">
          {renderPaginationButtons()}

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors ml-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
