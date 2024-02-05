import React from "react";
import Icon from "../Icon/Icon";

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

interface TableColumn {
  name: string;
  sort?: keyof CompanyData; // sort 프로퍼티의 타입을 keyof CompanyData로 지정
  class: string;
  icon?: boolean;
}

const tableColumns: TableColumn[] = [
  {
    name: "회사명",
    sort: "name",
    class: "w-[200px] h-[56px] justify-start",
  },
  {
    name: "경영일반",
    sort: "management",
    class: "w-[150px] h-[56px] justify-center",
    icon: true,
  },
  {
    name: "재무정보",
    sort: "finance",
    class: "w-[150px] h-[56px] justify-center",
    icon: true,
  },
  {
    name: "인증현황",
    sort: "certification",
    class: "w-[150px] h-[56px] justify-center",
    icon: true,
  },
  {
    name: "시공실적",
    sort: "performance",
    class: "w-[150px] h-[56px] justify-center",
    icon: true,
  },
  {
    name: "총 점수",
    sort: "totalScore",
    class: "w-[113px] h-[56px] justify-center",
    icon: true,
  },
  {
    name: "결과",
    sort: "result",
    class: "w-[100px] h-[56px] justify-start",
    icon: true,
  },
  { name: "배점표 검토", class: "w-[187px] h-[56px] justify-start" },
];

const TableHeader: React.FC<{ onSort: (key: keyof CompanyData) => void }> = ({
  onSort,
}) => (
  <div className="flex">
    {tableColumns.map((item) => (
      <div
        className={` bg-white border-b border-gray-300 px-8 items-center inline-flex ${item.class}`}
        key={item.name}
      >
        <p className="text-slate-700 text-base font-semibold whitespace-nowrap ">
          {item.name}
        </p>

        {item.icon && (
          <button className="ml-2.5" onClick={() => onSort(item.sort)}>
            <Icon name="CaretUpDown" width={16} height={16} />
          </button>
        )}
      </div>
    ))}
  </div>
);

export default TableHeader;
