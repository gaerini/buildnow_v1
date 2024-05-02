"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import InputExcelUpload from "../../../../../common/components/InputForm/InputExcelUpload";

const ResultPage = () => {
  const companyName = "신한종합건설";
  const router = useRouter();

  // 컴포넌트가 마운트된 후 3초 뒤에 페이지 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/applier/account/login");
    }, 2000); // 2초 후 이동

    // 컴포넌트 언마운트 시 타이머 해제
    return () => clearTimeout(timer);
  }, [router]); // 의존성 배열에 router 추가

  return (
    <div className="flex flex-col w-full h-screen bgColor-navy justify-center items-center">
      <div className=" w-[375px] h-full flex-col justify-center items-center flex px-8 gap-y-[120px]">
        <div className="flex flex-col  gap-y-4">
          <div className="w-full">
            <span className="textColor-focus text-title-28 font-bold ">
              {companyName}
            </span>
            <span className="textColor-title text-title-28 font-medium">
              {" "}
              협력업체 지원이 완료되었습니다.
            </span>
          </div>
          <div className="w-full textColor-title text-subTitle-18 font-normal">
            <p>지원 결과는 빠른 시일 내에</p>
            <p>이메일로 전송해드리겠습니다.</p>
          </div>
        </div>
        {/* <div>
          <div className="flex flex-col items-center textColor-mid-emphasis text-base font-normal mb-4 ">
            <p>빠르고 쉬운 협력업체 지원,</p>
            <p>빌드나우 플랫폼에 대해 더 알아보세요</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="w-[311px] h-[189px] relative bgColor-white rounded-s">
              <div className="left-[36px] top-[67px] absolute textColor-title text-subTitle-18 font-normal ">
                우리 회사 조건에 딱 맞는,
                <br />
                지원할 만한 모집 공고 추천
              </div>
            </div>
            <div className="w-[311px] h-[189px] relative bgColor-white rounded-s">
              <div className="left-[34px] top-[65px] absolute textColor-title  text-subTitle-18  font-normal ">
                등록해둔 지원 정보로
                <br />
                다음 협력업체 지원도 간편하게
              </div>
            </div>
            <div className="w-[311px] h-[189px] relative bgColor-white rounded-s">
              <div className="left-[34px] top-[65px] absolute textColor-title   text-subTitle-18 font-normal ">
                지원 결과와 과정
                <br />
                한번에 확인하기
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ResultPage;
