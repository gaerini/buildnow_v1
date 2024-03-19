"use-client";

import Icon from "../Icon/Icon";
import * as svgs from "../Icon/svgs";

export type IconName = keyof typeof svgs;

interface Props {
  icon: IconName;
  Text: string;
  isActive: boolean; // 아이템이 활성 상태인지 나타내는 prop
  onClick: () => void; // 클릭 이벤트를 처리할 함수 prop
  isNarrow: boolean;
}

export default function SideNavitem({
  icon,
  Text,
  isActive,
  onClick,
  isNarrow,
}: Props) {
  const activeBg = isActive
    ? "bgColor-white border-r-[1px] borderColor duration-500"
    : "hover:bg-primary-neutral-alpha20 duration-500";
  const activeTxt = isActive
    ? "text-primary-blue-original duration-500"
    : "font-normal duration-500";

  return (
    <>
      {isNarrow ? (
        <button
          className={`w-[119px] h-14 flex flex-col justify-center items-center gap-1  transition-all  duration-200  btnStyle-SideBar ${activeBg}`}
          onClick={onClick}
        >
          <Icon
            name={icon}
            width={18}
            height={18}
            style={{ color: isActive ? "#5085EA" : "#000000" }}
          />
          <p
            className={`text-center text-black text-paragraph-12 ${activeTxt}`}
          >
            {Text}
          </p>
        </button>
      ) : (
        <button
          className={`w-[266px] h-14 p-xl btnStyle-SideBar justify-start items-center transition-all  duration-200 gap-2 inline-flex ${activeBg}`}
          onClick={onClick}
        >
          <Icon
            name={icon}
            width={24}
            height={24}
            style={{
              color: isActive ? "#5085EA" : "#000000",
            }}
          />
          <p className={`text-center text-black text-subTitle-18 ${activeTxt}`}>
            {Text}
          </p>
        </button>
      )}
    </>
  );
}
