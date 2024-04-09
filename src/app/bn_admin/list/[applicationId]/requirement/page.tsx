"use client";

import React from "react";

import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import SecondStepPage from "../../../../../../common/components/Bn_admin/SecondStep/SecondStepPage";

export default function page({
  params,
}: {
  params: { applicationId: string };
}) {
  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <SecondStepPage />
    </>
  );
}
