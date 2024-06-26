"use client";
import {
  ExtractCategoryDataProps,
  tempDocument,
  Finance,
} from "../../../src/app/list/details/[applicationId]/Interface";

interface GradingValueType {
  [key: string]: string;
}

const ExtractCategoryData = ({
  applierInfo,
  place,
  rating,
}: ExtractCategoryDataProps) => {
  const calculateYearsPassed = (estDateString: string): number => {
    const estDate = new Date(estDateString);
    const today = new Date();
    let years = today.getFullYear() - estDate.getFullYear();
    if (
      today.getMonth() < estDate.getMonth() ||
      (today.getMonth() === estDate.getMonth() &&
        today.getDate() < estDate.getDate())
    ) {
      years--;
    }
    return years;
  };

  function getFinanceValue(financeList: Finance[], category: string) {
    console.log("extractcategorydata", financeList, category);
    const financeItem = financeList?.find(
      (item: Finance) => item.category === category
    );
    return financeItem ? financeItem.value : "정보 없음";
  }

  function getExtraValue(extraValueList: any[], category: string) {
    const valueItem = extraValueList?.find(
      (item: any) => item.category === category
    );
    // Check if valueItem is found and its value is not '확인불가'
    if (valueItem && valueItem.value !== "확인불가") {
      return valueItem.value;
    }
    // Return '정보 없음' if valueItem is not found or its value is '확인불가'
    return "정보 없음";
  }

  // 기술자수와 같은 경우 '명'을 붙임
  const technicians = getExtraValue(applierInfo?.extraValueList, "기술자수");
  const technicianCount =
    technicians !== "정보 없음" ? `${technicians}명` : technicians;

  // 회사설립경과년수 '년'을 붙임
  const yearsEstablished = getExtraValue(
    applierInfo?.extraValueList,
    "회사설립경과년수"
  );
  const yearsEstablishedText =
    yearsEstablished !== "정보 없음"
      ? `${yearsEstablished}년`
      : yearsEstablished;

  // 최근3년간공사실적 '배'을 붙임
  const recentConstructionPerformance = getExtraValue(
    applierInfo?.extraValueList,
    "최근3년간공사실적"
  );
  const recentConstructionPerformanceText =
    recentConstructionPerformance !== "정보 없음"
      ? `${recentConstructionPerformance}배`
      : recentConstructionPerformance;

  const DetailCatValue: GradingValueType = {
    "지방 업체 (서울 경기 외) 여부":
      place === "서울" ||
      place === "경기도" ||
      place === "경기" ||
      place === "서울특별시"
        ? "수도권"
        : "지방" || "지역",
    "산재 발생 여부":
      applierInfo?.hadAccident === undefined
        ? "정보 없음"
        : applierInfo?.hadAccident
        ? "발생"
        : "미발생",
    신용평가등급: getFinanceValue(applierInfo?.financeList, "신용등급"),
    현금흐름등급: getFinanceValue(applierInfo?.financeList, "현금흐름등급"),
    WATCH등급: getFinanceValue(applierInfo?.financeList, "WATCH등급"),
    매출액: getFinanceValue(applierInfo?.financeList, "매출액"),
    영업이익률: getFinanceValue(applierInfo?.financeList, "영업이익률"),
    순이익률: getFinanceValue(applierInfo?.financeList, "순이익률"),
    유동비율: getFinanceValue(applierInfo?.financeList, "유동비율"),
    당좌비율: getFinanceValue(applierInfo?.financeList, "당좌비율"),
    부채비율: `${getFinanceValue(applierInfo?.financeList, "부채비율")}%`,
    차입금의존도: `${getFinanceValue(
      applierInfo?.financeList,
      "차입금의존도"
    )}%`,
    "ISO 인증서 보유 여부":
      applierInfo?.applicationList[0]?.tempSaved?.tempHandedOutList?.some(
        (item: tempDocument) =>
          item.documentName && item.documentName.includes("ISO")
      )
        ? "보유"
        : "미보유",
    "ESG 인증 및 평가": applierInfo?.esg ? "보유" : "미보유",
    기술자수: technicianCount,
    회사설립경과년수: yearsEstablishedText,
    최근3년간공사실적: recentConstructionPerformanceText,
    직전년도시공능력평가액순위:
      `${applierInfo?.licenseList[0]?.percentage}%` || "정보 없음",
  };

  const info = DetailCatValue;

  return { info };
};

export default ExtractCategoryData;
