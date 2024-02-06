import * as XLSX from "xlsx";

interface CompanyData {
  name: string;
  caption: string;
  isNew: boolean;
  management: number;
  finance: number;
  certification: number;
  performance: number;
  totalScore: number;
  result: string;
}

const downloadExcel = (data: CompanyData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "my_sheet");
  XLSX.writeFile(workbook, "json_to_excel.xlsx");
};

export default downloadExcel;
