"use client";

import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import JoinForm from "./JoinForm";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <JoinForm />
      <div className="mt-14">
        <HelpButtons />
      </div>
    </div>
  );
}
