import React, { RefObject } from "react";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";
import Icon from "../Icon/Icon";

interface SortOption {
  label: string;
  icon: string;
}

interface item {
  name: string;
  column: string | null;
  sort?: keyof ScoreSummary; // sort 프로퍼티의 타입을 keyof CompanyData로 지정
  class: string;
  wclass?: string;
  pclass?: string;
  icon?: boolean;
}

interface Props {
  item: item;
  currentOptions: SortOption[];
  onOptionClick: (column: string | null) => void;
  modalPosition: { x: number; y: number };
  modalRef: RefObject<HTMLDivElement>;
}

const Modal: React.FC<Props> = ({
  item,
  currentOptions,
  onOptionClick,
  modalPosition,
  modalRef,
}) => (
  <div
    ref={modalRef}
    style={{
      position: "absolute",
      left: `${modalPosition.x}px`,
      top: `${modalPosition.y}px`,
      backgroundColor: "white",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "10px",
      zIndex: 1000, // 모달창이 다른 요소들 위에 표시되도록 z-index 설정
    }}
  >
    {/* 모달창 내용 */}
    {currentOptions.map((option, index) => (
      <div
        key={index}
        className="modal-option"
        onClick={() => onOptionClick(item.column)}
      >
        <div className="flex-col justify-center items-center">
          <div className="px-4 py-1 inline-flex justify-center items-center gap-2">
            <Icon name={option.icon} width={16} height={16} />
            <p>{option.label}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Modal;
