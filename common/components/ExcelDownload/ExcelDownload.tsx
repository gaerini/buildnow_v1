import * as XLSX from "xlsx";
import { ApplierListData } from "../Interface/CompanyData";

const downloadExcel = (data: ApplierListData[]) => {
  // 결과를 담을 배열 생성
  const formattedData = data.map((application, index) => {
    const rowData: { [key: string]: any } = {
      Id: index + 1, // 순차적 ID 할당
      회사명: application.companyName,
      지원공종: application.workType,
      총점: 0, // 총점을 계산하기 위해 초기화
    };

    // 각 카테고리 점수 추가
    application.scoreList.forEach((score) => {
      score.scoreList.forEach((detailScore) => {
        rowData[detailScore.category] = detailScore.score;
        rowData["총점"] += detailScore.score; // 총점 계산
      });
    });

    // 통과 여부 계산
    rowData["통과여부"] = rowData["총점"] >= 70 ? "통과" : "탈락";

    return rowData;
  });

  // 데이터 시트로 변환
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // 워크북 생성 및 시트 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Result");

  // Excel 파일 쓰기
  XLSX.writeFile(workbook, "한울건설_협력사서류심사결과.xlsx");
};

export default downloadExcel;
