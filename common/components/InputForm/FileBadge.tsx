import React from "react";
import Icon from "../Icon/Icon";

interface BadgeProps {
  filename: string | null;
  title: string;
  handleRemoveFile: () => void;
}

const FileBadge: React.FC<BadgeProps> = ({
  filename,
  title,
  handleRemoveFile,
}) => {
  return (
    <div
      className="max-w-[49%] flex badgeSize-m items-center justify-between border bgColor-blue border-primary-blue-original textColor-focus "
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
