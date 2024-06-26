import React, { useState, useRef, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "../Icon/Icon";

interface InputStyleDropdownProps {
  errorMessage?: string;
  placeholder?: string;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string; // 현재 선택된 값
  width?: string;
  dropdownItems?: string[];
  handleCheckboxChange?: (
    keyString: string,
    item: string,
    documentName?: string
  ) => void;
  keyString?: string;
  documentName?: string;
}

const InputStyleDropdown: React.FC<InputStyleDropdownProps> = ({
  errorMessage,
  placeholder,
  isError = false,
  setIsError,
  value,
  width = "w-24",
  dropdownItems = ["일치", "불일치"],
  handleCheckboxChange,
  keyString,
  documentName,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setIsError?.(false);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);

    if (handleCheckboxChange !== undefined && keyString !== undefined) {
      handleCheckboxChange(keyString, item, documentName);
    }
    setIsDropdownVisible(false);
  };

  return (
    <div ref={dropdownRef} className={`relative`}>
      <div
        className={`${width} border gap-2 p-2 flex justify-between items-center cursor-pointer whitespace-nowrap
        ${isError ? "border-red-500" : "border-gray-300"}`}
        onClick={toggleDropdown}
      >
        <span>{selectedItem || placeholder}</span>
        <Icon
          name="ArrowDown"
          width="16"
          height="16"
          className={`transition-transform transform ${
            isDropdownVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {isError && errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      {isDropdownVisible && (
        <div
          className={`absolute mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 shadow-md z-10`}
        >
          {dropdownItems.map((item, index) => (
            <div
              key={index}
              className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                selectedItem === item ? "bg-blue-100" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default InputStyleDropdown;
