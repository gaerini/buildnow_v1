import React from "react";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 정확한 경로를 입력해주세요.

interface ApplierTopNavProps {
  text: string;
  showButton?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>; // onSave 함수로, post/patch 로직 전달
}

const ApplierTopNav: React.FC<ApplierTopNavProps> = ({
  text,
  showButton,
  onSave,
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-[64px] flex justify-between bgColor-white border-b borderColor">
      {/* 첫번째 영역: 로고 */}
      <div className="flex items-center p-xl w-[266px]">
        <Icon name="logo_kor_horiz" width={141} height={32} />
      </div>

      {/* 두번째 영역: 텍스트와 버튼 */}
      <div
        className="flex items-center justify-between p-xl bg-bgColor-white"
        style={{ flex: 1 }}
      >
        <span className="font-bold textColor-high-emphasis text-subTitle-20 whitespace-nowrap">
          {text}
        </span>
        {showButton && (
          <button
            onClick={onSave}
            className="btnStyle-main-2 btnSize-s whitespace-nowrap hover:textColor-high-emphasis hover:bgColor-neutral"
          >
            지원서 임시저장
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplierTopNav;
