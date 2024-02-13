import React, { useState, useEffect } from "react";
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
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    if (total > 0 && limit > 0) {
      setNumPages(Math.ceil(total / limit));
    } else {
      setNumPages(0);
    }
  }, [total, limit]);

  // 페이지 그룹을 계산 (예: 1-10, 11-20)
  const pageGroup = Math.ceil(page / 10);

  return (
    <nav className=" flex justify-start items-center gap-2 m-4">
      {/* 첫 번째 페이지 그룹이 아닐 경우에만 CaretLeft 표시 */}
      {pageGroup > 1 && (
        <button onClick={() => setPage((pageGroup - 2) * 10 + 1)}>
          <Icon name="CaretLeft" width={16} height={16} />
        </button>
      )}
      {Array.from(
        { length: Math.min(10, numPages - (pageGroup - 1) * 10) },
        (_, i) => (pageGroup - 1) * 10 + i + 1
      ).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          aria-current={page === pageNum ? "page" : undefined}
          className={`w-[25px] h-[25px] rounded-s text-paragraph-14 font-semibold ${
            page === pageNum
              ? "bg-primary-neutral-white text-primary-navy-original "
              : "hover:bg-primary-navy-100 text-primary-navy-orignial"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* 마지막 페이지 그룹이 아닐 경우에만 CaretRight 표시 */}
      {pageGroup * 10 < numPages && (
        <button onClick={() => setPage(pageGroup * 10 + 1)}>
          <Icon name="CaretRight" width={16} height={16} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;

// import React, { useState, useEffect } from "react";
// import Icon from "../Icon/Icon";

// interface PaginationProps {
//   total: number;
//   limit: number;
//   page: number;
//   setPage: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   total,
//   limit,
//   page,
//   setPage,
// }) => {
//   const [numPages, setNumPages] = useState(0);

//   useEffect(() => {
//     if (total > 0 && limit > 0) {
//       setNumPages(Math.ceil(total / limit));
//     } else {
//       setNumPages(0);
//     }
//   }, [total, limit]);

//   return (
//     <nav className=" flex justify-start items-center gap-2 m-4">
//       <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//         <Icon name="CaretLeft" width={16} height={16} />
//         {/* 부등호 < 를 의미 */}
//       </button>
//       {Array(numPages)
//         .fill(null)
//         .map((_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setPage(i + 1)}
//             aria-current={page === i + 1 && "page"}
//             className={`w-[25px] h-[25px] rounded-s text-paragraph-14 font-semibold${
//               page === i + 1
//                 ? "bg-primary-neutral-white text-primary-navy-original "
//                 : "hover:bg-primary-navy-100 text-primary-navy-orignial"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
//         <Icon name="CaretRight" width={16} height={16} />
//         {/* 부등호 > 를 의미 */}
//       </button>
//     </nav>
//   );
// };

// export default Pagination;
