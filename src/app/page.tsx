"use-client";

import Image from "next/image";
import Icon from "../../common/components/Icon/Icon";
import Dropdown from "../../common/components/Dropdown/Dropdown";
import CheckBox from "../../common/components/CheckBox/CheckBox";

export default function Home() {
  return (
    <>
      <CheckBox text1="한국" text2="호주" />
      <Dropdown />
    </>
  );
}
