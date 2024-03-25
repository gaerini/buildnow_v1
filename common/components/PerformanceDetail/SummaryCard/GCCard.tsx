import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Chart.js v3에서 필요
import ChartDataLabels from "chartjs-plugin-datalabels";
import Icon from "../../Icon/Icon";

type PerformanceDetail = {
  원도급사: string;
};

type GCCardProps = {
  filteredData: PerformanceDetail[];
};

const GCCard: React.FC<GCCardProps> = ({ filteredData }) => {
  const hasData = filteredData.length > 0;

  const gcCounts = filteredData.reduce((acc, item) => {
    acc[item.원도급사] = (acc[item.원도급사] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = filteredData.length;

  const sortedGCs = Object.entries(gcCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([gc, count]) => {
      const percentage = ((count / totalCount) * 100).toFixed(2);
      return { gc, count, percentage };
    });

  let labels = [];
  let data = [];
  if (sortedGCs.length > 5) {
    const topGCs = sortedGCs.slice(0, 5);
    labels = topGCs.map((item) => item.gc).concat("기타");
    const topPercentages = topGCs.map((item) => parseFloat(item.percentage));
    const otherPercentage = sortedGCs
      .slice(5)
      .reduce((acc, item) => acc + parseFloat(item.percentage), 0)
      .toFixed(2);

    data = topPercentages.concat(parseFloat(otherPercentage));
  } else {
    labels = sortedGCs.map((item) => item.gc);
    data = sortedGCs.map((item) => parseFloat(item.percentage));
  }

  const chartData = {
    labels: labels,

    datasets: [
      {
        data: data,
        backgroundColor: [
          "#FFEDF8",
          "#FFC9EA",
          "#FFA4DB",
          "#FF7ECB",
          "#F32FA6",
          "#79004C",
        ],
        borderWidth: 0,
      },
    ],
  };
  const chartDataLabelsPlugin: any = ChartDataLabels;
  const plugins = [chartDataLabelsPlugin];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        clip: true,
        display: "auto",
        color: (context: any) => {
          return context.dataIndex < 3 ? "#9E0064" : "#FFFFFF";
        },
        anchor: "center" as const,
        align: "center" as const,
        font: {
          weight: 400,
          size: 16,
        },
        formatter: function (value: any, context: any) {
          const idx = context.dataIndex;
          const label = context.chart.data.labels[idx];
          if (!label) {
            return "";
          }
          return label.length > 4 ? label.slice(0, 4) + "..." : label;
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="w-full min-w-[302px] border border-secondary-pink-300 h-[524px] rounded-s">
      <div className="bg-secondary-pink-100 p-8 gap-y-4 flex flex-col">
        <p className="flex items-center gap-x-1 text-secondary-pink-600 text-paragraph-16">
          <Icon name="Vip" width={18} height={18} />
          주거래업체
        </p>

        <div className="flex justify-between items-center">
          {hasData ? (
            <>
              {/* 상단 1위 원도급사 표시 */}
              <div className="flex text-title-28 items-center gap-x-2">
                <div className="badgeSize-m border text-secondary-pink-600 border-secondary-pink-original h-[28px] whitespace-nowrap">
                  1위
                </div>
                <span className="whitespace-nowrap text-secondary-pink-700 font-bold">
                  {sortedGCs[0].gc}
                </span>
              </div>
              <p className="flex text-secondary-pink-600 text-subTitle-20 items-center h-[40px]">
                <span className="flex items-center font-normal whitespace-nowrap">
                  {sortedGCs[0].percentage}%
                </span>
              </p>
            </>
          ) : (
            <p className="text-secondary-pink-800">데이터가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="flex w-full h-[388px] items-center justify-center py-[44px]">
        <div className="flex flex-col gap-y-1 w-[258px] h-[258px]">
          {hasData ? (
            <div className="flex flex-col gap-y-1 w-[258px] h-[258px]">
              <Pie data={chartData} options={options} plugins={plugins} />
            </div>
          ) : (
            <div className="flex flex-col gap-y-1 w-[258px] h-[258px] items-center justify-center">
              <p className="text-secondary-pink-800">
                해당 공사 실적이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GCCard;
