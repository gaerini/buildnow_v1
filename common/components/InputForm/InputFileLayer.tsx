import React from "react";
import Icon from "../Icon/Icon";

interface InputFileLayer {
  titleText: string;
  isEssential: boolean;
  fileName?: string | string[];
  fileNameError?: boolean;
  inputComponent: React.ReactNode;
}

const InputFileLayer: React.FC<InputFileLayer> = ({
  titleText,
  isEssential,
  fileName,
  fileNameError,
  inputComponent,
}) => {
  const hasFiles = Array.isArray(fileName) ? fileName.length > 0 : !!fileName;

  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <div className="text-paragraph-14 font-normal textColor-high-emphasis">
            {titleText}
          </div>
          <>{isEssential && <Icon name="IconLight" width={16} height={16} />}</>
        </div>
        <div
          className={
            hasFiles && !fileNameError
              ? "textColor-positive"
              : "textColor-low-emphasis"
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
