"use client";
import { ExtractCategoryDataProps } from "./Interface";

const ExtractCategoryData = ({
  categoryName,
  recruitmentInfo,
  applierInfo,
  submitDocList,
  getTotalScore,
  currentApplier,
  place,
  rating,
}: ExtractCategoryDataProps) => {
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
    "ISO 인증서 보유 여부": applierInfo?.handedOutList?.some(
      (item) => item.documentName && item.documentName.includes("ISO")
    )
      ? "보유"
      : "미보유",
    "ESG 인증 및 평가": applierInfo?.esg ? "보유" : "미보유",
    "최근 3년간 공사 실적": "우수",
    "시공능력 평가액 순위(%)": `${rating}%` || "정보 없음",
  };

  const gradingList = categoryGrading?.gradingList;
  const docList = categoryGrading?.requirementList;
  const detailCat = gradingList?.map((grading) => grading.category) || [];

  // 임시 값임
  const demoAppliedList = [
    {
      id: 3,
      isNew: false,
      isRecommended: false,
      isRead: true,
      isChecked: false,
      applyingWorkType: "철근 콘크리트 공사",
      appliedDate: "2024-03-22T07:57:06.585Z",
      upperCategoryScoreBoardList: [
        {
          id: 9,
          upperCategory: "경영 일반",
          scoreBoardList: [
            {
              id: 23,
              category: "회사설립 경과 년수",
              score: 1,
            },
            {
              id: 24,
              category: "지방 업체 (서울 경기 외) 여부",
              score: 1,
            },
            {
              id: 25,
              category: "산재 발생 여부",
              score: 1,
            },
          ],
        },
        {
          id: 10,
          upperCategory: "재무 부문",
          scoreBoardList: [
            {
              id: 26,
              category: "신용 등급",
              score: 2,
            },
            {
              id: 27,
              category: "현금흐름 등급",
              score: 4,
            },
            {
              id: 28,
              category: "부채비율",
              score: 5,
            },
            {
              id: 29,
              category: "차입금 의존도",
              score: 5,
            },
          ],
        },
        {
          id: 11,
          upperCategory: "인증 현황",
          scoreBoardList: [
            {
              id: 30,
              category: "ESG 인증 및 평가",
              score: 1,
            },
            {
              id: 31,
              category: "ISO 인증서 보유 여부",
              score: 4,
            },
          ],
        },
        {
          id: 12,
          upperCategory: "시공 실적",
          scoreBoardList: [
            {
              id: 32,
              category: "시공능력 평가액 순위(%)",
              score: 10,
            },
            {
              id: 33,
              category: "최근 3년간 공사 실적",
              score: 7,
            },
          ],
        },
      ],
    },
  ];
  const scoreBoardList = demoAppliedList[0].upperCategoryScoreBoardList.find(
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

export default ExtractCategoryData;
