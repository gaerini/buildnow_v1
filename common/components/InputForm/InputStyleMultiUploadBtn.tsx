import React, { useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import FileBadge from "./FileBadge";
import Icon from "../Icon/Icon";
import { uploadFileAndGetUrl } from "@/app/api/pdf/utils";
import ToolTip from "../ApplierApply/ToolTip";

type PdfUrlsType = {
  [key: string]: string[];
};

interface InputStyleMultiUploadBtnProps {
  titleText: string;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  setFilesNameError?: React.Dispatch<React.SetStateAction<boolean>>;
  badgeWidth?: string;
  description?: string;
  isHelp?: boolean;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
  isToolTip?: boolean;
  detailedText?: React.ReactNode;
}

const InputStyleMultiUploadBtn: React.FC<InputStyleMultiUploadBtnProps> = ({
  titleText,
  errorMessage,
  onChange,
  isDisabled = false,
  isError,
  setIsError,
  setFiles,
  setFilesNameError,
  badgeWidth = "49%",
  description = "권장 용량 및 확장자",
  isHelp = true,
  setPdfUrls,
  isToolTip = false,
  detailedText,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // tooptip 관련
  const [showToolTip, setShowToolTip] = useState(false);
  const helpButtonRef = useRef<HTMLButtonElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const badgeStyle = {
    maxWidth: badgeWidth.includes("%")
      ? `w-[${badgeWidth}]`
      : `w-[${badgeWidth}%]`,
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // 파일이 선택되면 오류 상태를 해제합니다.
    setIsError?.(false);

    // 모든 새로운 파일을 S3에 업로드하고 URL을 받아옵니다.
    for (const file of newFiles) {
      await uploadFileAndGetUrl(file, file.type, titleText, setPdfUrls);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);

      // 파일 목록을 업데이트한 후 남은 파일이 없으면 input의 값을 초기화합니다.
      if (updatedFiles.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFiles?.(updatedFiles);

      // pdfUrls 상태에서 해당 파일의 URL을 제거합니다.
      setPdfUrls((prevUrls) => {
        const updatedUrls =
          prevUrls[titleText]?.filter(
            (url) => !url.endsWith(encodeURIComponent(fileName))
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

      return updatedFiles;
    });
    setFilesNameError?.(false); // 에러 상태를 false로 설정합니다.
  };

  const handleHelpClick = () => {
    if (helpButtonRef.current) {
      const rect = helpButtonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 8,
        left: rect.right + window.scrollX + 8, // 8 pixels to the right
      });
    }
    setShowToolTip(!showToolTip);
  };

  const baseStyle = "inputSize-l bgColor-white border borderColor";
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
    <div className="w-full h-auto flex flex-col justify-start items-start gap-1 whitespace-nowrap">
      <div
        className={`w-full flex justify-start items-center ${baseStyle} ${inputStyle} gap-2`}
      >
        <input
          id={titleText}
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple // 여러 파일 선택을 허용합니다.
        />
        <label
          htmlFor={titleText}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer text-paragraph-16 font-normal ${
            isHovered
              ? "textColor-focus underline underline-offset-4 decoration-current"
              : "textColor-mid-emphasis btnStyle-textOnly"
          } tabIndex={0}`}
        >
          파일 선택
        </label>
        {selectedFiles.length === 0 && (
          <p className="textColor-low-emphasis">선택한 파일 없음</p>
        )}
      </div>
      <div className="w-full textColor-mid-emphasis flex justify-between items-start">
        <div className="text-paragraph-12 font-normal">{description}</div>
        {isHelp && (
          <div
            className={`flex justify-between items-center gap-1 h-[16px] ${
              showToolTip ? "textColor-focus" : ""
            }`}
          >
            <Icon name="Help" width={12} height={12} />
            <button
              ref={helpButtonRef}
              onClick={handleHelpClick}
              className={`text-caption font-normal hover:border-b  hover:border-primary-neutral-600 ${
                showToolTip ? "textColor-focus" : ""
              }`}
            >
              도움말
            </button>
            {showToolTip && isToolTip && (
              <ToolTip
                detailedText={detailedText}
                bgColor="neutral"
                style={{
                  position: "absolute",
                  top: tooltipPosition.top,
                  left: tooltipPosition.left,
                }}
              />
            )}
          </div>
        )}
      </div>
      <div
        className="w-full flex flex-wrap justify-start items-center gap-[4px]" // 파일 배지를 위한 컨테이너에 flex-wrap 적용
      >
        {selectedFiles.map((file, index) => (
          <FileBadge
            key={index}
            filename={file.name}
            title={file.name}
            handleRemoveFile={() => handleRemoveFile(file.name)}
          />
        ))}
      </div>
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleMultiUploadBtn;
