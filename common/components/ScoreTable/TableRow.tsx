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
    <div className="w-[200px] h-[72px] px-8 py-4 bg-white border-b border-gray-300 justify-between items-center inline-flex">
      <div className="w-32 flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-black text-lg font-normal">{company.name}</div>
        <div className="text-neutral-400 text-xs font-normal leading-none">
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
        className="w-[150px] h-[72px] px-8 py-4 bg-gray-100 border-b border-gray-300 justify-start items-center  inline-flex"
        key={key}
      >
        <div className="w-[57px] [h-23px] justify-between items-start inline-flex gap-0.5">
          <div className="w-fit text-center text-black text-lg font-bold ">
            {company[key as keyof CompanyData]}
          </div>
          <div className="w-[7px] text-neutral-400 text-lg font-normal ">/</div>
          <div className="w-[22px] text-center text-neutral-400 text-lg font-normal ">
            10
          </div>
        </div>
      </div>
    ))}

    {/* 총점수 */}
    <div className="w-[113px] h-[72px] px-8 py-4 bg-white border-b border-gray-300 justify-start items-center inline-flex">
      <div className="text-black text-lg font-normal font-['Pretendard Variable']">
        {company.totalScore}
      </div>
    </div>

    {/* 결과 */}
    <div className="w-[100px] h-[72px] px-8 py-4 bg-white border-b border-gray-300 justify-start items-center inline-flex">
      <div
        className={` text-lg font-normal text-nowrap font-['Pretendard Variable'] ${
          company.result === "탈락" || company.result === "미달"
            ? "text-danger-red"
            : "text-black"
        }`}
      >
        {company.result}
      </div>
    </div>

    {/* 배점표 검토 버튼 */}
    <div className="w-[187px] h-[72px] px-8 py-4 bg-white border-b border-gray-300 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[103px] h-[40px] px-5 py-2 bg-white rounded border border-zinc-300 justify-center items-center gap-2 flex">
        <div className="text-center text-neutral-500 text-lg text-nowrap font-bold font-['Pretendard Variable'] leading-normal">
          검토하기
        </div>
      </div>
    </div>
  </div>
);

export default TableRow;
