import "./LoadingAnimation.css"; // 애니메이션과 모달창 스타일이 정의된 CSS 파일

import React from "react";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bgColor-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white px-[102px] py-8 rounded-m">
        <div className="w-[373px] h-[180px] flex flex-col gap-8">
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="gap-2">
            <div className="text-center">
              <span className="textColor-high-emphasis text-title-24 font-bold">
                빌드나우 AI 가 등록신청서의 <br />
              </span>
              <span className="textColor-focus text-title-24 font-bold">
                유효성을 검토
              </span>
              <span className="textColor-high-emphasis text-title-24 font-bold">
                하고 있습니다.
              </span>
            </div>
            <p className="textColor-mid-emphasis text-subTitle18 font-normal">
              웹 브라우저를 종료하지 말고 잠시만 기다려 주세요 ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
