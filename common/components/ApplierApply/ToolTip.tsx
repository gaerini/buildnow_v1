// ToolTip.tsx
import React, { forwardRef } from "react";
import Icon from "../Icon/Icon"; // Import the Icon component

interface ToolTipProps {
  detailedIcon?: string;
  detailedText?: React.ReactNode;
  bgColor?: string;
  style?: React.CSSProperties;
}

const ToolTip = forwardRef<HTMLDivElement, ToolTipProps>(
  ({ detailedIcon, detailedText, bgColor, style }, ref) => {
    const iconColor =
      bgColor === "neutral"
        ? "#F3F3F3"
        : bgColor === "blue"
        ? "#F1F3FF"
        : bgColor === "black"
        ? "#000000"
        : undefined;

    const textColor =
      bgColor === "neutral"
        ? "mid-emphasis"
        : bgColor === "blue"
        ? "focus"
        : bgColor === "black"
        ? "white"
        : undefined;

    return (
      <div ref={ref} style={{ position: "absolute", ...style }}>
        <div className="flex justify-start items-center boxShadow-s">
          <Icon
            name="Polygon"
            width={10}
            height={10}
            className="z-[1001]"
            color={iconColor}
          />
          <div
            className={`bgColor-${bgColor} textColor-${textColor} gap-[10px] p-m rounded shadow-lg flex justify-center items-center`}
          >
            {detailedIcon && (
              <div className="text-subTitle-18">{detailedIcon}</div>
            )}
            {detailedText}
          </div>
        </div>
      </div>
    );
  }
);

export default ToolTip;
