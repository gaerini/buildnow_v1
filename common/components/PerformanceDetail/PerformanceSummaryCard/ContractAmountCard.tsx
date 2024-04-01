import React from "react";
import Icon from "../../Icon/Icon";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart, TooltipItem } from "chart.js";

type PerformanceDetail = {
  "계약금액(백만원)": number;
};

type ContractAmountCardProps = {
  filteredData: PerformanceDetail[];
};

const ContractAmountCard: React.FC<ContractAmountCardProps> = ({
  filteredData,
}) => {
  // 데이터가 있는지 확인
  const hasData = filteredData.length > 0;

  const ContractAmountList = filteredData.map(
    (item) => item["계약금액(백만원)"]
  );
  const totalAmount = ContractAmountList.reduce(
    (sum, amount) => sum + amount,
    0
  );
  const averageAmount = Number(
    (totalAmount / ContractAmountList.length).toFixed(0)
  );
  const maxAmount = Math.max(...ContractAmountList);
  const minAmount = Math.min(...ContractAmountList);

  // 계약금액 범위별 횟수 계산
  const amountRanges = [0, 100, 300, 500, 1000, Infinity];
  const rangeCounts = Array(amountRanges.length - 1).fill(0);
  ContractAmountList.forEach((amount) => {
    const index = amountRanges.findIndex((range) => amount < range) - 1;
    if (index >= 0) rangeCounts[index]++;
  });

  // 막대 그래프 데이터 설정
  const barChartData = {
    labels: ["100 이하", "100~300", "300~500", "500~1000", "1000 이상"],
    datasets: [
      {
        data: rangeCounts,
        backgroundColor: [
          "#521B7E",
          "#8431C6",
          "#C875FF",
          "#E9B0FF",
          "#FCEFFF",
        ],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          font: {
            size: 12, // 여기에서 x축 레이블의 폰트 크기를 설정
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => `${context.parsed.y}회`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full min-w-[302px] rounded-s h-[524px] border border-secondary-purple-200 textColor-high-emphasis">
      <div className="bgColor-purple p-8 gap-y-2 flex flex-col h-[136px]">
        <p className="flex items-center gap-x-1 text-secondary-purple-600 text-paragraph-16">
          <Icon name="KorMoney" width={18} height={18} />
          도급 금액
        </p>
        <div className="flex justify-between items-center h-[40px]">
          {hasData ? (
            <div className="flex text-secondary-purple-600 items-center gap-x-2">
              <div className="flex items-center badgeSize-m border border-secondary-purple-600  h-[28px] whitespace-nowrap">
                평균
              </div>
              <span className="text-secondary-purple-800 text-title-28 font-bold whitespace-nowrap">
                {averageAmount} 백만원
              </span>
            </div>
          ) : (
            <p className="text-secondary-purple-800">데이터가 없습니다.</p>
          )}
        </div>
      </div>

      {hasData ? (
        <div className="flex flex-col h-[388px] justify-start textColor-mid-emphasis text-paragraph-16 gap-y-4 px-8 py-[14px]">
          <div className="gap-y-1">
            <div className="flex items-center gap-x-2 h-[32px]">
              <div className="badgeSize-s border border-secondary-purple-600 bgColor-purple whitespace-nowrap text-secondary-purple-original">
                최대
              </div>
              <p className="text-secondary-purple-800 text-paragraph-16 font-bold">
                {maxAmount} 백만원
              </p>
            </div>
            <div className="flex items-center gap-x-2 h-[32px]">
              <div className="badgeSize-s border border-secondary-purple-600  bgColor-purple whitespace-nowrap text-secondary-purple-original">
                최소
              </div>
              <p className="text-secondary-purple-800 text-paragraph-16 font-bold">
                {minAmount} 백만원
              </p>
            </div>
          </div>
          <div className="flex-1 justify-start -ml-[10px]">
            <Bar data={barChartData} options={barChartOptions} height={276} />
          </div>
        </div>
      ) : (
        <div className="flex w-full h-[388px] items-center justify-center">
          <p className="text-secondary-purple-800">
            해당 공사 실적이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractAmountCard;
