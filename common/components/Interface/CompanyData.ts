// 가공 데이터에 대한 Interface

// export interface ScoreSummary {
//   [sortKey: string]: number;
// }

export interface ScoreSummary {
  BUSINESS: number;
  FINANCE: number;
  AUTHENTICATION: number;
  PERFORMANCE: number;
  SCORESUM: number;
  [key: string]: number; // 이 라인이 추가되면 어떤 문자열 키에 대해서도 number 타입의 값이 될 수 있음을 TypeScript에 알립니다.
}

export interface Standard {
  "경영 일반": number;
  "재무 부문": number;
  "인증 현황": number;
  "시공 실적": number;
  [key: string]: number;
}

export interface CompanyScoreSummary {
  companyName: string;
  businessId: string;
  score: ScoreSummary;
  isPass: string;
  applyingWorkType: string;
  isRead: boolean;
  isChecked: boolean;
  scoreSum: number;
}

export interface CompanyInfoSummary {
  id: number;
  companyName: string;
  applyingWorkType: string;
  applyDate: string;
  joinDate: string;
  isCheck: boolean;
  isRead: boolean;
  [key: string]: string | number | boolean;
}

export interface score {
  category: string;
  perfectScore: number;
  score: number;
}

export interface upperCategoryScore {
  upperCategory: string;
  upperCategoryPerfectScore: number;
  upperCategoryScore: number;
  scoreList: score[];
}

export interface prerequisite {
  id: number;
  prerequisiteName: string;
  isPrerequisite: boolean;
  whyMidal: string;
}

export interface ApplierListData {
  applicationId: string;
  companyName: string;
  workType: string;
  licenseName: string;
  tempPrerequisiteList: prerequisite[];
  scoreList: upperCategoryScore[];
  checked: boolean;
  read: boolean;
}

// // API 데이터에 대한 Interface

export interface Total {
  [key: string]: number;
}

// export interface GradingItem {
//   id: number;
//   category: string;
//   perfectScore: number;
// }

// export interface Total {
//   id: number;
//   upperCategory: string;
//   gradingList: GradingItem[];
// }

// export interface ApplierItem {
//   id: number;
//   businessId: string;
//   companyName: string;
//   ceoName: string;
//   companyAddress: string;
//   managerName: string;
//   managerPhoneNum: string;
//   managerEmail: string;
//   corporateApplicationNum: string;
//   esg: boolean;
// }

// export interface ScoreBoardItem {
//   id: number;
//   category: string;
//   score: number;
// }

// export interface UpperCategoryScoreBoardList {
//   id: number;
//   upperCategory: string;
//   scoreBoardList: ScoreBoardItem[];
// }
// export interface Score {
//   id: number;
//   isNew: boolean;
//   isRecommended: boolean;
//   appliedDate: string;
//   applier: ApplierItem;
//   upperCategoryScoreBoardList: UpperCategoryScoreBoardList[];
// }
