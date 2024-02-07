import React, { useState } from "react";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 경로를 확인하고 맞게 수정하세요.
import { DownLoad } from "../Icon/svgs";

interface Document {
  docName: string[];
  docReq: boolean[];
  docSubmit: boolean[];
  docRef: string[];
}

const DocTypeDetail: React.FC<{
  DocType: Document;
  Req: string;
  onPreview: (url: string) => void;
}> = ({ DocType, Req, onPreview }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const count = DocType.docReq.filter((req) =>
    Req === "필수" ? req : !req
  ).length;

  const requiredDocs = DocType.docReq.reduce<number[]>((acc, req, index) => {
    if ((Req === "필수" && req) || (Req === "선택" && !req)) {
      acc.push(index);
    }
    return acc;
  }, []);

  // 요소가 없으면 아무것도 렌더링하지 않음
  if (requiredDocs.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 ">
      <div
        className="h-15 bg-primary-neutral-white p-2xl flex justify-between items-center  hover:bg-primary-neutral-100 text-subTitle-20 whitespace-nowrap min-w-[700px]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>{`${Req} 제출 서류 (${count})`}</div>
        <div>
          <Icon
            name="ArrowDown"
            height={24}
            width={24}
            className={`transform transition ${
              isExpanded ? "" : "-rotate-180"
            }`}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="w-full min-w-[700px]">
          {/* Table Header */}
          <div className="flex justify-start items-center h-14 text-primary-neutral-700 text-subTitle-18 font-bold p-2xl bg-primary-neutral-white">
            <div className="w-5/12 p-xs whitespace-nowrap">서류명</div>
            <div className="w-1/6 p-xs whitespace-nowrap">제출여부</div>
            <div className="w-5/12 p-xs whitespace-nowrap">서류보기</div>
          </div>
          {/* Table Rows or No Data Message */}
          {requiredDocs.length > 0 ? (
            requiredDocs.map((index) => (
              <div
                key={index}
                className="flex justify-start items-center text-primary-neutral-black text-subTitle-18 p-2xl border-t last:border-b-2  border-primary-navy-200 bg-primary-neutral-white"
              >
                <div className="w-5/12 text-subTitle-18 p-xs truncate">
                  {DocType.docName[index]}
                </div>
                <div
                  className={`w-1/6 text-subTitle-18 p-xs whitespace-nowrap ${
                    DocType.docSubmit[index]
                      ? "text-secondary-green-original"
                      : "text-secondary-red-original"
                  }`}
                >
                  {DocType.docSubmit[index] ? "제출" : "미제출"}
                </div>
                <div className="w-5/12 text-subTitle-18 flex items-center justify-start gap-x-2 p-xs">
                  <button
                    className={`btnStyle-main-2 btnSize-s font-bold flex items-center gap-x-2 whitespace-nowrap ${
                      !DocType.docSubmit[index]
                        ? "bg-primary-neutral-100 border-primary-neutral-100 text-primary-neutral-300 cursor-not-allowed"
                        : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black"
                    }`}
                    disabled={!DocType.docSubmit[index]}
                    onClick={() => {
                      if (DocType.docSubmit[index]) {
                        window.open(DocType.docRef[index], "_blank");
                      }
                    }}
                  >
                    <Icon name="DownLoad" width={20} height={20} />
                    다운로드
                  </button>
                  <button
                    className={`btnStyle-main-2 btnSize-s font-bold flex items-center gap-x-2 whitespace-nowrap ${
                      !DocType.docSubmit[index]
                        ? "bg-primary-neutral-100 border-primary-neutral-100 text-primary-neutral-300 cursor-not-allowed"
                        : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black"
                    }`}
                    disabled={!DocType.docSubmit[index]}
                    onClick={() => {
                      if (DocType.docSubmit[index]) {
                        onPreview(DocType.docRef[index]);
                      }
                    }}
                  >
                    <Icon name="Preview" width={20} height={20} />
                    미리보기
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-14 text-primary-neutral-black text-subTitle-20 bg-primary-neutral-white">
              해당 서류가 존재하지 않습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocTypeDetail;
