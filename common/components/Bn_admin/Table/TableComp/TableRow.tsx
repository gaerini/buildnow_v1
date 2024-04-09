"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyInfoSummary } from "../../../Interface/CompanyData";
import axios from "axios";
import Cookies from "js-cookie";
import NProgress from "nprogress";

const TableRow: React.FC<{
  data: any;
}> = ({ data }) => {
  const [accessJWTToken, setAccessJWTToken] = useState(
    Cookies.get("accessToken")
  );

  const router = useRouter();

  //   const axiosInstance = axios.create({
  //     baseURL:
  //       "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
  //     headers: {
  //       Authorization: `Bearer ${accessJWTToken}`,
  //     },
  //   });

  // const handlePatchRequest = async (businessId: string) => {
  //   try {
  //     await axios.patch(`application/isRead/${businessId}`);
  //     console.log("Patch request successful");
  //     router.refresh();
  //   } catch (error) {
  //     console.error("Error in patch request:", error);
  //   }
  // };

  const goToDetailPage = () => {
    // NProgress.start();
    // handlePatchRequest(businessId);

    router.push(`/bn_admin/list/${data.application.id}/ocr`);
  };

  return (
    <div
      className="flex items-center bgColor-white hover:bg-primary-blue-100"
      onClick={goToDetailPage}
    >
      {/* id */}
      <div className="w-[144px] p-xl justify-start items-center inline-flex  border-b borderColor duration-300">
        <div>
          <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
            <div className="m-1 textColor-mid-emphasis text-subTitle-18 font-bold">
              {data.application.id}
            </div>
          </div>
        </div>
      </div>
      {/* 회사명 */}
      <div className="flex-1 p-xl  justify-start items-center inline-flex whitespace-nowrap border-b borderColor ">
        <div className="min-w-2 h-[40px] flex-col justify-center items-center gap-1 inline-flex">
          <div className="inline-flex justify-center items-center gap-2">
            <div className="textColor-high-emphasis hover:text-red-500 text-lg">
              {data.applier.companyName}
            </div>
            {/* {!company.isRead && (
              <div className="h-4 relative">
                <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bgColor-positive rounded z-1" />
              </div>
            )} */}
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
