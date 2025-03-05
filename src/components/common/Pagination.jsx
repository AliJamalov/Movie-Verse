import React from "react";

const Pagination = ({ totalPages, setPage, page, isLoading }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5; // Количество страниц вокруг текущей
    const pageNumbers = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pageNumbers.push(1);

    if (page > maxPagesToShow) {
      pageNumbers.push("...");
    }

    let start = Math.max(2, page - 2);
    let end = Math.min(totalPages - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);
    return pageNumbers;
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              disabled={isLoading || page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 h-8 cursor-pointer bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100"
            >
              {"<"}
            </button>
          </li>

          {getPageNumbers().map((num) => (
            <li key={num}>
              {num === "..." ? (
                <span className="px-3 h-8 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => setPage(num)}
                  className={`px-3 h-8 border cursor-pointer ${page === num ? "bg-yellow-500 text-white" : "bg-white"}`}
                >
                  {num}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              disabled={isLoading || page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 cursor-pointer h-8 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100"
            >
              {">"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
