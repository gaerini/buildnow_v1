import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputStyleBtnProps {
  type: string;
  errorMessage?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
}

const InputStyleBtn: React.FC<InputStyleBtnProps> = ({
  type,
  errorMessage,
  placeholder,
  onChange,
  isDisabled = false,
  isError = false,
  setIsError,
  buttonText,
}) => {
  const [inputState, setInputState] = useState("default");
  const [isInputFilled, setIsInputFilled] = useState(false);

  // 부모 컴포넌트로
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
      setIsInputFilled(e.target.value.trim() !== "");
    }
  };

  const handleFocus = () => {
    setInputState("hover");
    setIsError?.(false);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState("active");
    setIsInputFilled(e.target.value.trim() !== "");
    setIsError?.(false);
  };

  const inputBaseStyle = "w-full inputSize-l h-[44px]";
  let inputStyle =
    " bgColor-white border placeholder:borderColor placeholder:textColor-low-emphasis focus:outline-none focus:bgColor-white  focus:border-primary-blue-original focus:textColor-high-emphasis active:bgColor-white active:borderColor active:textColor-high-emphasis";
  const btnBaseStyle = "btnSize-m whitespace-nowrap rounded-s";
  let buttonStyle = " btnStyle-main-2";

  if (isDisabled) {
    inputStyle += "bgColor-neutral textColor-low-emphasis";
    buttonStyle = "border-none bgColor-neutral textColor-low-emphasis";
  } else if (isError) {
    inputStyle +=
      "bgColor-white border border-secondary-red-original textColor-black";
  } else {
    switch (inputState) {
      case "active":
        if (isInputFilled) {
          // 입력 필드가 비어있지 않은 경우에만 스타일 적용
          buttonStyle =
            " bgColor-blue border border-primary-blue-original textColor-focus";
        }
        break;
    }
  }

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <input
          type={type}
          className={`${inputBaseStyle} ${inputStyle}`}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
        />
        <button className={`${btnBaseStyle} ${buttonStyle}`}>
          {buttonText}
        </button>
      </div>
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleBtn;
