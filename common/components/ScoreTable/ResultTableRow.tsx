import React from "react";

interface CompanyData {
  name: string;
  caption: string;
  isNew: boolean;
  management: number;
  finance: number;
  certification: number;
  performance: number;
  totalScore: number;
  result: string;
}

const TableRow: React.FC<{ company: CompanyData }> = ({ company }) => (
  <div className="flex items-center">
    {/* 회사명 */}
    <div className="w-[16.68%] px-8 py-4 bg-white border-b border-gray-300 justify-between items-center inline-flex">
      <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-primary-neutral-black text-lg font-normal">
          {company.name}
        </div>
        <div className="text-primary-neutral-400 text-xs font-normal leading-none">
          {company.caption}
        </div>
      </div>
      {company.isNew && (
        <div className="w-4 h-4 relative">
          <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bg-orange-300 rounded" />
        </div>
      )}
    </div>

    {/* 숫자 데이터 */}
    {["management", "finance", "certification", "performance"].map((key) => (
      <div
        className="w-[12.5%] px-8 py-4 bg-gray-100 border-b border-gray-300 justify-start items-center inline-flex"
        key={key}
      >
        <div className="h-[40px] justify-start items-center inline-flex gap-0.5">
          <div className="m-1 text-primary-neutral-black text-subTitle-18 font-bold ">
            {company[key as keyof CompanyData]}
          </div>
          <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
            /
          </div>
          <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
            10
          </div>
        </div>
      </div>
    ))}

    {/* 총점수 */}
    <div className="w-[9.93%] px-8 py-4 bg-white border-b border-gray-300">
      <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal justify-start items-center inline-flex">
        {company.totalScore}
      </div>
    </div>

    {/* 결과 */}
    <div className="w-[8.86%] px-8 py-4 bg-white border-b border-gray-300 ">
      <div
        className={`h-[40px] text-subTitle-18 font-normal justify-start items-center inline-flex whitespace-nowrap  ${
          company.result === "탈락" || company.result === "미달"
            ? "text-danger-red"
            : "text-primary-neutral-black"
        }`}
      >
        {company.result}
      </div>
    </div>

    {/* 배점표 검토 버튼 */}
    <div className="w-[14.53%] px-8 py-4 bg-white border-b border-gray-300 items-center gap-2.5 inline-flex">
      <div className="h-[40px] justify-start items-center gap-2 flex">
        <button className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black">
          서류 확인하기
        </button>
      </div>
    </div>
  </div>
);

export default TableRow;
