"use client";

import React from "react";

import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import ThirdStepPage from "../../../../../../common/components/Bn_admin/ThirdStep/ThirdStepPage";

export default function page() {
  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <ThirdStepPage />
    </>
  );
}
