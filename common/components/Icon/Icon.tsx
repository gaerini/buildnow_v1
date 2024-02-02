"use client";

import React, { CSSProperties, PropsWithChildren } from "react";
import * as svgs from "./svgs";

export type IconName = keyof typeof svgs;
export const iconNames = Object.keys(svgs) as IconName[];

type IconProps = {
  name: IconName;
};

export default function Icon(
  props: PropsWithChildren<React.SVGProps<SVGSVGElement> & IconProps>
) {
  //   console.log(iconNames);

  const { name } = props;
  console.log(svgs[name]);
  const SVGComponent = svgs[name];
  //   console.log(<SVGComponent />);

  const style: CSSProperties = {
    color: props.color || "currentColor",
    ...props.style,
    // transform: rotate ? "rotate(${rotate}deg)" : undefined,
  };
  return <SVGComponent {...props} style={style} />;
}
