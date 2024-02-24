import React from "react";
import Icon from "../Icon/Icon";

interface BadgeProps {
  filename: string | null;
  title: string;
  handleRemoveFile: () => void;
  badgeWidth?: string; // Adding badgeWidth prop
}

const FileBadge: React.FC<BadgeProps> = ({
  filename,
  title,
  handleRemoveFile,
  badgeWidth = "49%",
}) => {
  const badgeWidthClass = badgeWidth.includes("%")
    ? `max-w-[${badgeWidth}]`
    : `max-w-[${badgeWidth}%]`;

  return (
    <div
      className={`flex badgeSize-m items-center justify-between border bgColor-blue border-primary-blue-original textColor-focus ${badgeWidthClass}`}
      title={title}
    >
      <span className="textColor-focus truncate">{filename}</span>
      <button
        onClick={handleRemoveFile}
        className="justify-center items-center"
        style={{ right: "1rem" }} // Adjust this value to position the button as needed
      >
        {/* Assuming Icon is a component that renders an SVG or similar */}
        <Icon name="FileX" width={16} height={16} />
      </button>
    </div>
  );
};

export default FileBadge;
