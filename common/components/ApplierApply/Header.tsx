"use client";
import React, { useState, useRef, ReactNode } from "react";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 정확한 경로를 입력해주세요.
import ToolTip from "./ToolTip";

// Define the interface for the component props
interface HeaderProps {
  titleText: string;
  additionalText: ReactNode;
  isHoverable?: boolean;
  detailedIcon?: string;
  detailedText?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  titleText,
  additionalText,
  isHoverable,
  detailedIcon,
  detailedText,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHovered(true);
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      console.log(textRef.current.getBoundingClientRect());

      // 툴팁을 호버된 요소의 오른쪽으로 9px 떨어진 위치에 배치합니다.
      const style = {
        top: `${rect.top - 75}px`, // 페이지 스크롤을 고려하여 Y 위치를 조정
        left: `${rect.left - 570}px`, // 오른쪽 끝에서 9px 떨어진 X 위치를 조정
        zIndex: 1000, // 툴팁이 다른 요소 위에 나타나도록 z-index 설정
      };
      setTooltipStyle(style);
    }
  };

  return (
    <div className="fixed top-16 ml-[641px] bgColor-white border-b borderColor w-full flex justify-start items-center px-8 py-[14px] gap-4">
      {/* Header 제목 */}
      <div className="textColor-mid-emphasis text-subTitle-20 font-medium">
        {titleText}
      </div>

      {/* Header 부가설명 */}
      <div
        className={` text-caption font-normal select-none  ${
          isHovered
            ? "textColor-focus underline underline-offset-4 decoration-current"
            : "text-primary-neutral-700"
        }`}
        onMouseEnter={handleMouseEnter} // 마우스 진입 시 호버 상태 true
        onMouseLeave={() => setIsHovered(false)}
        ref={textRef}
      >
        {additionalText}
        {/* Header 부가설명 호버시 툴팁 내용 */}
        {isHoverable && isHovered && (
          <ToolTip
            detailedIcon={detailedIcon}
            detailedText={detailedText}
            bgColor="blue" // Pass bgColor as a prop or use a default value
            style={tooltipStyle}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
