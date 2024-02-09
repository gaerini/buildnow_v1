import React, { RefObject } from "react";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";
import Icon from "../Icon/Icon";

interface SortOption {
  label: string;
  icon: string;
}

interface Props {
  column: string | null;
  currentOptions: SortOption[];
  onOptionClick: (column: string | null, isAscending: boolean) => void;
  modalPosition: { x: number; y: number };
  modalRef: RefObject<HTMLDivElement>;
}

const Modal: React.FC<Props> = ({
  column,
  currentOptions,
  onOptionClick,
  modalPosition,
  modalRef,
}) => {
  // 정렬 옵션 클릭 이벤트 처리
  const handleOptionClick = (option: SortOption) => {
    // 옵션에 따라 정렬 방향 결정 (높은 순: 오름차순, 낮은 순: 내림차순)
    const isAscending = option.label === "높은 순";
    // 선택된 정렬 기준과 방향을 ScoreTable로 전달
    onOptionClick(column, isAscending);
  };

  return (
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
      {currentOptions.map((option, index) => (
        <div key={index}>
          <div className="justify-center items-center">
            <button
              className="w-[122px] px-4 py-1 whitespace-nowrap inline-flex gap-2 items-center justify-start hover:bgColor-blue hover:textColor-focus "
              onClick={() => handleOptionClick(option)}
            >
              <Icon name={option.icon} width={16} height={16} />
              <p>{option.label}</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Modal;
