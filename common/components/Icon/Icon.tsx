"use client";

import React, { CSSProperties, PropsWithChildren } from "react";
import * as svgs from "./svgs";

export type IconName = keyof typeof svgs;
export const iconNames = Object.keys(svgs) as [IconName];

type IconProps = {
  name: IconName;
  rotate?: number;
};

export default function Icon(
  props: PropsWithChildren<React.SVGProps<SVGSVGElement>>
) {
  const { name, rotate } = props;
  const SVGComponent = svgs[name];
  const style: CSSProperties = {
    color: props.color || "currentColor",
    ...props.style,
    transform: rotate ? "rotate(${rotate}deg)" : undefined,
  };

  return <SVGComponent {...props} style={style} />;
}
