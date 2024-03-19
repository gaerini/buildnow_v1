// NarrowSideNavItem
"use-client";

import Icon from "../Icon/Icon";
import * as svgs from "../Icon/svgs";

export type IconName = keyof typeof svgs;

interface Props {
  icon: IconName;
  Text: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NarrowSideNavitem({
  icon,
  Text,
  isActive,
  onClick,
}: Props) {
  const activeBg = isActive
    ? "bgColor-white border-r-[1px] borderColor duration-500"
    : "hover:bg-primary-neutral-alpha20 duration-500";
  const activeTxt = isActive
    ? "text-primary-blue-original duration-500"
    : "font-normal duration-500";

  return (
    <button
      className={`w-[119px] h-14 flex flex-col justify-center items-center gap-1  transitino-all duration-500  btnStyle-SideBar ${activeBg}`}
      onClick={onClick}
    >
      <Icon
        name={icon}
        width={18}
        height={18}
        style={{ color: isActive ? "#5085EA" : "#000000" }}
      />
      <p className={`text-center text-black text-paragraph-12 ${activeTxt}`}>
        {Text}
      </p>
    </button>
  );
}
