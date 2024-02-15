"use client";

const RowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="w-[16.68%] px-8 py-4 bgColor-white justify-start items-center inline-flex">
        <div className="w-32 h-7 animate-pulse bgColor-neutral rounded-s" />
      </div>

      {/* 숫자 데이터 */}
      {["경영 일반", "재무 부문", "인증 현황", "시공 실적"].map(
        (key, index) => (
          <div
            key={key}
            className="w-[12.5%] bgColor-white px-8 py-4 justify-start items-center inline-flex"
          >
            <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
          </div>
        )
      )}

      {/* 총점수 */}
      <div className="w-[9.93%] px-8 py-4 justify-center bgColor-white inline-flex duration-300">
        <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
      </div>

      {/* 결과 */}
      <div className="w-[8.86%] px-8 py-4 bgColor-white duration-300">
        <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[14.53%] px-8 py-4 bgColor-white items-center gap-2.5 inline-flex">
        <div className="w-full h-11 animate-pulse bgColor-neutral rounded-s" />
      </div>
    </div>
  );
};

export default RowSkeleton;
