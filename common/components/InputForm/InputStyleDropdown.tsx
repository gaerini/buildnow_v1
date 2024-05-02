import React, { useState, useRef, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "../Icon/Icon";

const initialConsonants = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 한글 초성 분류 함수
const getInitialConsonant = (char: string) => {
  const unicodeVal = char.charCodeAt(0);
  const koreanCharIndex = unicodeVal - 44032;
  if (koreanCharIndex < 0 || koreanCharIndex > 11171) return null;
  const initialIndex = Math.floor(koreanCharIndex / 588);
  return initialConsonants[initialIndex] || null;
};

// 영어 알파벳 분류 함수
const getEnglishAlphabet = (char: string) => {
  const firstChar = char[0].toUpperCase(); // 첫 글자를 대문자로 변환
  if (firstChar >= "A" && firstChar <= "Z") {
    return firstChar;
  }
  return null;
};

// 한글 초성 및 영어 알파벳 그룹화 함수
const groupByCharacters = (list: string[]) => {
  return list.reduce<{ [key: string]: string[] }>((groups, item) => {
    const initialConsonant = getInitialConsonant(item);
    const englishAlphabet = getEnglishAlphabet(item);
    const key = initialConsonant || englishAlphabet || "";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
};

interface InputStyleDropdownProps {
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  inputList: string[];
  value: string;
  onSelect: (selected: string) => void;
  dropdownWidth: number;
  sortGroup?: boolean;
}

const InputStyleDropdown: React.FC<InputStyleDropdownProps> = ({
  errorMessage,
  placeholder = "선택하세요",
  isDisabled,
  isError = false,
  setIsError,
  inputList,
  value,
  onSelect,
  dropdownWidth,
  sortGroup = true,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync external value reset with internal state
    setSelectedItem(value);
  }, [value]);

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

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const selectedItem = event.currentTarget.dataset.item;
    if (selectedItem) {
      setSelectedItem(selectedItem);
      onSelect(selectedItem);
      setIsDropdownVisible(false);
    }
  };


  const handleCancelSelection = () => {
    setSelectedItem("");
    onSelect("");
    setIsDropdownVisible(false);
  };

  const iconStyle = {
    transform: isDropdownVisible ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s",
  };

  const groupedItems = sortGroup
    ? groupByCharacters(inputList)
    : { "": inputList };
  const sortedGroupKeys = sortGroup
    ? Object.keys(groupedItems).sort((a, b) => {
        if (a === "" || b === "") return 0;
        const indexA = initialConsonants.indexOf(a);
        const indexB = initialConsonants.indexOf(b);
        if (indexA === -1 && indexB === -1) {
          return a.localeCompare(b); // Both are English
        }
        if (indexA === -1) return 1; // 'a' is English, sort after Korean
        if (indexB === -1) return -1; // 'b' is English, sort before Korean
        return indexA - indexB; // Both are Korean
      })
    : [""];

  let buttonBorderStyle = isError
    ? "border border-secondary-red-original"
    : isDropdownVisible
    ? "border border-primary-blue-original"
    : "border borderColor";

  let placeholderStyle = selectedItem
    ? "textColor-high-emphasis"
    : "textColor-mid-emphasis";
  let buttonStyle = ` ${buttonBorderStyle} w-full inputSize-l h-[44px] flex justify-between items-center p-s`;

  if (isDisabled) {
    buttonStyle = "bgColor-neutral textColor-low-emphasis " + buttonStyle;
  } else if (isError) {
    buttonStyle =
      "bgColor-white border border-secondary-red-original textColor-high-emphasis" +
      buttonStyle;
  } else {
    buttonStyle = "bgColor-white" + buttonStyle;
  }

  return (
    <div ref={dropdownRef} className={`min-h-[44px] w-[${dropdownWidth}px]`}>
      <button
        className={buttonStyle}
        onClick={toggleDropdown}
        disabled={isDisabled}
      >
        <span className={placeholderStyle}>{selectedItem || placeholder}</span>
        <Icon name="ArrowDown" width={16} height={16} style={iconStyle} />
      </button>
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
      {isDropdownVisible && (
        <div
          className={`w-[${dropdownWidth}px] mt-1 max-h-[284px] overflow-auto py-2 bgColor-navy rounded-s border borderColor shadow-s z-10`}
        >
          <div
            className="w-full h-[32px] p-s cursor-pointer bgColor-white textColor-high-emphasis hover:bgColor-neutral mb-2"
            onClick={handleCancelSelection}
          >
            선택 안함
          </div>
          {sortedGroupKeys.map((initial, groupIndex) => (
            <div key={groupIndex} className="mb-2">
              {sortGroup && (
                <div className="bgColor-white textColor-low-emphasis p-s text-paragraph-16">
                  {initial}
                </div>
              )}
              {groupedItems[initial].map((item, index) => (
                <div
                  key={index}
                  data-item={item}
                  className={`w-full h-[32px] p-s cursor-pointer ${
                    item === value
                      ? "bgColor-blue textColor-focus"
                      : "bgColor-white textColor-high-emphasis"
                  } hover:bgColor-neutral`}
                  onClick={handleItemClick}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default InputStyleDropdown;
