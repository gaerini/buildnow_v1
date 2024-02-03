import Dropdown from "../Dropdown/Dropdown";

export default function TopNavigator() {
  return (
    <div className="w-full h-16 bg-white border-b border-gray-300 justify-between inline-flex items-center">
      <div className="h-[41px] inline-flex items-center ml-8">
        <p className="text-xl leading-[24px] mr-4">공종명 : </p>
        <Dropdown />
      </div>
      <div className="justify-center items-center gap-4 inline-flex m-8">
        <div className="w-14 h-5 justify-center items-center flex">
          <div className="text-neutral-500 text-base font-normal whitespace-nowrap">
            로그아웃
          </div>
        </div>
        <div className="text-center text-neutral-500 text-base font-normal">
          |
        </div>
        <div className="w-14 h-5 justify-center items-center flex">
          <div className="text-neutral-500 text-base font-normal whitespace-nowrap">
            고객센터
          </div>
        </div>
      </div>
    </div>
  );
}
