import React from "react";
import Icon from "../Icon/Icon";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  page,
  setPage,
}) => {
  const numPages = Math.ceil(total / limit);
  return (
    <nav className="fixed bottom-[21px] ml-[32px] flex justify-center items-center gap-2 m-4">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        <Icon name="CaretLeft" width={16} height={16} />
        {/* 부등호 < 를 의미 */}
      </button>
      {Array(numPages)
        .fill(null)
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 && "page"}
            className={`w-[25px] h-[25px] rounded-s text-paragraph-14 font-semibold${
              page === i + 1
                ? "bg-primary-neutral-white text-primary-navy-original "
                : "hover:bg-primary-navy-100 text-primary-navy-orignial"
            }`}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        <Icon name="CaretRight" width={16} height={16} />
        {/* 부등호 > 를 의미 */}
      </button>
    </nav>
  );
};

export default Pagination;
