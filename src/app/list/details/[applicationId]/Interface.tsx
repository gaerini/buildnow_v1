// Interface.tsx

export interface Finance {
  id: string;
  category: string;
  value: string;
}

export interface TotalScore {
  [category: string]: number;
}

export interface tempDocument {
  id: string;
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

export interface Document {
  id: string;
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
  handedOutVerifyingStatusENUM: string;
}

export interface TempSaved {
  id: number;
  corporateApplicationNum: string | null;
  companyPhoneNum: string | null;
  workTypeApplying: string | null;
  type: string | null;
  companyAddress: string | null;
  companyIntro: string | null;
  tempHandedOutList: tempDocument[]; // 구체적인 타입이 필요하다면 여기서 정의
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

export interface License {
  id: number;
  licenseName: string;
  licenseNum: string;
  capacityValue: number;
  licenseSeq: string;
  licenseYear: string;
  cvRank: number;
  percentage: number;
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
  financeList: Finance[];
  handedOutList: Document[]; // 구체적인 타입이 필요하다면 여기서 정의
  licenseList: License[];
}

export interface ExtractCategoryDataProps {
  applierInfo: ApplierInfo;
  place: string;
  rating: number;
}

export interface ScoreList {
  category: string;
  perfectScore: string;
  score: number;
}

export interface ApplierScore {
  upperCategory: string;
  upperCategoryPerfectScore: number;
  upperCategoryScore: number;
  scoreList: ScoreList[];
}

// 기존에 정의된 다른 인터페이스들 (Finance 등)은 필요에 따라 수정 또는 유지합니다.
