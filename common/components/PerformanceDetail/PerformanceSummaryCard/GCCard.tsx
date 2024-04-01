import React, { useState, useEffect } from "react";
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
  const [currentTopGC, setCurrentTopGC] = useState(0);
  const hasData = filteredData.length > 0;

  const gcCounts = filteredData.reduce((acc, item) => {
    acc[item.원도급사] = (acc[item.원도급사] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = filteredData.length;

  const sortedGCs = Object.entries(gcCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([gc, count]) => {
      const percentage = ((count / totalCount) * 100).toFixed(1);
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

  // 원도급사 순위 결정 로직
  let lastCount: number | null = null;
  let rank = 0;
  let skip = 0;
  const gcsRanks = sortedGCs.map(({ gc, count }) => {
    if (count !== lastCount) {
      rank += 1 + skip;
      skip = 0;
    } else {
      skip += 1;
    }
    lastCount = count;
    return { gc, count, rank };
  });

  // 1위 원도급사들을 찾고, 순환 표시 로직 추가
  useEffect(() => {
    const firstPlaceGCs = gcsRanks.filter(({ rank }) => rank === 1);
    if (firstPlaceGCs.length > 1) {
      const interval = setInterval(() => {
        setCurrentTopGC((prevIndex) => (prevIndex + 1) % firstPlaceGCs.length);
      }, 2000); // 순환 간격

      return () => clearInterval(interval);
    }
  }, [gcsRanks]);

  // Before rendering, check if currentTopGC is a valid index
  const validTopGC =
    gcsRanks[currentTopGC] || (gcsRanks.length > 0 ? gcsRanks[0] : null);

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
        display: "true",
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
          // 데이터가 5개 이상일 때만 Truncate 로직 적용
          if (sortedGCs.length > 5 && label.length > 4) {
            return label.slice(0, 4) + "...";
          }
          return label.slice(0, 6) + "...";
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="w-full min-w-[302px] border border-secondary-pink-300 h-[524px] rounded-s">
      <div className="bg-secondary-pink-100 p-8 gap-y-2 flex flex-col h-[136px]">
        <p className="flex items-center gap-x-1 text-secondary-pink-600 text-paragraph-16">
          <Icon name="Vip" width={18} height={18} />
          주거래업체
        </p>

        <div className="flex w-full justify-between items-center h-[40px]">
          {hasData && validTopGC ? (
            <>
              {/* 상단 1위 원도급사 표시 */}
              <div className="flex h-[40px] items-center gap-x-2 truncate">
                <div className="flex items-center badgeSize-m border text-secondary-pink-600 border-secondary-pink-original whitespace-nowrap">
                  1위
                </div>
                <span className="flex items-center text-title-28 font-bold truncate text-ellipsis text-secondary-pink-700">
                  {validTopGC.gc}
                </span>
              </div>
              <p className="flex text-secondary-pink-600 items-center h-[40px]  whitespace-nowrap  ml-2">
                <span className="font-normal text-subTitle-20 ">
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
            <div className="flex  w-full h-[388px] items-center justify-center">
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
