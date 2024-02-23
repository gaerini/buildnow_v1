"use client";

import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import JoinForm from "./JoinForm";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <div className="z-10">
        <ApplierTopNav text="협력업체 회원가입" />
      </div>
      <div className="flex justify-center w-full h-screen overflow-y-scroll">
        <JoinForm />
      </div>
    </div>
  );
}
