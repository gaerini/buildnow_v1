import * as XLSX from "xlsx";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";

const downloadExcel = (data: CompanyScoreSummary[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "my_sheet");
  XLSX.writeFile(workbook, "json_to_excel.xlsx");
};

export default downloadExcel;
