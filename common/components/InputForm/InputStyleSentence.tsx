import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputStyleSentenceProps {
  errorMessage?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  isDisabled?: boolean;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  sentenceLimit?: number;
}

const InputStyleSentence: React.FC<InputStyleSentenceProps> = ({
  errorMessage,
  placeholder,
  onChange,
  isDisabled = false,
  isError = false,
  setIsError,
  sentenceLimit = 30,
}) => {
  const [inputState, setInputState] = useState("");
  const [charCount, setCharCount] = useState(0);
  const charLimit = sentenceLimit;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    const inputValue = e.target.value;
    if (inputValue.length < charLimit) {
      setInputState(inputValue);
      setCharCount(inputValue.length);
      setIsError?.(false);
    } else {
      setCharCount(inputValue.length);
      setIsError?.(true);
    }
  };

  // const handleFocus = () => {
  //   setIsError(false);
  // };

  // const handleBlur = () => {
  //   if (onBlur) {
  //     onBlur(); // onBlur 핸들러 호출
  //     setIsError(false);
  //   }
  // };

  // const inputBaseStyle = "w-full inputSize-l min-h-[160px]";
  // let inputStyle =
  //   " bgColor-white border placeholder:borderColor placeholder:textColor-low-emphasis focus:outline-none focus:bgColor-white  focus:border-primary-blue-original focus:textColor-high-emphasis active:bgColor-white active:borderColor active:textColor-high-emphasis";
  // if (isDisabled) {
  //   inputStyle += "bgColor-neutral textColor-low-emphasis";
  // } else if (isError) {
  //   inputStyle +=
  //     "bgColor-white border border-secondary-red-original textColor-high-emphasis";
  // }

  const baseStyle = "w-full inputSize-l min-h-[160px]";
  const errorStyle =
    " bgColor-white border border-secondary-red-original textColor-high-emphasis outline-none";
  const normalStyle =
    " bgColor-white border placeholder:borderColor placeholder:textColor-low-emphasis focus:outline-none focus:bgColor-white focus:border-primary-blue-original focus:textColor-high-emphasis active:bgColor-white active:borderColor active:textColor-high-emphasis";
  const disabledStyle = "bgColor-neutral textColor-low-emphasis";
  let inputStyle = `${baseStyle} ${
    isDisabled ? disabledStyle : isError ? errorStyle : normalStyle
  }`;

  return (
    <div className="relative h-[160px]">
      <textarea
        className={inputStyle}
        placeholder={placeholder}
        onChange={handleInputChange}
        // onFocus={handleFocus}
        //onBlur={handleBlur}
        disabled={isDisabled}
        value={inputState}
        style={{ resize: "none" }} // 사용자가 크기 조절하는 것을 방지
      />
      <div
        className="absolute bottom-0 right-0 textColor-low-emphasis p-m paragraph-12 font-normal"
        style={{ pointerEvents: "none" }}
      >
        {`${charCount} / ${charLimit}`}
      </div>
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleSentence;
