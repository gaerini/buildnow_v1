import React from "react";
import Icon from "../Icon/Icon";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";

interface TableColumn {
  name: string;
  sort?: keyof ScoreSummary; // sort 프로퍼티의 타입을 keyof CompanyData로 지정
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
    sort: "경영 일반",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "재무정보",
    sort: "재무 부문",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "인증현황",
    sort: "인증 현황",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "시공실적",
    sort: "시공 실적",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "총점수",
    sort: "scoreSum",
    class: "w-[9.93%] justify-center",
    icon: true,
  },
  {
    name: "결과",
    sort: "isPass",
    class: "w-[8.86%] justify-center",
    icon: true,
  },
  {
    name: "배점표 검토",
    class: "w-[14.53%] justify-start",
  },
];

const TableHeader: React.FC<{
  onSort: (key: keyof ScoreSummary | null) => void;
}> = ({ onSort }) => (
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
            <button className="ml-2" onClick={() => onSort(item.sort ?? null)}>
              <Icon name="CaretUpDown" width={16} height={16} />
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default TableHeader;
