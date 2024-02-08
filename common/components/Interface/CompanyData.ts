// 가공 데이터에 대한 Interface

export interface ScoreSummary {
  [key: string]: number;
}

export interface CompanyScoreSummary {
  companyName: string;
  businessId: string;
  score: ScoreSummary[];
  isPass: string;
  applyingWorkType: string;
  isRead: boolean;
  isChecked: boolean;
  scoreSum: number;
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
