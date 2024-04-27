"use client";

import React from "react";

interface AdminAddTopProps {
  step: string;
  companyName: string;
  workType: string;
  applicationId: string;
}

const AdminAddTop: React.FC<AdminAddTopProps> = ({
  step,
  companyName,
  workType,
  applicationId,
}) => {
  const name = decodeURI(companyName);
  const type = decodeURI(workType);

  return (
    <div className="fixed top-[64px] w-screen flex justify-between items-center pl-7 p-3  bgColor-blue border-primary-navy-200 border-[1px]">
      <div className="flex justify-between items-center gap-12">
        <p className="text-subTitle-20 font-semibold textColor-title">{step}</p>
        <p className="text-subTitle-20 textColor-title">{name}</p>
        <div className="inline-flex flex-col text-paragraph-12 items-start textColor-title">
          <p>지원 공종 : {type}</p>
          <p>지원날짜 : 2024-04-17</p>
          <p>applicationId : {applicationId}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAddTop;
