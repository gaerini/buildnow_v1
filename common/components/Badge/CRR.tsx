import React from "react";
import Image from "next/image";
import Nice from "../Icon/imgs/Nice.png";
import Ecredible from "../Icon/imgs/Ecredible.png";

const CRRType: React.FC<{ CRA: string }> = ({ CRA }) => {
  const isEcredible = CRA === "ecredible";
  const isNice = CRA === "nicednb" || CRA === "niceinfo";
  const isEtc = CRA === "etc"; // Add this line

  return (
    <>
      {
        isEcredible || isNice ? (
          <div className="badgeSize-m border border-primary-neutral-200 font-bold bgColor-white textColor-mid-emphasis whitespace-nowrap flex items-center gap-x-[2px] min-w-fit">
            <>
              <Image
                className="w-4 h-4"
                src={isEcredible ? Ecredible : Nice}
                alt={isEcredible ? "이크레더블" : "나이스디앤비"}
                width={500}
                height={300}
              />
              <span>{isEcredible ? "이크레더블" : "나이스디앤비"}</span>
            </>
          </div>
        ) : isEtc ? ( // Change this line
          <span className="flex items-center text-paragraph-16 font-bold textColor-mid-emphasis">
            | 그 외 신용평가사
          </span>
        ) : null // Add this to handle cases other than 'ecredible', 'nicednb', and 'etc'
      }
    </>
  );
};

export default CRRType;
