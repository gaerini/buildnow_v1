"use client";
import React, { useState } from "react";
import Icon from "../../Icon/Icon";
import ToolTip from "../../ApplierApply/ToolTip";

type PerformanceDetail = {
  발주처: string;
  구분: string;
  원도급사: string;
  공종: string;
  공사명: string;
  "계약금액(백만원)": number;
  "공사 시작": string; // 이전에 number로 잘못 표시되었던 부분을 수정
  "공사 종료 (예정)": string; // 이전에 number로 잘못 표시되었던 부분을 수정
  "공사의 종류": string;
  위치: string;
  지역: string;
};

type PerformancedivProps = {
  filteredData: PerformanceDetail[];
};

const Performancediv: React.FC<PerformancedivProps> = ({ filteredData }) => {
  const hasData = filteredData.length > 0;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    content: string
  ) => {
    // Remove commas, parentheses, and similar characters
    const cleanedContent = content.replace(/[(),]/g, "");
    if (cleanedContent.length >= 7) {
      const target = e.target as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top + window.scrollY + 10,
          left: rect.right + window.scrollX - 35,
        });
        setTooltipContent(content);
        setShowTooltip(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderdivHeader = () => {
    return (
      <div className="flex grow h-[56px] items-start ">
        {/* 공사명 & 참여 공종명 */}
        <div className="flex flex-grow flex-col px-8 text-left py-[9px] min-w-[366px] truncate">
          <div className="font-bold text-paragraph-16 textColor-mid-emphasis">
            공사명
          </div>
          <div className="font-normal text-paragraph-12 textColor-mid-emphasis">
            참여공종명
          </div>
        </div>
        {/* 공사의 종류 */}
        <div className="p-xl text-secondary-mint-600 w-[200px] text-left">
          공사의 종류
        </div>
        {/* 위치 */}
        <div className="p-xl textColor-negative w-[206px] text-left">위치</div>
        {/* 도급금액 */}
        <div className="p-xl textColor-point-1 w-[200px] text-left">
          도급금액(백만원)
        </div>
        {/* 도급사 */}
        <div className="p-xl textColor-point-2 w-[160px] text-left">도급사</div>
        {/* 공사 기간 */}
        <div className="p-xl textColor-mid-emphasis w-[170px] text-left">
          공사 기간
        </div>
      </div>
    );
  };

  const renderdivRows = () => {
    return selectedData.map((item, index) => (
      <div
        key={index}
        className="flex text-subTitle-18 textColor-high-emphasis h-[72px] items-center border-b borderColor"
      >
        {/* 공사명 & 참여 공종명 */}
        <div className="flex flex-1 px-8 truncate flex-col gap-y-1">
          <div className="font-bold text-subTitle-18 truncate text-ellipsis">
            {item.공사명}
          </div>
          <div className="font-normal textColor-mid-emphasis text-paragraph-12 truncate">
            {item.공종}
          </div>
        </div>
        {/* 공사의 종류 */}
        <div className="w-[200px] p-xl">{item["공사의 종류"]}</div>
        {/* 위치 */}
        <div className="flex items-center p-xl w-[206px] gap-x-2 truncate text-ellipsis">
          {item.위치.split(" ").slice(0, 2).join(" ")}
          <span className="textColor-mid-emphasis">
            <Icon name="Location" width={20} height={20} />
          </span>
        </div>
        {/* 도급금액 */}
        <div className="p-xl w-[200px] ">
          {item["계약금액(백만원)"].toLocaleString()} 백만원
        </div>
        {/* 도급사 */}
        <div
          className="p-xl w-[160px] truncate text-ellipsis "
          onMouseEnter={(e) => handleMouseEnter(e, item.원도급사)}
          onMouseLeave={handleMouseLeave}
        >
          {item.원도급사}
        </div>
        {/* 공사 기간 */}
        <div className="p-xl w-[170px]">
          {item["공사 시작"].split(".")[0]} -{" "}
          {item["공사 종료 (예정)"].split(".")[0]}
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    return (
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`w-[25px] h-[25px] rounded-s text-center ${
              currentPage === pageNum
                ? "bgColor-neutral textColor-high-emphasis font-bold"
                : "textColor-mid-emphasis"
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col bgColor-white p-xl ">
      {hasData ? (
        <>
          <div className="flex w-full flex-col border-t border-l border-r borderColor rounded-s min-w-[1260px]">
            <div className="flex grow border-b borderColor">
              {renderdivHeader()}
            </div>
            <div>{renderdivRows()}</div>
          </div>
          <div className="flex h-[41px] items-center gap-x-2">
            {renderPagination()}
          </div>
        </>
      ) : (
        <div className="flex w-full border borderColor items-center justify-center min-w-[1260px] rounded-s">
          <p className="flex items-center textColor-high-emphasis h-[56px]">
            데이터가 없습니다.
          </p>
        </div>
      )}{" "}
      {showTooltip && (
        <ToolTip
          detailedText={
            <p className="textColor-low-emphasis text-paragraph-14">
              {tooltipContent}
            </p>
          }
          bgColor="black"
          style={tooltipPosition}
        />
      )}
    </div>
  );
};

export default Performancediv;
