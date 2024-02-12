import React, { useState, RefObject } from "react";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";
import Icon from "../Icon/Icon";

interface SortOption {
  label: string;
  icon: string;
}

interface TableColumn {
  name: string;
  column: string;
  sort?: string;
  sortName?: string; // sort 프로퍼티의 타입을 keyof CompanyData로 지정
  class: string;
  pclass?: string;
  icon?: boolean;
}

interface Props {
  item: TableColumn;
  selectedOption: string | null;
  optionType: SortOption[];
  isOption: string | null;
  handleOptionClick: (option: SortOption) => void;
  modalPosition: { x: number; y: number };
  modalRef: RefObject<HTMLDivElement>;
}

const Modal: React.FC<Props> = ({
  item,
  selectedOption,
  optionType,
  isOption,
  handleOptionClick,
  modalPosition,
  modalRef,
}) => {
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
      {optionType.map((option, index) => (
        <div key={index}>
          <div className="justify-center items-center">
            <button
              className={`w-[122px] px-4 py-1 whitespace-nowrap inline-flex gap-2 items-center justify-start hover:bgColor-blue hover:textColor-focus ${
                selectedOption === option.label
                  ? "bgColor-blue textColor-focus"
                  : ""
              }`}
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
