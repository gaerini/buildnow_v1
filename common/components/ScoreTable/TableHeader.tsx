import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon/Icon";
import Modal from "../SortPop/SortPop";

import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";
import { isHtmlElement } from "react-router-dom/dist/dom";

interface TableColumn {
  name: string;
  column: string | null;
  sort?: string;
  sortName?: string; // sort 프로퍼티의 타입을 keyof CompanyData로 지정
  class: string;
  wclass?: string;
  pclass?: string;
  icon?: boolean;
}

const tableColumns: TableColumn[] = [
  {
    name: "회사명",
    column: "company",
    class: "w-[16.68%] min-w-2 justify-start",
    pclass: "mr-4",
  },
  {
    name: "경영일반",
    column: "management",
    sort: "number",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "재무정보",
    column: "finance",
    sort: "number",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "인증현황",
    column: "license",
    sort: "number",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "시공실적",
    column: "portfolio",
    sort: "number",
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "총점수",
    column: "total",
    sort: "number",
    class: "w-[9.93%] justify-center",
    icon: true,
  },
  {
    name: "결과",
    column: "result",
    sort: "result",
    class: "w-[8.86%] justify-center",
    icon: true,
  },
  {
    name: "배점표 검토",
    column: "index",
    class: "w-[14.53%] justify-start",
  },
];

interface SortOption {
  label: string;
  icon: string;
}

interface SortOptions {
  sortByScore: SortOption[];
  sortByResult: SortOption[];
}

// 옵션의 종류
const sortOptions: SortOptions = {
  sortByScore: [
    { label: "높은 순", icon: "High" },
    { label: "낮은 순", icon: "Low" },
  ],
  sortByResult: [
    { label: "통과 우선", icon: "Pass" },
    { label: "탈락 우선", icon: "Fail" },
  ],
};

const TableHeader: React.FC<{
  onSort: (key: keyof ScoreSummary | null) => void;
}> = ({ onSort }) => {
  // 1. 옵션 관련 상태변수 (2개)
  // 1-1. 현재 선택된 컬럼에 해당하는 정렬 옵션을 추적하는 상태 변수
  const [selectedSortKey, setSelectedSortKey] = useState<
    keyof ScoreSummary | null
  >(null);
  // 1-2. 현재 선택된 컬럼을 기준으로 정렬 옵션의 종류를 추적하는 상태 변수
  const [currentOptions, setCurrentOptions] = useState<SortOption[]>([]);

  // 2. 모달창 관련 상태변수 및 함수 (4개)
  // 2-1. 모달창의 꺼짐 및 켜짐을 정의하는 상태 변수
  const [showModal, setShowModal] = useState<boolean>(false);
  // 2-2. 모달창의 위치를 정의하는 상태 변수
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // 2-3. 모달 창 참조 변수
  const modalRef = useRef<HTMLDivElement>(null);
  // 2-4. 모달창의 외부를 클릭했을 때 닫아주는 변수
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 로직 1. column 클릭 시 모달창 표시 및 column에 따른 옵션 type을 정의하는 로직
  const handleColumnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    sortType: string | undefined
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });

    // sortType에 따라 다른 옵션 그룹을 설정
    if (sortType === "number") {
      setCurrentOptions(sortOptions.sortByScore);
    } else if (sortType === "result") {
      setCurrentOptions(sortOptions.sortByResult);
    }

    setShowModal(true);
  };

  // 로직 2. 모달창 내부 옵션 선택시 정렬 옵션 저장 및 모달창 닫기 로직
  const handleSortOptionClick = (sortKey: string | null) => {
    onSort(sortKey); // 정렬 key 정의
    setShowModal(false); // 모달 창 닫기
  };

  // 모달창 컴포넌트 (밖으로 뺴기)

  return (
    <div className="flex">
      {tableColumns.map((item) => (
        <div
          className={`h-14 bg-white border-b border-gray-300 px-8 py-[19px] items-center ${item.class}`}
          key={item.name}
        >
          <div
            className={`whitespace-nowrap inline-flex ${item.wclass} ${
              selectedSortKey === item.sort
                ? "textColor-focus"
                : "textColor-mid-emphasis hover:textColor-low-emphasis active:textColor-focus duration-300"
            } onClick={() => setShowModal(!showModal)} `}
          >
            <p className={`w-fit  text-paragraph-16 font-bold ${item.pclass}`}>
              {item.name}
            </p>
            {item.icon && (
              <button
                className="ml-2"
                onClick={(e) => handleColumnClick(e, item.sort)}
              >
                <Icon name="CaretUpDown" width={16} height={16} />
              </button>
            )}
          </div>
          {showModal && (
            <Modal
              item={item}
              currentOptions={currentOptions}
              onOptionClick={handleSortOptionClick}
              modalPosition={modalPosition}
              modalRef={modalRef}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
