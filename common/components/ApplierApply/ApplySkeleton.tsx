import ApplierSideNav from "../ApplierSideNav/ApplierSideNav";
import ApplierTopNav from "../ApplierTopNav/ApplierTopNav";

const ApplierSkeleton = () => (
  <div className="select-none flex flex-col w-screen">
    {/* 위쪽 */}
    <ApplierTopNav text="지원서 작성" />
    {/* 오른쪽 */}
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col">
        <div className="fixed top-16 ml-[641px] bgColor-white border-b borderColor w-full flex justify-start items-center px-8 h-[56px] gap-4">
          {/* Header 제목 */}
          <div className="w-[300px] p-xs">
            <div className="animate-pulse h-[28px] w-[300px] rounded-s border-none bgColor-neutral" />
          </div>
        </div>
        <div className="mt-[121px] ml-[641px] flex flex-col">
          {/* 오른쪽 영역 중 input 버튼 영역 */}
          <div className="flex flex-col gap-y-2 w-full justify-start bgColor-white">
            {/* 내용 - width 고정*/}
            <div className="w-fit bgColor-white p-xl flex flex-col gap-y-1">
              <div className="w-[188px] h-[20px] p-xs justify-start">
                <div className="animate-pulse w-[188px] h-[20px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[436px] h-[44px] p-xs justify-start">
                <div className="animate-pulsew-[436px] h-[44px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[143px] h-[14px] p-xs justify-start">
                <div className="animate-pulse w-[143px] h-[14px] rounded-s border-none bgColor-neutral" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 w-full justify-start bgColor-white">
            {/* 내용 - width 고정*/}
            <div className="w-fit bgColor-white p-xl flex flex-col gap-y-1">
              <div className="w-[188px] h-[20px] p-xs justify-start">
                <div className="animate-pulse w-[188px] h-[20px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[436px] h-[44px] p-xs justify-start">
                <div className="animate-pulsew-[436px] h-[44px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[143px] h-[14px] p-xs justify-start">
                <div className="animate-pulse w-[143px] h-[14px] rounded-s border-none bgColor-neutral" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 w-full justify-start bgColor-white">
            {/* 내용 - width 고정*/}
            <div className="w-fit bgColor-white p-xl flex flex-col gap-y-1">
              <div className="w-[188px] h-[20px] p-xs justify-start">
                <div className="animate-pulse w-[188px] h-[20px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[436px] h-[44px] p-xs justify-start">
                <div className="animate-pulsew-[436px] h-[44px] rounded-s border-none bgColor-neutral" />
              </div>
              <div className="w-[143px] h-[14px] p-xs justify-start">
                <div className="animate-pulse w-[143px] h-[14px] rounded-s border-none bgColor-neutral" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 왼쪽 */}
      <ApplierSideNav comp="신한종합건설" prev={"../info"} next={"result"} />
    </div>
  </div>
);

export default ApplierSkeleton;
