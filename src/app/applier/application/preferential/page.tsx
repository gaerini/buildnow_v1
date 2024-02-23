"use client";
import React from "react";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Preferential from "../../../../../common/components/ApplierApply/Preferential";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../common/components/ApplierApply/Header";

export default function page() {
  return (
    <div className="select-none flex flex-col w-full h-screen">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-grow">
        <div className="flex flex-col">
          <Header
            titleText="3-2. 우대 서류 등록"
            additionalText="우대 서류란?"
            isHoverable={true}
            detailedIcon="😎"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-bold">
                  등록 시 우대 점수를 받을 수 있는 서류
                </span>
                <span className="font-normal">
                  들입니다. <br />
                </span>
                <span className="font-normal">
                  우대서류를 등록하지 않아도 협력업체 지원은 가능합니다.
                </span>
              </div>
            }
          />
          <Preferential />
        </div>
        <ApplierSideNav
          comp={"신영씨앤디"}
          prev={"essential"}
          next={"optional"}
        />
      </div>
    </div>
  );
}
