"use client";
import React from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Optional from "../../../../../../common/components/ApplierApply/Optional";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";

export default function page() {
  return (
    <div className="select-none flex flex-col w-full h-screen">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-grow">
        <div className="flex flex-col">
          <Header
            titleText="3-3. 선택 서류 등록"
            additionalText="선택 서류란?"
            isHoverable={true}
            detailedIcon="🙌"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-normal">
                  필수 서류 및 우대 서류 이외에
                </span>
                <span className="font-bold">
                  귀사에 대해 더 소개하고 싶은 <br />
                </span>
                <span className="font-bold">내용을 담은 서류</span>
                <span className="font-normal">를 등록하시면 됩니다.</span>
              </div>
            }
          />
          <Optional />
        </div>
        <ApplierSideNav comp={"신영씨앤디"} prev={"preferential"} next={""} />
      </div>
    </div>
  );
}
