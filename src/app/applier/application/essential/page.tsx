"use client";

import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../common/components/ApplierApply/Essential";

import React from "react";

export default function page() {
  return (
    <div className="relative flex flex-col w-full justify-center items-center h-screen bgColor-navy">
      <ApplierTopNav text="지원서 작성" />
      <div className="w-full flex flex-col  mt-[64px] flex-grow">
        <Essential />
      </div>
    </div>
  );
}
