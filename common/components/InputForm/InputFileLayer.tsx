import React from "react";
import Icon from "../Icon/Icon";

interface InputFileLayer {
  titleText: string;
  isEssential: boolean;
  fileName: string | string[];
  fileNameError: boolean;
  inputComponent: React.ReactNode;
}

const InputFileLayer: React.FC<InputFileLayer> = ({
  titleText,
  isEssential,
  fileName,
  fileNameError,
  inputComponent,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <div className="text-paragraph-14 font-normal textColor-black">
            {titleText}
          </div>
          <>{isEssential && <Icon name="IconLight" width={16} height={16} />}</>
        </div>
        <div
          className={
            !fileNameError && fileName.length > 0
              ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
              : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
          }
        >
          <Icon name="SubmitCheck" width={16} height={16} />
        </div>
      </div>
      {inputComponent}
    </div>
  );
};

export default InputFileLayer;
