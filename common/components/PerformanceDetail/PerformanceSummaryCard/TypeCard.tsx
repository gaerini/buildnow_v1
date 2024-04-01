import React, { useEffect, useState } from "react";
import Icon from "../../Icon/Icon";

type PerformanceDetail = {
  "공사의 종류": string;
};

type TypeCardProps = {
  filteredData: PerformanceDetail[];
};

const TypeCard: React.FC<TypeCardProps> = ({ filteredData }) => {
  const [currentTopType, setCurrentTopType] = useState(0);
  const [nextType, setNextType] = useState(1);
  const [animating, setAnimating] = useState(false);

  const hasData = filteredData.length > 0;
  // "공사의 종류"를 개수별로 세고, 내림차순 정렬
  const typeCounts = filteredData.reduce((acc, item) => {
    acc[item["공사의 종류"]] = (acc[item["공사의 종류"]] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

  // 순위 결정 로직
  let lastCount: number | null = null;
  let rank = 0;
  let skip = 0;
  const ranks = sortedTypes.map(([type, count]) => {
    if (count !== lastCount) {
      rank += 1 + skip;
      skip = 0;
    } else {
      skip += 1;
    }
    lastCount = count;
    return [type, count, rank];
  });

  // 1위 타입들을 찾고, 순환 표시 로직 추가
  useEffect(() => {
    const firstPlaceTypes = ranks.filter(([_, __, rank]) => rank === 1);
    if (firstPlaceTypes.length > 1) {
      const interval = setInterval(() => {
        setCurrentTopType(
          (prevIndex: number) => (prevIndex + 1) % firstPlaceTypes.length
        );
      }, 2000); // 1초 간격

      return () => clearInterval(interval);
    }
  }, [ranks]);

  // Make sure ranks array is not empty and currentTopType is a valid index
  const isValidIndex = currentTopType >= 0 && currentTopType < ranks.length;

  // Extract current top type data safely
  const currentTopTypeData = isValidIndex ? ranks[currentTopType] : null;

  return (
    <div className="w-full min-w-[302px] border border-secondary-mint-300 h-[524px] rounded-s">
      <div className="bg-secondary-mint-100 p-8 gap-y-2 flex flex-col h-[136px]">
        <p className="flex items-center gap-x-1 text-secondary-mint-600 text-paragraph-16">
          <Icon name="BuildingDark" width={18} height={18} />
          주력 건물
        </p>
        <div className="flex w-full justify-between items-center h-[40px]">
          {hasData && currentTopTypeData ? (
            <>
              <div className="flex h-[40px] text-secondary-mint-600 items-center gap-x-2 truncate">
                <div className="flex items-center badgeSize-m border border-secondary-mint-600 h-[28px] whitespace-nowrap">
                  1위
                </div>
                <span className="flex items-center text-title-28 font-bold truncate text-ellipsis">
                  {currentTopTypeData[0]}
                </span>
              </div>
              <p className="flex items-center text-secondary-mint-600 h-[40px] whitespace-nowrap ml-2">
                <span className="font-bold text-subTitle-20 ">
                  {sortedTypes[0][1]}
                </span>
                <span className="font-normal text-subTitle-20 ">
                  /{filteredData.length}회
                </span>
              </p>
            </>
          ) : (
            <p className="text-secondary-mint-800">데이터가 없습니다.</p>
          )}
        </div>
      </div>

      {hasData && currentTopTypeData ? (
        <div className="flex flex-col p-xl gap-y-1 h-[388px]">
          {ranks.map(([type, count, rank], index) => (
            <div
              key={index}
              className="flex items-center justify-between textColor-mid-emphasis text-paragraph-16 h-[32px]"
            >
              <div className="flex items-center gap-x-2">
                <div className="badgeSize-s border borderColor whitespace-nowrap">
                  {rank}위
                </div>
                <p className="whitespace-nowrap">{type}</p>
              </div>
              <p className="whitespace-nowrap">
                {count}/{filteredData.length}회
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex  w-full h-[388px] items-center justify-center">
          <p className="text-secondary-mint-800">해당 공사 실적이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TypeCard;
