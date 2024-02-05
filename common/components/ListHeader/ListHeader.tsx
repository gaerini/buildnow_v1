"use client";
import React, { useState } from "react";
import Icon from "../Icon/Icon";

export default function ListHeader() {
  // 현재 활성화된 버튼을 추적하는 상태입니다. "total" 또는 "new" 값을 가질 수 있습니다.
  const [activeButton, setActiveButton] = useState<string>("total");

  // 버튼의 활성 상태를 설정하는 핸들러 함수입니다.
  const handleSetActiveButton = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="h-14 px-8 justify-start items-center gap-96 inline-flex">
      <div className="flex gap-2">
        <button
          className={`btnStyle-main-2 btnSize-s ${
            activeButton === "total"
              ? "bg-primary-neutral-200 text-primary-neutral-black"
              : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black"
          }`}
          onClick={() => handleSetActiveButton("total")}
        >
          <p className="whitespace-nowrap">총 갯수 321</p>
        </button>

        <button
          className={`btnStyle-main-2 btnSize-s inline-flex items-center ${
            activeButton === "new"
              ? "bg-primary-neutral-200 text-primary-neutral-black"
              : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black"
          }`}
          onClick={() => handleSetActiveButton("new")}
        >
          <p className="whitespace-nowrap">신규 접수 9</p>
          <div className="w-2 h-2 ml-2 bg-orange-300 rounded-lg" />
        </button>
      </div>

      <button className="btnStyle-main-2 btnSize-s items-center gap-2 inline-flex hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black">
        <Icon
          name="DownLoad"
          width={16}
          height={16}
          color="hover:primary-neutral-black"
        />
        <p className="whitespace-nowrap">엑셀로 내려받기</p>
      </button>
    </div>
  );
}
