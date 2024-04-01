"use client";
import React, { useEffect, useState } from "react";
import { SouthKoreaMap } from "./SouthKoreaMap";
import Icon from "../../Icon/Icon"; // 경로 확인 필요

// locationToIdMap의 키들을 나타내는 타입 생성
type LocationKey = keyof typeof locationToIdMap;

// PerformanceDetail 타입 수정
type PerformanceDetail = {
  지역: LocationKey;
};

type LocationCardProps = {
  filteredData: PerformanceDetail[];
};

const locationToIdMap: Record<string, string> = {
  부산: "busan",
  대구: "daegu",
  대전: "daejeon",
  강원: "gangwon",
  광주: "gwangju",
  경기: "gyeonggi",
  인천: "incheon",
  제주: "jeju",
  충북: "north-chungcheong",
  경북: "north-gyeongsang",
  전북: "north-jeolla",
  세종: "sejong",
  서울: "seoul",
  충남: "south-chungcheong",
  경남: "south-gyeongsang",
  전남: "south-jeolla",
  울산: "ulsan",
};

const getColorForRank = (rank: number) => {
  const colors = [
    "#872E00",
    "#A53D00",
    "#D96400",
    "#ED7D2C",
    "#FD9754",
    "#FFB37F",
    "#FFD1AF",
    "#FFF0E4",
  ];
  return rank < colors.length ? colors[rank - 1] : colors[colors.length - 1];
};

const LocationCard: React.FC<LocationCardProps> = ({ filteredData }) => {
  const [currentTopLocation, setCurrentTopLocation] = useState(0);
  const hasData = filteredData.length > 0;
  // 지역별 개수 계산 및 내림차순 정렬
  const totalLength = filteredData.length;

  const locationCounts = filteredData.reduce((acc, item) => {
    acc[item.지역] = (acc[item.지역] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedLocations =
    filteredData.length > 0
      ? (Object.entries(
          filteredData.reduce((acc, item) => {
            acc[item.지역] = (acc[item.지역] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1]) as [LocationKey, number][])
      : []; // filteredData가 비었을 때는 빈 배열을 할당합니다.

  // 순위 결정 로직
  let lastCount: number | null = null;
  let rank = 0;
  let skip = 0;

  const ranks = sortedLocations.map(
    ([location, count]): [LocationKey, number, number] => {
      if (count !== lastCount) {
        rank += 1 + skip;
        skip = 0;
      } else {
        skip += 1;
      }
      lastCount = count;
      return [location as string, count, rank]; // 여기서 rank는 이미 number 타입입니다.
    }
  );

  // Initialize fillColors with default color for each location in locationToIdMap
  const defaultColor = "#FFF0E4";
  const fillColors = Object.keys(locationToIdMap).map(() => defaultColor);

  // Update colors for ranked locations
  ranks.forEach(([location, , rank]) => {
    const locationId = locationToIdMap[location];
    const locationIndex = Object.keys(locationToIdMap).indexOf(
      location as string
    );
    if (locationIndex !== -1) {
      fillColors[locationIndex] = getColorForRank(rank);
    }
  });

  // highestCount 및 topRankedLocations 계산
  const highestCount = sortedLocations.length > 0 ? sortedLocations[0][1] : 0;
  const topRankedLocations = sortedLocations
    .filter(([, count]) => count === highestCount)
    .map(([location]) => location);

  // 1위 지역들을 찾고, 순환 표시 로직 추가
  useEffect(() => {
    const firstPlaceLocations = ranks.filter(([_, __, rank]) => rank === 1);
    if (firstPlaceLocations.length > 1) {
      const interval = setInterval(() => {
        setCurrentTopLocation(
          (prevIndex) => (prevIndex + 1) % firstPlaceLocations.length
        );
      }, 2000); // 1초 간격

      return () => clearInterval(interval);
    }
  }, [ranks]);

  // Ensure that the index is within the bounds of the array
  const validIndex =
    currentTopLocation >= 0 && currentTopLocation < ranks.length;

  // Safely get the current top location data
  const currentTopLocationData = validIndex
    ? ranks[currentTopLocation]
    : ranks.length > 0
    ? ranks[0]
    : null;

  return (
    <div className="w-full min-w-[302px] border border-secondary-orange-300 h-[524px] rounded-s">
      <div className="bg-secondary-orange-100 p-8 gap-y-2 flex flex-col h-[136px]">
        <p className="flex items-center gap-x-1 textColor-negative text-paragraph-16">
          <Icon name="Location" width={18} height={18} />
          {/* 아이콘 확인 필요 */}
          주요 지역
        </p>
        <div className="flex w-full justify-between items-center h-[40px]">
          {hasData && currentTopLocationData ? (
            <>
              <div className="flex text-title-28 font-bold items-center gap-x-2">
                <div className="flex items-center badgeSize-m border textColor-negative border-secondary-orange-original h-[28px] whitespace-nowrap">
                  1위
                </div>
                <span className="font-bold whitespace-nowrap text-secondary-orange-800">
                  {currentTopLocationData[0]}
                </span>
              </div>
              <p className="textColor-negative text-subTitle-20">
                <span className="font-bold whitespace-nowrap ">
                  {sortedLocations[0][1]}
                </span>
                <span className="font-normal whitespace-nowrap">
                  /{filteredData.length}회
                </span>
              </p>
            </>
          ) : (
            <p className="text-secondary-orange-800">데이터가 없습니다.</p>
          )}
        </div>
      </div>

      {hasData ? (
        <div className="flex flex-col items-center justify-center gap-y-1 w-full h-[388px] overflow-hidden">
          <SouthKoreaMap
            fillLocation={fillColors}
            locationCounts={locationCounts}
            ranks={ranks}
            totalLength={totalLength}
          />
        </div>
      ) : (
        <div className="flex  w-full h-[388px] items-center justify-center">
          <p className="text-secondary-orange-800">
            해당 공사 실적이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
