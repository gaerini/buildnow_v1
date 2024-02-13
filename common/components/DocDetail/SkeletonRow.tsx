const SkeletonRow = () => (
    <div className="flex justify-start items-center h-18 p-2xl bgColor-white">
      <div className="w-5/12 p-xs">
        <div className="animate-pulse h-6 w-[300px] rounded-s border-none bgColor-neutral" />
      </div>
      <div className="w-1/6 p-xs">
        <div className="animate-pulse h-6 w-[62px] rounded-s border-none bgColor-neutral" />
      </div>
      <div className="flex w-5/12 p-xs gap-x-2 items-center">
        <div className="animate-pulse h-[44px] w-[123px] rounded-s border-none bgColor-neutral" />
        <div className="animate-pulse h-[44px] w-[123px] rounded-s border-none bgColor-neutral" />
      </div>
    </div>
  );
  
  export default SkeletonRow