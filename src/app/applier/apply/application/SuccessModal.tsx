import "./LoadingAnimation.css"; // 애니메이션과 모달창 스타일이 정의된 CSS 파일

import React from "react";
import Icon from "../../../../../common/components/Icon/Icon";

export default function SuccessModal() {
  return (
    <div className="fixed inset-0 bgColor-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white px-[102px] py-8 rounded-m">
        <div className="w-[373px] h-[180px] flex flex-col gap-8">
          <div className="loader">
            <Icon name="YuhoCheck" width={96} height={96} />
          </div>
          <div className="text-center gap-2">
            <span className="textColor-focus text-title-24 font-bold">
              유효성 검토 완료!
            </span>
            <p className="textColor-mid-emphasis text-subTitle18 font-normal">
              잠시만 기다려 주세요 ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
