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
  rating: string;
}

export interface ApplierInfo {
  id: number;
  username: string;
  password: string;
  businessId: string;
  role: string;
  companyName: string | null;
  ceoName: string | null;
  companyAddress: string | null;
  managerName: string;
  managerPhoneNum: string;
  managerEmail: string;
  corporateApplicationNum: string | null;
  companyPhoneNum: string | null;
  esg: boolean | null;
  type: string | null;
  companyIntro: string | null;
  hadAccident: boolean;
  estDate: string | null;
  applicationList: Application[];
  finance: Finance | null;
  historyList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  handedOutList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
}

export interface Application {
  id: number;
  appliedDate: string;
  workTypeApplying: string | null;
  applicationEvaluationList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  tempOCRList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  tempSaved: TempSaved;
  tempPrerequisiteList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
  new: boolean;
  recommended: boolean;
  read: boolean;
  checked: boolean;
  adminChecked: boolean;
  submit: boolean;
}

export interface TempSaved {
  id: number;
  corporateApplicationNum: string | null;
  companyPhoneNum: string | null;
  workTypeApplying: string | null;
  type: string | null;
  companyAddress: string | null;
  companyIntro: string | null;
  tempHandedOutList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
}

// 기존에 정의된 다른 인터페이스들 (Finance 등)은 필요에 따라 수정 또는 유지합니다.
