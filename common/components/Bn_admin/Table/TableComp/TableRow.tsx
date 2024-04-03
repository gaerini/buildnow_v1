"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyInfoSummary } from "../../../Interface/CompanyData";
import axios from "axios";
import Cookies from "js-cookie";
import NProgress from "nprogress";

const TableRow: React.FC<{
  company: CompanyInfoSummary;
}> = ({ company }) => {
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

  //   const handlePatchRequest = async (businessId: string) => {
  //     try {
  //       await axiosInstance.patch(`application/isRead/${businessId}`);
  //       console.log("Patch request successful");
  //       router.refresh();
  //     } catch (error) {
  //       console.error("Error in patch request:", error);
  //     }
  //   };

  const goToDetailPage = () => {
    NProgress.start();
    // handlePatchRequest(businessId);

    router.push(`/bn_admin/${company.id}}`);
  };

  return (
    <div className="flex items-center">
      {/* id */}
      <div className="w-[144px] p-xl justify-start items-center inline-flex bgColor-white border-b borderColor duration-300">
        <div>
          <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
            <div className="m-1 textColor-mid-emphasis text-subTitle-18 font-bold">
              {company.id}
            </div>
          </div>
        </div>
      </div>
      {/* 회사명 */}
      <div
        className="flex-1 p-xl bgColor-white justify-start items-center inline-flex whitespace-nowrap border-b borderColor "
        onClick={goToDetailPage}
      >
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="inline-flex justify-start items-center gap-2">
            <div className="textColor-high-emphasis hover:text-red-500 text-lg">
              {company.companyName}
            </div>
            {!company.isRead && (
              <div className="h-4 relative">
                <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bgColor-positive rounded z-1" />
              </div>
            )}
          </div>
          <div className="text-primary-neutral-500 text-xs font-normal leading-none">
            {company.applyingWorkType}
          </div>
        </div>
      </div>

      {/* 숫자 데이터 */}
      {["applyDate", "joinDate", "isCheck"].map((key, index) => (
        <div
          key={key}
          className="w-[144px] p-xl justify-center items-center inline-flex bgColor-white border-b borderColor duration-300"
        >
          <div>
            <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
              <div className="m-1 textColor-mid-emphasis text-subTitle-18 font-bold">
                {key === "isCheck" ? (company[key] ? "Y" : "N") : company[key]}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableRow;
