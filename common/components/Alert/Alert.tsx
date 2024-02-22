"use client";
import React, { useState } from "react";
import Icon from "../Icon/Icon";

interface AlertProps {
  state: "positive" | "negative" | "neutral";
  alertIcon: React.ReactNode;
  alertText: React.ReactNode;
  onClose?: () => void; // 부모컴포넌트의 상태 변경
}

const Alert: React.FC<AlertProps> = ({
  state,
  alertIcon,
  alertText,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // onClose가 제공되었을 때만 호출
    }
  };

  let alertStyle = "";
  switch (state) {
    case "positive":
      alertStyle = "alert-positive";
      break;
    case "negative":
      alertStyle = "alert-negative";
      break;
    case "neutral":
      alertStyle = "alert-neutral";
      break;
    default:
      break;
  }

  return (
    <div
      className={`max-h-full flex items-center ${alertStyle} gap-x-1 w-full`}
    >
      {alertIcon}
      {alertText}
      <button onClick={handleClose} className="ml-auto">
        <Icon name="Close" width={16} height={16} />
      </button>
    </div>
  );
};

export default Alert;
