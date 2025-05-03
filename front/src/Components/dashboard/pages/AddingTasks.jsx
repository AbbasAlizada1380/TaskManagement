// src/Components/AddingTasks.jsx
import React from "react";

const AddingTasks = () => {
    <div className="container mx-auto p-4 md:p-6">
      <ToastContainer position="top-center" autoClose={4000} />
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Taskform
      </h1>

      {!isFormVisible && (
        <div className="flex justify-center items-center mb-5">
          <button
            onClick={() => {
              setIsFormVisible(true);
              resetForm();
            }}
            className="mb-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow hover:shadow-md"
            disabled={isLoading}
          >
            <FiPlus size={18} /> افزودن دوره بل جدید
          </button>
        </div>
      )}

      {/* Add Bill Period Form */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg p-6 md:p-8 max-w-lg mx-auto space-y-5 mb-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-5">
            افزودن دوره بل جدید
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Month Select */}
            <div className="mb-4">
              <label
                htmlFor="month"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                ماه:
              </label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                required
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {hijriMonths.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {/* Year Input */}
            <div className="mb-4">
              <label
                htmlFor="year"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                سال:
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min={currentYear - 10} // Adjust range as needed
                max={currentYear + 10}
                required
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* Form Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white py-2 px-6 rounded-md cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[100px]"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white" /* SVG code */
                ></svg>
              ) : (
                "افزودن"
              )}
            </button>
            <button
              onClick={() => {
                setIsFormVisible(false);
                resetForm();
              }}
              type="button"
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700 cursor-pointer py-2 px-5 rounded-md transition-colors disabled:opacity-50"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      {/* Filter Component */}
      <FilterUnitBills
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        years={years}
        months={hijriMonths}
      />

      {/* Unit Bills Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
        <table className="min-w-full leading-normal border-collapse">
          <thead>
            <tr className="bg-primary text-white text-sm font-semibold uppercase tracking-wider text-center">
              <th className="px-4 py-3 border-b-2 border-gray-200">ماه</th>
              <th className="px-4 py-3 border-b-2 border-gray-200">سال</th>
              <th className="px-4 py-3 border-b-2 border-gray-200">
                مجموع شارژ
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200">
                مجموع پرداختی
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200">
                مجموع باقی
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Map over filtered and paginated bills */}
            {currentUnitBills.map((bill) => (
              <tr
                key={bill.id}
                className="hover:bg-gray-100 border-b border-gray-200 text-center cursor-pointer" // Make row clickable
                onClick={() => openDetailsModal(bill)} // Open modal on row click
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                  {hijriMonths[bill.month - 1]}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                  {bill.year}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {bill.total?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-green-700">
                  {bill.total_paid?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-red-700 font-medium">
                  {bill.total_remainder?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </td>
                {/* Action Buttons Cell */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(bill.id);
                      }} // Prevent row click event
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 transform hover:scale-110"
                      title="حذف دوره بل"
                    >
                      <MdDeleteForever size={21} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Loading and No Results Rows */}
            {isLoading && currentUnitBills.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </td>
              </tr>
            )}
            {!isLoading && filteredUnitBills.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  {unitBills.length === 0
                    ? "هیچ دوره بل ثبت نشده است."
                    : "موردی با فیلترهای انتخابی یافت نشد."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center p-4 gap-1 md:gap-2 text-sm mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            <FiChevronRight className="ml-1 hidden sm:inline" size={16} /> قبلی
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount || isLoading}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            بعدی <FiChevronLeft className="mr-1 hidden sm:inline" size={16} />
          </button>
        </div>
      )}

      {/* Unit Bill Details Modal */}
      {isDetailsModalOpen && selectedBillData && (
        <UnitBillDetails
          data={selectedBillData}
          setIsUnitBillModalOpen={setIsDetailsModalOpen}
        />
      )}
    </div>;
};

export default AddingTasks;
