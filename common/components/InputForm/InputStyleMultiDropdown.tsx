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
// 한글 초성 분류
const getInitialConsonant = (char: string) => {
  const unicodeVal = char.charCodeAt(0);
  const koreanCharIndex = unicodeVal - 44032;
  if (koreanCharIndex < 0 || koreanCharIndex > 11171) return null;
  const initialIndex = Math.floor(koreanCharIndex / 588);
  return initialConsonants[initialIndex] || null;
};

// 한글 초성 그룹화
const groupByInitialConsonants = (list: string[]) => {
  return list.reduce<{ [key: string]: string[] }>((groups, item) => {
    const initialConsonant = getInitialConsonant(item) || "";
    groups[initialConsonant] = groups[initialConsonant] || [];
    groups[initialConsonant].push(item);
    return groups;
  }, {});
};

interface InputStyleMultiDropdownProps {
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  inputList: string[];
  value: string; // 현재 선택된 값
  onSelect: (selected: string) => void; // 항목 선택 핸들러
  onCancel: (selected: string) => void; // 항목 선택 핸들러
  dropdownWidth: number;
  sortGroup?: boolean; // 추가된 prop
}

const InputStyleMultiDropdown: React.FC<InputStyleMultiDropdownProps> = ({
  errorMessage,
  placeholder,
  isDisabled = false,
  isError = false,
  setIsError,
  inputList,
  value,
  onSelect,
  onCancel,
  dropdownWidth,
  sortGroup = true,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedItem = event.currentTarget.dataset.item;
    if (clickedItem) {
      if (clickedItem === "전체") {
        // "전체"가 클릭되면 다른 선택 항목 초기화
        setSelectedItems(["전체"]);
      } else {
        // "전체"가 아닌 항목이 선택되면 "전체" 제거
        const newSelectedItems = selectedItems.filter(
          (item) => item !== "전체"
        );
        if (!newSelectedItems.includes(clickedItem)) {
          newSelectedItems.push(clickedItem);
        }
        setSelectedItems(newSelectedItems);
      }
      onSelect(clickedItem);
      setIsDropdownVisible(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectedItems([]);
    onCancel; // 선택을 초기화
    setIsDropdownVisible(false); // 드롭다운 닫기
  };

  const iconStyle = {
    transform: isDropdownVisible ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s",
  };

  // 드롭다운 항목을 초성별로 그룹화 및 정렬
  // 드롭다운 항목을 초성별로 그룹화 및 정렬 (sortGroup이 true일 경우에만)
  // 드롭다운 항목을 초성별로 그룹화 및 정렬 (sortGroup에 따라 변경)
  const groupedItems = sortGroup
    ? groupByInitialConsonants(inputList)
    : { "": inputList };
  const sortedGroupKeys = sortGroup
    ? Object.keys(groupedItems).sort((a, b) => {
        if (a === "" || b === "") return 0; // 빈 문자열인 경우 위치 변경 없음
        const indexA = initialConsonants.indexOf(a);
        const indexB = initialConsonants.indexOf(b);
        return (
          (indexA === -1 ? initialConsonants.length : indexA) -
          (indexB === -1 ? initialConsonants.length : indexB)
        );
      })
    : [""];

  let buttonBorderStyle = isError
    ? "border border-secondary-red-original"
    : isDropdownVisible
    ? "border border-primary-blue-original"
    : "border borderColor";

  let placeholderStyle =
    selectedItems.length > 0
      ? "textColor-high-emphasis"
      : "textColor-mid-emphasis";

  let buttonStyle = `bgColor-white ${buttonBorderStyle} w-full inputSize-l h-[44px] flex justify-between items-center p-s`;

  if (isDisabled) {
    buttonStyle = "bgColor-neutral textColor-low-emphasis " + buttonStyle;
  } else if (isError) {
    buttonStyle =
      "bgColor-white border border-secondary-red-original textColor-high-emphasis" +
      buttonStyle;
  }

  return (
    <div ref={dropdownRef} className={`min-h-[44px] w-[${dropdownWidth}px]`}>
      <div className={buttonStyle} onClick={toggleDropdown}>
        <span className={placeholderStyle}>{placeholder}</span>
        <Icon name="ArrowDown" width={16} height={16} style={iconStyle} />
      </div>
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
              {sortGroup && initial !== "" && (
                <div className="bgColor-white textColor-low-emphasis p-s text-paragraph-16">
                  {initial}.
                </div>
              )}
              {groupedItems[initial].map((item, index) => (
                <div
                  key={index}
                  data-item={item}
                  className={`w-full h-[32px] p-s cursor-pointer ${
                    selectedItems.includes(item)
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

export default InputStyleMultiDropdown;
