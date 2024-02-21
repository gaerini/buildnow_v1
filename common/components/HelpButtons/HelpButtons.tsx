import { useRouter } from "next/navigation";

export default function HelpButtons() {
  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col justify-center w-[266px]">
      <div className="mx-8 border-t-[1px] borderColor"></div>
      <div className="mx-8 py-[17px] justify-between gap-2 inline-flex">
        <div className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current">
          이용약관
        </div>
        <div className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current">
          개인정보처리방침
        </div>
        <div
          className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current"
          onClick={() => NavItemClick("/contact")}
        >
          고객센터
        </div>
      </div>
    </div>
  );
}
