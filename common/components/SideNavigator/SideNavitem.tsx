"use-client";

import Icon from "../Icon/Icon";
import * as svgs from "../Icon/svgs";

export type IconName = keyof typeof svgs;

interface Props {
  icon: IconName;
  Text: string;
  isActive: boolean; // 아이템이 활성 상태인지 나타내는 prop
  onClick: () => void; // 클릭 이벤트를 처리할 함수 prop
}

export default function SideNavitem({ icon, Text, isActive, onClick }: Props) {
  const activeBg = isActive ? "bg-primary-navy-200" : "hover:bg-neutral-100";
  const activeTxt = isActive ? "font-bold" : "font-normal";

  return (
    <button
      className={`w-[266px] h-14 px-8 py-4 btnStyle-SideBar justify-start items-center gap-2 inline-flex ${activeBg}`}
      onClick={onClick}
    >
      <Icon name={icon} width={24} height={24} />
      <p
        className={`text-center text-black text-lg leading-[21.6px] ${activeTxt}`}
      >
        {Text}
      </p>
    </button>
  );
}
