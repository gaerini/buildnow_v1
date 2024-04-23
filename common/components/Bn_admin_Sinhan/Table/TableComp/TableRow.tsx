"use client";

import React from "react";
import { useRouter } from "next/navigation";

const TableRow: React.FC<{
  data: any;
}> = ({ data }) => {
  const router = useRouter();

  const goToDetailPage = () => {
    // NProgress.start();
    // handlePatchRequest(businessId);

    router.push(`/bn_admin_sinhan/list/${data.application.id}/requirement`);
  };

  return (
    <div
      className="flex items-center bgColor-white hover:bg-primary-blue-100"
      onClick={goToDetailPage}
    >
      {/* id */}
      <div className="w-[144px] p-xl justify-center items-center inline-flex  border-b borderColor duration-300">
        <div>
          <div className="h-[40px] items-center inline-flex gap-0.5">
            <div className="m-1 textColor-mid-emphasis text-subTitle-18 font-bold">
              {data.application.id}
            </div>
          </div>
        </div>
      </div>
      {/* 회사명 */}
      <div className="flex-1 p-xl  justify-start items-center inline-flex whitespace-nowrap border-b borderColor ">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="textColor-high-emphasis hover:text-red-500 text-lg">
            {data.applier.companyName}
          </div>
          <div className="text-primary-neutral-500 text-xs font-normal leading-none">
            {data.application.workTypeApplying}
          </div>
        </div>
      </div>

      {/* 그외 데이터 */}
      {["appliedDate", "adminChecked"].map((key, index) => (
        <div
          key={key}
          className="w-[144px] p-xl justify-center items-center inline-flex  border-b borderColor duration-300"
        >
          <div>
            <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
              <div className="whitespace-nowrap m-1 textColor-mid-emphasis text-subTitle-18 font-bold">
                {key === "adminChecked"
                  ? data.application[key]
                    ? "Y"
                    : "N"
                  : data.application[key]}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableRow;
