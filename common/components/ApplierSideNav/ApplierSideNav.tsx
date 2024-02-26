import React from "react";
import { useRouter, usePathname } from "next/navigation";
import NavItem from "./NavItem";
import NavItemDetail from "./NavItemDetail";

interface ApplierSideNavProps {
  comp: string;
  prev: string;
  next: string;
}

const ApplierSideNav: React.FC<ApplierSideNavProps> = ({
  comp,
  prev,
  next,
}) => {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(`${path}`);
  };

  const pathName = usePathname();
  const isFinalStep = () => {
    return pathName.includes("optional"); // 'optional'은 '선택 서류 등록'에 해당하는 경로 부분입니다.
  };

  return (
    <div className="select-none fixed top-16 bottom-0 flex justify-start gap-0">
      {/* 왼쪽 width 266px 영역 */}
      <div className="w-[266px] bgColor-navy" />
      {/* 오른쪽 Navigator 영역 */}
      <div className="w-[375px] bgColor-navy flex flex-col justify-between items-center">
        {/* 상단 내용 */}
        <div>
          {/* 업체명 및 업체지원 heading */}
          <div className="mt-4">
            <span className="text-blue-500 text-3xl font-bold font-['Pretendard Variable'] leading-10">
              {comp}
            </span>{" "}
            <span className="text-black text-3xl font-normal font-['Pretendard Variable'] leading-10">
              협력업체 지원,
              <br />
              빌드나우 에서!
            </span>
          </div>
          {/* 순서 버튼 */}
          <div className="flex flex-col mt-[53px] justify-between items-start gap-[18px]">
            {/* 1 */}
            <NavItem number="1" path="register" text="면허 등록 및 공종 선택" />
            {/* 2 */}
            <NavItem number="2" path="info" text="업체 정보 입력" />
            {/* 3 */}
            <div className="flex flex-col justify-start items-center gap-2">
              <div>
                <NavItem number="3" path="document" text="서류 등록" />
                <div className="flex flex-col pl-[45px] justify-between items-start gap-1 textColor-mid-emphasis">
                  <NavItemDetail text="- 필수 서류 등록" path="essential" />
                  <NavItemDetail text="- 우대 서류 등록" path="preferential" />
                  <NavItemDetail text="- 선택 서류 등록" path="optional" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex flex-col gap-4 p-xl justify-center items-center">
          {prev && (
            <div
              className="w-[311px] btnSize-xl btnStyle-main-2 text-title-24 text-center hover:bgColor-neutral hover:textColor-high-emphasis active:bg-primary-blue-100 active:border-primary-blue-original active:textColor-focus"
              onClick={() => NavItemClick(prev)}
            >
              이전 단계로
            </div>
          )}
          <div
            className="w-[311px] btnSize-xl btnStyle-main-1 text-title-24 text-center hover:bg-primary-blue-400 active:bg-primary-blue-700"
            onClick={() => NavItemClick(next)}
          >
            {isFinalStep() ? "지원 완료하기" : "다음 단계로"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplierSideNav;
