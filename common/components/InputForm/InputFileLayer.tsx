import React from "react";
import Icon from "../Icon/Icon";

interface InputFileLayer {
  titleText: string;
  isEssential: boolean;
  inputComponent: React.ReactNode;
}

const InputFileLayer: React.FC<InputFileLayer> = ({
  titleText,
  isEssential,
  inputComponent,
}) => {
  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <div className="flex justify-start items-center gap-1">
        <div className="text-paragraph-14 font-normal textColor-black">
          {titleText}
        </div>
        <>{isEssential && <Icon name="IconLight" width={16} height={16} />}</>
      </div>
      {inputComponent}
    </div>
  );
};

export default InputFileLayer;
