import React, { ReactNode, useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputStyleDefaultProps {
  type: string;
  errorMessage?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // onBlur?: () => void;
  value?: string;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputStyleDefault: React.FC<InputStyleDefaultProps> = ({
  type,
  errorMessage,
  placeholder,
  onChange,
  value,
  // onBlur,
  isDisabled = false,
  isError = false,
  setIsError,
}) => {
  const [inputState, setInputState] = useState("default");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setInputState("hover");
    setIsError?.(false);
  };

  const handleBlur = () => {
    setInputState("active");
    setIsError?.(false);
  };

  const inputBaseStyle = "w-full inputSize-l h-[44px]";
  let inputStyle =
    " bgColor-white border borderColor placeholder:borderColor placeholder:textColor-low-emphasis focus:outline-none focus:bgColor-white  focus:border-primary-blue-original focus:textColor-high-emphasis active:bgColor-white active:borderColor active:textColor-high-emphasis";
  if (isDisabled) {
    inputStyle = "bgColor-neutral textColor-low-emphasis border-0";
  } else if (isError) {
    inputStyle =
      "bgColor-white border border-secondary-red-original textColor-high-emphasis";
  }

  return (
    <div>
      <input
        type={type}
        className={`${inputBaseStyle} ${inputStyle}`}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value} // 입력 필드에 value 바인딩
        disabled={isDisabled}
      />
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleDefault;
