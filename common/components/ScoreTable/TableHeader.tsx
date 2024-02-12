import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon/Icon";
import Modal from "../SortPop/SortPop";

interface TableColumn {
  name: string;
  column: string;
  sort?: string;
  sortYes: boolean;
  class: string;
  pclass?: string;
  icon?: boolean;
}

const tableColumns: TableColumn[] = [
  {
    name: "회사명",
    column: "회사명",
    sortYes: false,
    class: "w-[16.68%] min-w-2 justify-start",
    pclass: "mr-4",
  },
  {
    name: "경영일반",
    column: "경영 일반",
    sort: "number",
    sortYes: true,
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "재무정보",
    column: "재무 부문",
    sort: "number",
    sortYes: true,
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "인증현황",
    column: "인증 현황",
    sort: "number",
    sortYes: true,
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "시공실적",
    column: "시공 실적",
    sort: "number",
    sortYes: true,
    class: "w-[12.5%] justify-center",
    icon: true,
  },
  {
    name: "총점수",
    column: "scoreSum",
    sort: "number",
    sortYes: true,
    class: "w-[9.93%] justify-center",
    icon: true,
  },
  {
    name: "결과",
    column: "isPass",
    sort: "result",
    sortYes: true,
    class: "w-[8.86%] justify-center",
    icon: true,
  },
  {
    name: "배점표 검토",
    column: "ㅁㅁㅁㅁㅁ",
    sortYes: false,
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
    { label: "미달 우선", icon: "Miss" },
  ],
};

const TableHeader: React.FC<{
  onSort: (
    column: string | null,
    isAscending: boolean,
    option: SortOption
  ) => void;
}> = ({ onSort }) => {
  // 1. 옵션 관련 상태변수 (2개)
  // 1-1. 현재 선택된 컬럼에 해당하는 정렬 옵션을 추적하는 상태 변수
  // const [selectedSortKey, setSelectedSortKey] = useState<
  //   keyof ScoreSummary | null
  // >(null);
  // 1-2. 현재 선택된 컬럼을 기준으로 정렬 옵션의 종류를 추적하는 상태 변수
  const [optionType, setOptionType] = useState<SortOption[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [isOption, setIsOption] = useState<string | null>(null);
  // 2. 모달창 관련 상태변수 및 함수 (4개)
  // 2-1. 모달창의 꺼짐 및 켜짐을 정의하는 상태 변수
  const [showModal, setShowModal] = useState<boolean>(false);
  // 2-2. 모달창의 위치를 정의하는 상태 변수
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // 선택된 옵션의 상태를 관리
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultAscending, setResultAscending] = useState<
    string | null | undefined
  >(null);

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

  // 선택된 컬럼이 변경될 때마다 모달창의 표시 여부를 결정
  useEffect(() => {
    setShowModal(selectedColumn !== null);
  }, [selectedColumn]);

  // 로직 1. column 클릭 시 모달창 표시 및 column에 따른 옵션 type을 정의하는 로직
  const handleColumnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    sortType: string | undefined,
    column: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    e.stopPropagation();
    if (selectedColumn === column) {
      setSelectedColumn(null); // 모달창을 숨김
    } else {
      setSelectedColumn(column); // 새로운 컬럼을 선택하고 모달창을 표시
    }

    // sortType에 따라 다른 옵션 그룹을 설정
    if (sortType === "number") {
      setOptionType(sortOptions.sortByScore);
    } else if (sortType === "result") {
      setOptionType(sortOptions.sortByResult);
    }
  };

  useEffect(() => {
    if (selectedColumn) {
      // 선택된 컬럼이 있으면 모달을 표시
      setShowModal(true);
    } else {
      // 선택된 컬럼이 없으면 모달을 숨김
      setShowModal(false);
    }
  }, [selectedColumn]);

  // console.log("ShowModal후:", showModal);
  // console.log("SelectedColumn후:", selectedColumn);

  // 로직 2. 모달창 내부 옵션 선택시 정렬 옵션 저장 및 모달창 닫기 로직
  const onOptionClick = (
    column: string | null,
    ascending: boolean,
    option: SortOption
  ) => {
    onSort(column, ascending, option); // 정렬 key 정의
    setIsOption(column); //
    setShowModal(false); // 모달 창 닫기
    setSelectedColumn(null);
  };

  // 정렬 옵션 클릭 이벤트 처리
  const handleOptionClick = (option: SortOption, item: TableColumn) => {
    // 옵션에 따라 정렬 방향 결정 (높은 순: 오름차순, 낮은 순: 내림차순)
    const isAscending = option.label === "높은 순";
    setSelectedOption(option.label);
    // 선택된 정렬 기준과 방향을 ScoreTable로 전달
    setIsOption(item.column);
    // setSortClass(item.sortClass);
    onOptionClick(selectedColumn, isAscending, option);
  };

  return (
    <div className="flex">
      {tableColumns.map((item) => {
        // const isCurrentOptionSelected = isOption === selectedColumn; 이게 핵심이였음;;
        return (
          <div
            className={`h-14 bg-white border-b border-gray-300 px-8 py-[19px] items-center ${item.class}`}
            key={item.name}
          >
            <div
              className={`whitespace-nowrap justify-center items-center inline-flex ${
                item.sortYes && showModal && selectedColumn === item.column
                  ? "textColor-focus"
                  : isOption === item.column
                  ? "textColor-focus"
                  : "textColor-mid-emphasis hover:textColor-low-emphasis duration-300"
              }`}
            >
              <button
                className={`w-fit text-paragraph-16 font-bold ${item.pclass}`}
                onClick={(e) =>
                  item.sortYes && handleColumnClick(e, item.sort, item.column)
                }
              >
                {item.name}
              </button>
              {item.sortYes && item.icon && (
                <div className="ml-2">
                  <Icon name="CaretUpDown" width={16} height={16} />
                </div>
              )}
            </div>
            {item.sortYes && (
              <>
                {showModal && (
                  <div
                    ref={modalRef}
                    className="bgColor-white py-2 border-[1px] rounded-m borderColor"
                    style={{
                      position: "absolute",
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000, // 모달창이 다른 요소들 위에 표시되도록 z-index 설정
                    }}
                  >
                    {/* 모달창 내용 */}
                    {optionType.map((option, index) => (
                      <div key={index}>
                        <div className="justify-center items-center">
                          <button
                            className={`w-[122px] px-4 py-1 inline-flex justify-start hover:bgColor-blue hover:textColor-focus ${
                              isOption === selectedColumn &&
                              selectedOption === option.label
                                ? "bgColor-blue textColor-focus"
                                : ""
                            }`}
                            onClick={() => handleOptionClick(option, item)}
                          >
                            <Modal option={option} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default TableHeader;
