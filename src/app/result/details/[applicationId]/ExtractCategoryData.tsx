"use client";
import { ExtractCategoryDataProps, tempDocument } from "./Interface";

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

  const DetailCatValue: GradingValueType = {
    "회사설립 경과 년수": applierInfo?.estDate
      ? `${calculateYearsPassed(applierInfo.estDate)}년`
      : "정보 없음", // 또는 적절한 기본값

    "지방 업체 (서울 경기 외) 여부":
      place === "서울" || place === "경기도" ? "수도권" : "지방" || "지역",
    "산재 발생 여부":
      applierInfo?.hadAccident === undefined
        ? "정보 없음"
        : applierInfo?.hadAccident
        ? "발생"
        : "미발생",
    "신용 등급": applierInfo?.finance?.creditGrade || "정보 없음",
    "현금흐름 등급": applierInfo?.finance?.cashFlowGrade || "정보 없음",
    "WATCH 등급": applierInfo?.finance?.watchGrade || "정보 없음",
    매출액: `${applierInfo?.finance?.salesRevenue}%` || "정보 없음",
    영업이익률: `${applierInfo?.finance?.operatingMarginRatio}%` || "정보 없음",
    순이익률: `${applierInfo?.finance?.netProfitMarginRatio}%` || "정보 없음",
    유동비율: `${applierInfo?.finance?.currentRatio}%` || "정보 없음",
    당좌비율: `${applierInfo?.finance?.quickRatio}%` || "정보 없음",
    부채비율: `${applierInfo?.finance?.debtToEquityRatio}%` || "정보 없음",
    "차입금 의존도": `${applierInfo?.finance?.debtDependency}%` || "정보 없음",
    "ISO 인증서 보유 여부":
      applierInfo?.applicationList[0].tempSaved?.tempHandedOutList?.some(
        (item: tempDocument) =>
          item.documentName && item.documentName.includes("ISO")
      )
        ? "보유"
        : "미보유",
    "ESG 인증 및 평가": applierInfo?.esg ? "보유" : "미보유",
    "최근 3년간 공사 실적": "우수",
    "시공능력 평가액 순위(%)": `${rating}%` || "정보 없음",
  };

  const info = DetailCatValue;

  return { info };
};

export default ExtractCategoryData;
