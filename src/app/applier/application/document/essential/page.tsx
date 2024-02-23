"use client";
import React from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";

export default function page() {
  return (
    <div className="flex flex-col w-screen">
      {/* 위쪽 */}
      <ApplierTopNav text="지원서 작성" />
      {/* 오른쪽 */}
      <div className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col">
          <Header
            titleText="3-1. 필수 서류 등록"
            additionalText="필수 서류란?"
            isHoverable={true}
            detailedIcon="✅"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-normal">
                  협력업체 지원을 위해 필수로 등록해야 하는 서류입니다. <br />
                </span>
                <span className="font-bold">
                  등록하지 않으면 협력업체 지원이 불가
                </span>
                <span className="font-normal">합니다</span>
              </div>
            }
          />
          <Essential />
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp={"신영씨앤디"}
          prev={"../info"}
          next={"preferential"}
        />
      </div>
    </div>
  );
}
