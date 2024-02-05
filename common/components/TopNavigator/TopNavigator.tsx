import React, { ReactNode } from "react";

interface TopNavigatorProps {
  children: ReactNode;
}

const TopNavigator: React.FC<TopNavigatorProps> = ({ children }) => {
  return (
    <div className="sticky top-0 h-16 bg-primary-neutral-white border-b border-primary-neutral-300 justify-between items-center inline-flex ">
      <div className="flex items-center ml-8 gap-x-3">
        <div className="text-subTitle-20 weight-medium w-max">공종명 :</div>
        <div>{children}</div>
      </div>

      <div className="justify-center items-center gap-4 inline-flex m-8">
        <div className="w-14 h-5 justify-center items-center flex">
          <div className="text-neutral-500 text-base font-normal whitespace-nowrap">
            로그아웃
          </div>
        </div>
        <div className="text-center text-neutral-500 text-base font-normal">
          |
        </div>
        <div className="w-14 h-5 justify-center items-center flex">
          <div className="text-neutral-500 text-base font-normal whitespace-nowrap">
            고객센터
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigator;