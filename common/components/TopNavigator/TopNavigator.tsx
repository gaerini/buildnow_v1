import React, { ReactNode, useEffect } from "react";

interface TopNavigatorProps {
  children: ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavigator: React.FC<TopNavigatorProps> = ({
  children,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    // 화면에 렌더링이 완료된 후 isLoading을 false로 설정
    setIsLoading(false);
  }, []);

  return (
    <div className="sticky top-0 h-16 bgColor-white border-b border justify-start items-center inline-flex">
      <div className="flex items-center ml-8 w-full grow">{children}</div>
    </div>
  );
};

export default TopNavigator;
