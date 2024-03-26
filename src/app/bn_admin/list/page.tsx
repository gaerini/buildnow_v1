"use client";

import React from "react";
import { LoadingProvider } from "../../../../common/components/LoadingContext";

import TablePage from "../../../../common/components/Bn_admin/Table/TablePage";
import ApplierTopNav from "../../../../common/components/ApplierTopNav/ApplierTopNav";

export default function page() {
  return (
    <LoadingProvider>
      <div className="flex justify-between items-center px-4 py-2">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <TablePage />
    </LoadingProvider>
  );
}
