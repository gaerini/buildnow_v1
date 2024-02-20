import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputStyleDefaultProps {
  type: string;
  errorMessage?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError?: boolean;
}

const InputStyleDefault: React.FC<InputStyleDefaultProps> = ({
  type,
  errorMessage,
  placeholder,
  onChange,
  isDisabled = false,
  isError = false,
}) => {
  const [inputState, setInputState] = useState("default");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setInputState("hover");
  };

  const handleBlur = () => {
    setInputState("active");
  };

  const inputBaseStyle = "w-full inputSize-l h-[44px]";
  let inputStyle =
    " bgColor-white border placeholder:borderColor placeholder:textColor-low-emphasis focus:outline-none focus:bgColor-white  focus:border-primary-blue-original focus:textColor-high-emphasis active:bgColor-white active:borderColor active:textColor-high-emphasis";
  if (isDisabled) {
    inputStyle = "bgColor-neutral textColor-low-emphasis";
  } else if (isError) {
    inputStyle =
      "bgColor-white border border-secondary-red-original textColor-black";
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
        disabled={isDisabled}
      />
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleDefault;
