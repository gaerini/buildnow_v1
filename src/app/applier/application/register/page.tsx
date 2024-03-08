"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterLicense from "./RegisterLicense";
import RegisterWorkType from "./RegisterWorkType";
import Header from "../../../../../common/components/ApplierApply/Header";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import { uploadFilesAndUpdateUrls } from "../../../api/pdf/utils";

interface LicenseData {
  licenseName: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

const Page = () => {
  const router = useRouter();
  const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  const [isLicenseError, setIsLicenseError] = useState(false);
  const [isLicenseVisible, setIsLicenseVisible] = useState(true);
  const [isWorkTypeError, setIsWorkTypeError] = useState(false);

  // 선택할 수 있는 공종의 개수 조절 (일반 & 필수)
  const workTypeCount = 3; // 예를 들어, 3개의 workType 상태를 관리
  const essentialWorkTypeCount = 1;

  const [workTypes, setWorkTypes] = useState(Array(workTypeCount).fill(""));
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  const handleWorkTypeChange = (index: number, value: string) => {
    const updatedWorkTypes = [...workTypes];
    updatedWorkTypes[index] = value;
    setWorkTypes(updatedWorkTypes);
  };

  // 에러 관리
  const validateAndNavigate = async () => {
    const hasValidLicense = licenseData.length > 0;
    const hasValidWorkTypes =
      workTypes.filter(Boolean).length >= essentialWorkTypeCount;

    // 두 조건 모두 충족되지 않는 경우
    if (!hasValidLicense && !hasValidWorkTypes) {
      setIsLicenseError(true);
      setIsWorkTypeError(true);
      alert("필수 제출란을 확인해주세요");
      return;
    }

    // 면허 데이터가 유효하지 않은 경우
    if (!hasValidLicense) {
      setIsLicenseError(true);
      alert("보유하신 면허를 등록해주세요.");
      return;
    }

    // 공종 데이터가 유효하지 않은 경우
    if (!hasValidWorkTypes) {
      setIsWorkTypeError(true);
      alert("지원하실 공종을 한 개 이상 선택해주세요.");
      return;
    }

    if (hasValidLicense && hasValidWorkTypes) {
      const filesToUpload = licenseData.map((item) => ({
        file: item.file,
        type: "application/pdf",
        doc: item.licenseName,
      }));
      try {
        await uploadFilesAndUpdateUrls(filesToUpload, pdfUrls, setPdfUrls);
        console.log("모든 파일이 성공적으로 업로드되었습니다.");
        router.push("info");
      } catch (error) {
        console.error("업로드 중 오류 발생: ", error);
        alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }

    // 모든 검증을 통과한 경우 다음 페이지로 이동
    console.log("면허 :", licenseData, "지원 공종 :", workTypes);
    // router.push("info");
  };

  // 공종 이름 list
  const workTypeList = [
    "건축/골조공사",
    "건축/미장방수.조적.타일",
    "건축/도장공사",
    "건축/석공사",
    "건축/목재창호공사",
    "건축/AL창호공사",
    "건축/PL창호공사",
    "건축/내장목공사",
    "건축/잡철물공사",
    "건축/지붕공사",
    "건축/일반건설업",
    "건축/철골공사",
    "건축/데크플레이트",
    "건축/테라쪼",
    "건축/인테리어",
    "건축/세대현관문",
    "건축/커튼월,외장판넬",
    "건축/계단난간대",
    "건축/유리공사",
    "건축/PVC바닥재",
    "건축/도배공사",
    "건축-골조",
    "건축-미장/조적",
    "건축-방수",
    "건축-타일",
    "건축-도장",
    "건축-석공사",
    "건축-목재창호",
    "건축-AL창호",
    "건축-PL창호",
    "건축-유리",
    "건축-내장목",
    "건축-잡철물",
    "건축-지붕",
    "건축-도배/바닥재",
    "건축-건축시설물유지",
    "건축-경량콘크리트판넬",
    "건축-온돌/강화마루",
    "건축-파일항타[건축]",
    "건축-조경식재",
    "건축-조경식재/조경시설물",
    "건축-안전시설물",
    "건축-가구/주방가구",
    "건축-데크플레이트",
    "건축-시스템루버",
    "건축/기타",
    "토목/일반토목",
    "토목/부대토목",
    "토목/포장공사",
    "토목/파일항타공사",
    "토목/조경시설물",
    "토목/상하수도",
    "토목/토목철물",
    "토목/철거공사",
    "토목/철강재",
    "토목/특수구조물",
    "토목/보링,연약지반",
    "토목/수중",
    "토목/준설",
    "토목/조경식재",
    "토목/법면보호",
    "토목/교좌장치",
    "토목/도로유관관로공사",
    "토목/철근콘크리트공사",
    "토목/방수",
    "토목/신축이음",
    "토목-일반토목",
    "토목-포장",
    "토목-상하수도",
    "토목-토목철물",
    "토목-파일항타[토목]",
    "토목-토목시설물유지",
    "토목/기타",
    "전기/소방전기",
    "전기/정보통신",
    "전기/임시동력",
    "전기-전기일반",
    "전기-소방전기",
    "전기-정보통신",
    "전기/기타",
    "기계/소방설비",
    "기계/가스공사",
    "기계/자동제어",
    "기계/터널기계설비",
    "기계/조립식P.D",
    "기계/기계일반",
    "기계-기계일반[소방포함]",
    "기계-가스설비",
    "기계-자동제어",
    "기계-우수처리/정화조",
    "기계-냉난방기",
    "기계-실내환기설비",
    "기계/기타",
    "기타/건축시설물유지",
    "기타/토목시설물유지",
    "기타/지하수개발",
    "기타/기타",
  ];

  return (
    <div>
      <ApplierTopNav text="지원서 작성" showButton={true} />

      <div className="flex flex-col w-full mt-[120px]">
        <div className="z-10">
          <Header
            titleText="1. 면허 등록 및 공종 선택"
            additionalText={
              <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                표시가 붙은 항목들은 필수 입력 항목입니다.
              </span>
            }
          />
        </div>
        <div className="flex flex-col bg-bgColor-white p-xl h-fit ml-[641px] w-[500px] gap-y-2 ">
          {/* 첫 번째 영역: 면허 등록 */}

          <RegisterLicense
            licenseData={licenseData}
            setLicenseData={setLicenseData}
            isLicenseVisible={isLicenseVisible}
            setIsLicenseVisible={setIsLicenseVisible}
            isError={isLicenseError}
            setIsError={setIsLicenseError}
          />

          {/* 두 번째 영역: 지원 공종 선택 (이 부분은 구현 예정) */}
          <RegisterWorkType
            workTypeCount={workTypeCount}
            essentialWorkType={essentialWorkTypeCount}
            workTypes={workTypes}
            onWorkTypeChange={handleWorkTypeChange}
            workTypeList={workTypeList}
            isError={isWorkTypeError}
            setIsError={setIsWorkTypeError}
          />
        </div>
        <ApplierSideNav
          comp="한양이엔지"
          prev=""
          next="info"
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
};

export default Page;
