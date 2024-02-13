"use client";
import React from "react";

interface Recruiter {
  id: number;
  businessId: string;
  password: string;
  managerName: string;
  companyName: string;
}

interface Grading {
  id: number;
  category: string;
  perfectScore: number;
}

interface Requirement {
  id: number;
  documentName: string;
  isEssential: boolean;
}

interface UpperCategoryGrading {
  id: number;
  upperCategory: string;
  gradingList: Grading[];
  requirementList: Requirement[];
}

interface RecruitmentInfo {
  id: number;
  deadline: string;
  threshold: number;
  recruiter: Recruiter;
  upperCategoryGradingList: UpperCategoryGrading[];
}

interface ScoreBoard {
  id: number;
  category: string;
  score: number;
}

interface UpperCategoryScoreBoard {
  id: number;
  upperCategory: string;
  scoreBoardList: ScoreBoard[];
}

interface Applied {
  id: number;
  isNew: boolean;
  isRecommended: boolean;
  isRead: boolean;
  isChecked: boolean;
  applyingWorkType: string;
  appliedDate: string;
  upperCategoryScoreBoardList: UpperCategoryScoreBoard[];
}

interface SubmitDoc {
  id: number;
  documentName: string;
  documentUrl: string;
}

interface Finance {
  id: number;
  creditGrade: string;
  cashFlowGrade: string;
  watchGrade: string;
  salesRevenue: number;
  operatingMarginRatio: number;
  netProfitMarginRatio: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  debtDependency: number;
}

interface ApplierInfo {
  id: number;
  businessId: string;
  companyName: string;
  ceoName: string;
  companyAddress: string;
  managerName: string;
  managerPhoneNum: string;
  managerEmail: string;
  corporateApplicationNum: string;
  esg: boolean;
  companyPhoneNum: string;
  companyIntro: string;
  hadAccident: boolean;
  estDate: string;
  appliedList: Applied[];
  paperReqList: SubmitDoc[];
  historyList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  possibleWorkTypeList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  finance: Finance;
  iso: boolean;
}

interface TotalScore {
  [category: string]: number;
}

interface ApplierScore {
  companyName: string;
  businessId: string;
  score: {
    [category: string]: number;
  };
  isPass: string;
  applyingWorkType: string;
  isRead: boolean;
  isChecked: boolean;
  scoreSum: number;
}

interface extractCategoryDataProps {
  categoryName: string;
  recruitmentInfo?: RecruitmentInfo;
  applierInfo?: ApplierInfo;
  submitDocList?: SubmitDoc[];
  getTotalScore?: TotalScore;
  currentApplier?: ApplierScore;
  place: string;
  rating: string;
}

const extractCategoryData = ({
  categoryName,
  recruitmentInfo,
  applierInfo,
  submitDocList,
  getTotalScore,
  currentApplier,
  place,
  rating,
}: extractCategoryDataProps) => {
  const categoryGrading = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === categoryName
  );

  interface DetailCatValueType {
    [key: string]: string;
  }

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

  const DetailCatValue: DetailCatValueType = {
    "회사설립 경과 년수": applierInfo?.estDate
      ? `${calculateYearsPassed(applierInfo.estDate)}년`
      : "정보 없음", // 또는 적절한 기본값

    "지방 업체 (서울 경기 외) 여부":
      place === "서울" || place === "경기도" ? "수도권" : "지방" || "정보 없음",
    "산재 발생 여부":
      applierInfo?.hadAccident === undefined
        ? "정보 없음"
        : applierInfo?.hadAccident
        ? "발생"
        : "미발생",
    "신용 등급": applierInfo?.finance.creditGrade || "정보 없음",
    "현금흐름 등급": applierInfo?.finance.cashFlowGrade || "정보 없음",
    "WATCH 등급": applierInfo?.finance.watchGrade || "정보 없음",
    매출액: `${applierInfo?.finance.salesRevenue}%` || "정보 없음",
    영업이익률: `${applierInfo?.finance.operatingMarginRatio}%` || "정보 없음",
    순이익률: `${applierInfo?.finance.netProfitMarginRatio}%` || "정보 없음",
    유동비율: `${applierInfo?.finance.currentRatio}%` || "정보 없음",
    당좌비율: `${applierInfo?.finance.quickRatio}%` || "정보 없음",
    부채비율: `${applierInfo?.finance.debtToEquityRatio}%` || "정보 없음",
    "차입금 의존도": `${applierInfo?.finance.debtDependency}%` || "정보 없음",
    "ISO 인증서 보유 여부": applierInfo?.iso ? "보유" : "미보유",
    "ESG 인증 및 평가": applierInfo?.esg ? "보유" : "미보유",
    "최근 3년간 공사 실적": "우수",
    "시공능력 평가액 순위(%)": `${rating}%` || "정보 없음",
  };

  const gradingList = categoryGrading?.gradingList;
  const docList = categoryGrading?.requirementList;
  const detailCat = gradingList?.map((grading) => grading.category) || [];
  const scoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === categoryName
    )?.scoreBoardList;

  const info = {
    totalScore: getTotalScore?.[categoryName] || 0,
    evalScore: currentApplier?.score[categoryName] || 0,
    DetailCat: detailCat,
    DetailCatValue: detailCat?.map((cat) => DetailCatValue[cat]),
    DetailCatTotalScore:
      gradingList?.map((grading) => grading.perfectScore) || [],
    DetailCatEvalScore:
      gradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = scoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
  };

  const doc = {
    docName: docList?.map((doc) => doc.documentName) || [],
    docReq: docList?.map((doc) => doc.isEssential) || [],
    docSubmit:
      docList?.map(
        (doc) =>
          submitDocList?.some(
            (submitDoc) => submitDoc.documentName === doc.documentName
          ) || false
      ) || [],
    docRef:
      docList?.map((doc) => {
        const foundDoc = submitDocList?.find(
          (submitDoc) => submitDoc.documentName === doc.documentName
        );
        return foundDoc?.documentUrl || "";
      }) || [],
  };

  return { info, doc };
};

export default extractCategoryData;
