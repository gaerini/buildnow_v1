export default function TopNavigator() {
  return (
    <div className="w-screen h-16 bg-white border-b border-gray-300 justify-end items-center inline-flex grow ">
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
