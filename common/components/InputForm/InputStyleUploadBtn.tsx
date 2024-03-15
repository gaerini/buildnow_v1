import React, { useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "../Icon/Icon";
import { uploadFileAndGetUrl } from "@/app/api/pdf/utils";

type PdfUrlsType = {
  [key: string]: string[];
};

interface InputStyleUploadBtnProps {
  titleText: string;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setFileNameError?: React.Dispatch<React.SetStateAction<boolean>>;
  truncateWidth?: string;
  description?: string;
  isHelp?: boolean;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

const InputStyleUploadBtn: React.FC<InputStyleUploadBtnProps> = ({
  titleText,
  errorMessage,
  onChange,
  isDisabled = false,
  isError,
  setIsError,
  setFile,
  setFileNameError,
  truncateWidth = "320px",
  description = "권장 용량 및 확장자",
  isHelp = true,
  setPdfUrls,
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // InputStyleUploadBtn.tsx 내 handleFileChange 함수 수정
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file ? file.name : null);
    if (file) {
      setIsError?.(false);
      // 파일 업로드 및 URL 획득
      uploadFileAndGetUrl(file, file.type, titleText, setPdfUrls);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleRemoveFile = () => {
    // 파일이 선택되었는지 확인
    if (selectedFile) {
      // 선택된 파일의 URL을 찾아서 pdfUrls 상태에서 제거합니다.
      setPdfUrls((prevUrls) => {
        const updatedUrls =
          prevUrls[titleText]?.filter(
            (url) => !url.endsWith(encodeURIComponent(selectedFile))
          ) || [];

        if (updatedUrls.length === 0) {
          // 해당 문서 타입의 URL이 더 이상 없으면, 해당 문서 타입 키를 제거합니다.
          const { [titleText]: _, ...remainingUrls } = prevUrls;
          return remainingUrls;
        } else {
          return {
            ...prevUrls,
            [titleText]: updatedUrls,
          };
        }
      });
    }

    // 나머지 파일 제거 로직
    setSelectedFile(null); // 선택한 파일 상태를 null로 설정
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null); // 파일 이름 상태를 빈 문자열로 설정
    setFileNameError?.(false); // 에러 상태를 false로 설정
  };

  const baseStyle = "inputSize-l bgColor-white border borderColor ";
  const errorStyle = "border border-secondary-red-original outline-none";
  const hoverStyle =
    "border hover:outline-none hover:border-primary-blue-original hover:textColor-high-emphasis";
  const disabledStyle = "bgColor-neutral textColor-low-emphasis";

  let inputStyle = `${baseStyle} ${
    isDisabled
      ? disabledStyle
      : isError
      ? errorStyle
      : isHovered
      ? hoverStyle
      : ""
  }`;

  return (
    <div className="w-full min-h-16 flex flex-col justify-start items-start gap-1  whitespace-nowrap">
      {/*  */}
      <div
        className={`w-full flex justify-between items-center ${baseStyle} ${inputStyle}`}
      >
        <div className="flex justify-between items-center gap-2">
          <input
            id={titleText}
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor={titleText}
            onMouseEnter={() => setIsHovered(true)} // 마우스 진입 시 호버 상태 true
            onMouseLeave={() => setIsHovered(false)} // 마우스 벗어날 때 호버 상태 false
            className={`cursor-pointer text-paragraph-16 font-normal 
          ${
            isHovered
              ? "textColor-focus underline underline-offset-4 decoration-current"
              : "textColor-mid-emphasis btnStyle-textOnly"
          }
          tabIndex={0}`}
          >
            파일 선택
          </label>
          <div className="">
            <div
              className="text-paragraph-16 font-normal flex-grow"
              style={{ maxWidth: truncateWidth }}
            >
              {selectedFile ? (
                <p className="truncate textColor-high-emphasis ">
                  {selectedFile}
                </p>
              ) : (
                <p className="textColor-low-emphasis">선택한 파일 없음</p>
              )}
            </div>
          </div>
        </div>
        {selectedFile && (
          <button
            onClick={handleRemoveFile}
            className="right-4 textColor-mid-emphasis justify-center items-center"
          >
            <Icon name="FileX" width={16} height={16} />
          </button>
        )}
      </div>
      {/*  */}
      <div className="w-full textColor-mid-emphasis flex justify-between items-start">
        <div className="text-paragraph-12 font-normal">{description}</div>
        {isHelp && (
          <div className="flex justify-between items-center gap-1">
            <Icon name="Help" width={12} height={12} />
            <div className="text-paragraph-12 font-normal">도움말</div>
          </div>
        )}
      </div>
      {/*  */}
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleUploadBtn;
