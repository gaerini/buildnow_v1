import * as XLSX from "xlsx";
import { ScoreSummary, ApplierListData } from "../Interface/CompanyData";

const downloadExcel = (data: ApplierListData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "my_sheet");
  XLSX.writeFile(workbook, "한울건설_협력사서류심사결과.xlsx");
};

export default downloadExcel;
