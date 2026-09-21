'use client';

function Pagination({ currentPage, totalPages, totalCount, onPageChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-3 mt-5 mb-20">
      <p className="text-xl text-primary-100">
        Showing page {currentPage} of {totalPages} ({totalCount} orders)
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            rounded-lg
            border
            px-3
            py-2
            text-xl
            font-semibold
            text-primary-900
            transition
            bg-white
            hover:bg-accent-600
            cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          Previous
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-1 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                min-w-9
                rounded-lg
                border
                px-3
                py-2
                transition
              text-primary-900
                font-bold 
                text-xl

                ${currentPage === page ? 'bg-accent-600 cursor-not-allowed' : 'hover:bg-accent-600 bg-white cursor-pointer'}
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            rounded-lg
            border
            px-3
            py-2
            text-xl
            font-semibold
            text-primary-900
            transition
            bg-white
            hover:bg-accent-600
            disabled:cursor-not-allowed
            disabled:opacity-70
            cursor-pointer
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
