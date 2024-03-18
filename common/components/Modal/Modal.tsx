"use client";
import React, { useState, ReactNode, useEffect, useRef } from "react";
import Icon from "../Icon/Icon";

// Modal은 ModalProps를 prop으로 받음
interface ModalProps {
  hasCloseIcon: boolean; // header에 "x" 버튼이 있는지 여부를 결정
  buttonType: "negative-positive" | "neutral" | "none"; // 버튼의 타입 (유무)
  leftButtonText?: string; // 좌측 버튼에 들어갈 문구
  rightButtonText?: string; // 우측 버튼에 들어갈 문구
  leftButtonOnClick?: () => void; // 좌측 버튼 함수
  rightButtonOnClick?: () => void; // 우측 버튼 함수
  backgroundOnClick?: () => void;
  children: ReactNode; // contents에 들어갈 내용
  fullscreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  hasCloseIcon,
  buttonType,
  leftButtonText,
  rightButtonText,
  leftButtonOnClick,
  rightButtonOnClick,
  backgroundOnClick,
  children,
  fullscreen = false, // 기본값은 false
}) => {
  const [isOpen, setIsOpen] = useState(true); // 모달 표시 상태 관리
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        if (backgroundOnClick) {
          backgroundOnClick(); // Call the background click handler
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [backgroundOnClick]); // Add the handler to the dependency array

  // 모달 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  const modalClass = fullscreen
    ? "fixed inset-0 bg-primary-neutral-600 bg-opacity-50 flex items-center justify-center"
    : "fixed top-[64px] left-[266px] inset-0 bg-primary-neutral-600 bg-opacity-50 flex items-center justify-center h-[calc(100%-64px)] w-[calc(100%-266px)]";

  // 모달이 보이지 않는 경우 null 반환
  if (!isOpen) return null;

  return (
    isOpen && (
      <div className={modalClass}>
        <div
          className="relative border w-[502px] shadow-lg rounded-md bg-primary-neutral-white "
          ref={modalRef}
        >
          <div className="flex justify-between items-center p-2 w-full h-8">
            {hasCloseIcon && (
              <button
                onClick={closeModal}
                className="text-primry-neutral-black bg-transparent hover:bg-gray-200 rounded-md p-1 ml-auto inline-flex items-center"
              >
                <Icon name="Close" width={16} height={16} />
              </button>
            )}
          </div>
          {/* 여기에 content 내부를 관리함 */}
          <div className="flex flex-col items-center justify-center px-4 py-8">
            {children}
          </div>
          <div
            className={`flex justify-end p-4 bg-primary-neutral-white rounded-bl-md rounded-br-md ${
              buttonType === "none" ? "h-8" : ""
            }`}
          >
            {buttonType === "negative-positive" && (
              <div className="flex justify-between gap-2 w-full">
                {leftButtonText && !rightButtonText && (
                  <button
                    onClick={leftButtonOnClick}
                    className="btnStyle-main-2 text-subTitle-20 font-bold p-l w-full hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                  >
                    {leftButtonText}
                  </button>
                )}
                {!leftButtonText && rightButtonText && (
                  <button
                    onClick={rightButtonOnClick}
                    className="btnStyle-main-1 text-subTitle-20 font-bold p-l w-full hover:bg-primary-blue-400 hover:textColor-white"
                  >
                    {rightButtonText}
                  </button>
                )}
                {leftButtonText && rightButtonText && (
                  <>
                    <button
                      onClick={leftButtonOnClick}
                      className="btnStyle-main-2 text-subTitle-20 font-bold p-l w-1/2 hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    >
                      {leftButtonText}
                    </button>
                    <button
                      onClick={rightButtonOnClick}
                      className="btnStyle-main-1 text-subTitle-20 font-bold p-l w-1/2 hover:bg-primary-blue-400 hover:textColor-white"
                    >
                      {rightButtonText}
                    </button>
                  </>
                )}
              </div>
            )}
            {buttonType === "neutral" && (
              <div className="flex justify-between gap-2 w-full">
                {leftButtonText && !rightButtonText && (
                  <button
                    onClick={leftButtonOnClick}
                    className="btnStyle-main-2 text-subTitle-20 font-bold p-l w-full hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                  >
                    {leftButtonText}
                  </button>
                )}
                {!leftButtonText && rightButtonText && (
                  <button
                    onClick={rightButtonOnClick}
                    className="btnStyle-main-1 text-subTitle-20 font-bold p-l w-full hover:bg-primary-navy-400 hover:text-primary-navy-original"
                  >
                    {rightButtonText}
                  </button>
                )}
                {leftButtonText && rightButtonText && (
                  <>
                    <button
                      onClick={leftButtonOnClick}
                      className="btnStyle-main-2 text-subTitle-20 font-bold p-l w-1/2 hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    >
                      {leftButtonText}
                    </button>
                    <button
                      onClick={rightButtonOnClick}
                      className="btnStyle-main-1 text-subTitle-20 font-bold p-l w-1/2 hover:bg-primary-navy-400 hover:text-primary-navy-original"
                    >
                      {rightButtonText}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
