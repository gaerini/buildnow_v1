"use client";

import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen bgColor-navy">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <button
          className="btnStyle-main-1 btnSize-xl  w-[311px] hover:bg-primary-blue-400"
          onClick={() => NavItemClick("/applier/application/register")}
        >
          저장된 지원서 불러오기
        </button>
        <button
          className="btnStyle-main-3 btnSize-xl w-[311px] hover:bg-primary-navy-500"
          onClick={() => NavItemClick("/applier/application/register")}
        >
          새로운 지원서 작성하기
        </button>
      </div>
      <div className="absolute bottom-0 mt-14">
        <HelpButtons />
      </div>
    </div>
  );
}
