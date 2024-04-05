"use client";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie"; // js-cookie 라이브러리를 사용
import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import { useRouter } from "next/navigation";

import { access } from "fs";

export default function page() {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };

  const recruitementId = 1;

  const deleteExistingApplication = async (applicationId: string) => {
    try {
      const accessTokenApplier = Cookies.get("accessTokenApplier"); // 쿠키에서 accessToken을 가져옴
      const deleteResponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/application/applier/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`,
          },
        }
      );

      if (deleteResponse.status === 204 || deleteResponse.status === 200) {
        console.log(
          `Existing application with ID ${applicationId} deleted successfully.`
        );
        // 삭제 후 새로운 지원서를 제출할 수 있습니다.
        handleSubmitNewApplication();
      } else {
        console.error(
          `Failed to delete existing application with ID ${applicationId}.`
        );
      }
    } catch (deleteError) {
      console.error("Failed to delete existing application", deleteError);
    }
  };

  const handleSubmitNewApplication = async () => {
    try {
      const accessTokenApplier = Cookies.get("accessTokenApplier"); // 쿠키에서 accessToken을 가져옴
      let form = new FormData();
      form.append("documentURL", "");
      form.append("corporateApplicationNum", "");
      form.append("companyPhoneNum", "");
      form.append("workTypeApplying", "");
      form.append("patent1Name", "");
      form.append("patent2Name", "");
      form.append("patent3Name", "");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/application/applier/${recruitementId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`, // 헤더에 accessToken 추가
          },
        }
      );

      // console.log("와이", response);
      if (response.status === 201) {
        // 새 지원서 제출이 성공하면 response에서 applicationId를 추출하고 쿠키에 저장
        Cookies.set("applicationId", response.data.id, { expires: 1 });
        // 사용자를 지원서 작성 페이지로 이동시킵니다.
        // console.log(response.data.id);
        NavItemClick("/applier/apply/application");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        console.log("서버에러", serverError);

        // 문자열이 포함되어 있는지 확인합니다.
        const errorResponseData = serverError.response?.data;
        if (typeof errorResponseData === "string") {
          // 문자열 내에 특정 메시지가 포함되어 있는지 확인하고 처리합니다.
          if (errorResponseData.includes("이미 지원한 내역")) {
            const existingApplicationIdMatch =
              errorResponseData.match(/applicationId: (\d+)/);
            if (existingApplicationIdMatch) {
              const existingApplicationId = existingApplicationIdMatch[1];
              console.log("기존 지원서 ID:", existingApplicationId);
              await deleteExistingApplication(existingApplicationId);
            }
          }
        } else {
          console.error("Application submission failed", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen bgColor-navy">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <button
          className="btnStyle-main-1 btnSize-xl  w-[311px] hover:bg-primary-blue-400"
          onClick={() => NavItemClick("/applier/apply/application")}
        >
          저장된 지원서 불러오기
        </button>
        <button
          className="btnStyle-main-3 btnSize-xl w-[311px] hover:bg-primary-navy-500"
          onClick={handleSubmitNewApplication} // 수정된 onClick 이벤트 핸들러
        >
          새로운 지원서 작성하기
        </button>
      </div>
      <div className="absolute bottom-0 mt-14">
        <HelpButtons />
      </div>
    </div>
  );
}
