import React, { useState, useEffect } from "react";
import InputStyleMultiDropdown from "../InputForm/InputStyleMultiDropdown";
import InputStyleDropdown from "../InputForm/InputStyleDropdown";
import performanceDetails from "./performanceDetail.json";
import PerformanceDetailFilter from "./PerformanceDetailFilter/PerformanceDetailFilter";
import PerformanceSummaryCard from "./PerformanceSummaryCard/PerformanceSummaryCard";
import { String } from "aws-sdk/clients/cloudhsm";
import PerformanceTable from "./PerformanceTable/PerformanceTable";

type PerformanceDetail = {
  발주처: string;
  구분: string;
  원도급사: string;
  공종: string;
  공사명: string;
  "계약금액(백만원)": number;
  "공사 시작": string; // 이전에 number로 잘못 표시되었던 부분을 수정
  "공사 종료 (예정)": string; // 이전에 number로 잘못 표시되었던 부분을 수정
  "공사의 종류": string;
  위치: string;
  지역: string;
};

const PerformanceDetail = () => {
  const [license, setLicense] = useState(["전체"]); // 선택된
  const [type, setType] = useState(["전체"]);
  const [period, setPeriod] = useState("3개년");
  const [filteredData, setFilteredData] = useState<PerformanceDetail[]>([]);

  const getUniqueOptions = (key: keyof PerformanceDetail) => {
    const items = performanceDetails.map((item) => item[key]);
    const unique = arrayDistinct(items); // 중복 제거 함수 사용
    return ["전체", ...unique];
  };

  function arrayDistinct(list: any[]): any[] {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      if (result.indexOf(value) === -1) {
        result.push(value);
      }
    }
    return result;
  }

  const inputListLicense = getUniqueOptions("공종");
  const inputListType = getUniqueOptions("공사의 종류");
  const inputListPeriod = ["3개년", "5개년", "10개년"];

  // Log filter changes
  useEffect(() => {
    console.log("Selected License Filter:", license);
    console.log("Selected Type Filter:", type);
    console.log("Selected Period Filter:", period);
  }, [license, type, period]); // Dependency array

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed

    const calculateMonthsDifference = (startDate: string) => {
      const [startYear, startMonth] = startDate.split(".").map(Number);
      return (currentYear - startYear) * 12 + currentMonth - startMonth;
    };

    const checkPeriod = (startDate: string, period: string) => {
      const monthsDifference = calculateMonthsDifference(startDate);
      const periodYear = parseInt(period); // 문자열에서 정수 부분만 추출
      return monthsDifference <= periodYear * 12;
    };

    const filteredData = performanceDetails.filter((item) => {
      const licenseCheck =
        license.includes("전체") || license.includes(item.공종);
      const typeCheck =
        type.includes("전체") || type.includes(item["공사의 종류"]);
      const periodCheck =
        period === "전체" || checkPeriod(item["공사 시작"], period);

      return licenseCheck && typeCheck && periodCheck;
    });

    setFilteredData(filteredData);
  }, [license, type, period, performanceDetails]);

  return (
    <div className="flex flex-col bgColor-navy h-screen w-full gap-y-2">
      {/* PerformanceDetailFilter는 전체 데이터를 넣었을 때 filterData를 반환해야함 */}
      <PerformanceDetailFilter
        selectedLicense={license}
        onSelectLicense={setLicense}
        selectedType={type}
        onSelectType={setType}
        selectedPeriod={period}
        onSelectPeriod={setPeriod}
        inputListLicense={inputListLicense}
        inputListType={inputListType}
        inputListPeriod={inputListPeriod}
      />

      <PerformanceSummaryCard filteredData={filteredData} />
      <PerformanceTable filteredData={filteredData} />
    </div>
  );
};

export default PerformanceDetail;
