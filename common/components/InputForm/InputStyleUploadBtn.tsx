import React, { useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "../Icon/Icon";

interface InputStyleUploadBtnProps {
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setFileNameError: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputStyleUploadBtn: React.FC<InputStyleUploadBtnProps> = ({
  errorMessage,
  onChange,
  isDisabled = false,
  isError,
  setIsError,
  setFileName,
  setFileNameError,
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file ? file.name : null);
    if (file) {
      setIsError(false);
      // setIsFocused(false);
      // 파일이 선택되면, 오류 상태를 해제
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // 선택한 파일 상태를 null로 설정
    // input type="file"을 초기화합니다.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // 상위 컴포넌트에 변경 사항을 알리려면, onChange 이벤트를 직접 생성하여 호출
    // if (onChange && fileInputRef.current) {
    //   const event = new Event("", { bubbles: true });
    //   onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
    // }
    // 파일 제거 시 상태 업데이트 로직을 직접 호출
    setFileName(""); // 파일 이름 상태를 빈 문자열로 설정
    setFileNameError(false); // 에러 상태를 false로 설정
  };

  const handleBlur = () => {
    // setIsError(false);
    // setIsHovered(true);
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
    <div className="w-full h-16 flex flex-col justify-start items-start gap-1  whitespace-nowrap">
      {/*  */}
      <div
        className={`w-full flex justify-between items-center ${baseStyle} ${inputStyle}`}
      >
        <div className="flex justify-between items-center gap-2">
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            onBlur={handleBlur}
          />
          <label
            htmlFor="file-input"
            onMouseEnter={() => handleBlur()} // 마우스 진입 시 호버 상태 true
            onMouseLeave={() => setIsHovered(false)} // 마우스 벗어날 때 호버 상태 false
            className={`cursor-pointer text-paragraph-16 font-normal 
          ${
            isHovered
              ? "textColor-focus underline underline-offset-4 decoration-current duration-500"
              : "btnStyle-textOnly"
          }
          tabIndex={0}`}
          >
            파일 선택
          </label>
          <div className="w-40 text-paragraph-16 font-normal flex-grow">
            {selectedFile ? (
              <p className="text-ellipsis overflow-hidden textColor-high-emphasis">
                {selectedFile}
              </p>
            ) : (
              <p className="textColor-low-emphasis">선택한 파일 없음</p>
            )}
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
        <div className="text-paragraph-12 font-normal">권장 용량 및 확장자</div>
        <div className="flex justify-between items-center gap-1">
          <Icon name="Help" width={12} height={12} />
          <div className="text-paragraph-12 font-normal">도움말</div>
        </div>
      </div>
      {/*  */}
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleUploadBtn;
