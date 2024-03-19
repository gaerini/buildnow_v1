// Interface.tsx

export interface Recruiter {
  id: number;
  businessId: string;
  password: string;
  managerName: string;
  companyName: string;
}

export interface Requirement {
  id: number;
  documentName: string;
  isEssential: boolean;
}

export interface SubmitDoc {
  id: number;
  documentName: string;
  documentUrl: string;
}

export interface Grading {
  id: number;
  category: string;
  perfectScore: number;
}

export interface UpperCategoryGrading {
  id: number;
  upperCategory: string;
  gradingList: Grading[];
  requirementList: Requirement[];
}

export interface RecruitmentInfo {
  id: number;
  deadline: string;
  threshold: number;
  recruiter: Recruiter;
  upperCategoryGradingList: UpperCategoryGrading[];
}

export interface ScoreBoard {
  id: number;
  category: string;
  score: number;
}

export interface UpperCategoryScoreBoard {
  id: number;
  upperCategory: string;
  scoreBoardList: ScoreBoard[];
}

export interface Applied {
  id: number;
  isNew: boolean;
  isRecommended: boolean;
  isRead: boolean;
  isChecked: boolean;
  applyingWorkType: string;
  appliedDate: string;
  upperCategoryScoreBoardList: UpperCategoryScoreBoard[];
}

export interface Finance {
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

interface CapacityValue {
  id: number;
  year1Value: number;
  year2Value: number;
  year3Value: number;
  nationalRanking: number;
  regionalRanking: number;
  nationalRankingRatio: number;
  regionalRankingRatio: number;
}

interface WorkType {
  id: number;
  workType: string;
  capacityValueList: CapacityValue[];
}

export interface ApplierInfo {
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
  possibleWorkTypeList: WorkType[]; // 구체적인 타입이 필요하다면 여기서 정의
  finance: Finance;
  iso: boolean;
}

export interface TotalScore {
  [category: string]: number;
}

export interface ApplierScore {
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

export interface ApplierData {
  score: ApplierScore[];
}

export interface ExtractCategoryDataProps {
  categoryName: string;
  recruitmentInfo?: RecruitmentInfo;
  applierInfo?: ApplierInfo;
  submitDocList?: SubmitDoc[];
  getTotalScore?: TotalScore;
  currentApplier?: ApplierScore;
  place: string;
  rating: number;
}
