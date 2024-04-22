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

  const DetailCatValue: GradingValueType = {
    "회사 설립 경과년수": applierInfo?.estDate
      ? `${calculateYearsPassed(applierInfo?.estDate)}년`
      : "정보 없음", // 또는 적절한 기본값

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
    신용등급: getFinanceValue(applierInfo?.financeList, "신용등급"),
    현금흐름등급: getFinanceValue(applierInfo?.financeList, "현금흐름등급"),
    WATCH등급: getFinanceValue(applierInfo?.financeList, "WATCH등급"),
    매출액: getFinanceValue(applierInfo?.financeList, "매출액"),
    영업이익률: getFinanceValue(applierInfo?.financeList, "영업이익률"),
    순이익률: getFinanceValue(applierInfo?.financeList, "순이익률"),
    유동비율: getFinanceValue(applierInfo?.financeList, "유동비율"),
    당좌비율: getFinanceValue(applierInfo?.financeList, "당좌비율"),
    부채비율: getFinanceValue(applierInfo?.financeList, "부채비율"),
    차입금의존도: getFinanceValue(applierInfo?.financeList, "차입금의존도"),
    "ISO 인증서 보유 여부":
      applierInfo?.applicationList[0]?.tempSaved?.tempHandedOutList?.some(
        (item: tempDocument) =>
          item.documentName && item.documentName.includes("ISO")
      )
        ? "보유"
        : "미보유",
    "ESG 인증 및 평가": applierInfo?.esg ? "보유" : "미보유",
    "최근 3년간 공사 실적": "우수",
    "시공능력 평가액 순위 (%)":
      `${applierInfo?.licenseList[0]?.percentage}%` || "정보 없음",
  };

  const info = DetailCatValue;

  return { info };
};

export default ExtractCategoryData;
