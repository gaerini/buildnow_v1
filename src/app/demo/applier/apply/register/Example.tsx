// HanulApplication.tsx
import React from "react";
import Image from "next/image";
import Icon from "../../../../../../common/components/Icon/Icon";

import InputFileLayer from "../../../../../../common/components/InputForm/InputFileLayer";
import InputStyleUploadBtn from "../../../../../../common/components/InputForm/InputStyleUploadBtn";

type PdfUrlsType = {
  [key: string]: string[];
};

interface HanulApplicationProps {
  hanulApplicationFile: File | null;
  setHanulApplicationFile: React.Dispatch<React.SetStateAction<File | null>>;

  fileError: boolean;
  setFileError: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

export default function Example({}) {
  return (
    <div className="w-full h-fit bgColor-navy border border-primary-navy-original rounded-s p-xl gap-y-4 flex flex-col justify-center">
      <div className="text-paragraph-600 font-bold flex justify-center">
        예시
      </div>
      <div className="flex justify-center w-full gap-x-[7px]">
        <div className="flex flex-col gap-y-1">
          <Icon name="RegisterEx_OK" width={183} height={115} />
          <span className="flex justify-center text-paragraph-12 textColor-title">
            (O)
          </span>
        </div>
        <div>
          <div className="flex flex-col gap-y-1">
            <Icon name="RegisterEx_No" width={183} height={115} />
            <span className="flex justify-center text-paragraph-12 textColor-danger">
              (X)
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-paragraph-14">
        협력업체 등록 신청서에 &nbsp;
        <span className="font-bold">기재한 면허를 모두 등록</span>
        하여 주십시오.
      </div>
      <div className="text-paragraph-14">
        <div className="flex justify-center">
          또한&nbsp;
          <span className="font-bold">
            해당 면허 보유 여부를 인증할 수 있는 건설업 등록증
          </span>
          을
        </div>
        <div className="flex justify-center">올바르게 업로드해 주십시오.</div>
      </div>
    </div>
  );
}
