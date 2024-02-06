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
  wclass?: string;
  pclass?: string;
  icon?: boolean;
}

const tableColumns: TableColumn[] = [
  {
    name: "회사명",
    sort: "name",
    class: "w-[16.68%] min-w-2 justify-start",
    pclass: "mr-4",
  },
  {
    name: "경영일반",
    sort: "management",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "재무정보",
    sort: "finance",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "인증현황",
    sort: "certification",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "시공실적",
    sort: "performance",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "총점수",
    sort: "totalScore",
    class: "w-[9.93%] justify-center",
    icon: true,
  },
  {
    name: "결과",
    sort: "result",
    class: "w-[8.86%] justify-center",
    icon: true,
  },
  {
    name: "배점표 검토",
    class: "w-[14.53%] justify-start",
  },
];

const TableHeader: React.FC<{ onSort: (key: keyof CompanyData) => void }> = ({
  onSort,
}) => (
  <div className="flex">
    {tableColumns.map((item) => (
      <div
        className={` bg-white border-b border-gray-300 px-8 py-[19px] items-center ${item.class}`}
        key={item.name}
      >
        <div className={` whitespace-nowrap inline-flex ${item.wclass}`}>
          <p
            className={`w-fit text-primary-navy-original text-paragraph-16 font-bold ${item.pclass}`}
          >
            {item.name}
          </p>
          {item.icon && (
            <button className="ml-2" onClick={() => onSort(item.sort)}>
              <Icon name="CaretUpDown" width={16} height={16} />
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default TableHeader;
