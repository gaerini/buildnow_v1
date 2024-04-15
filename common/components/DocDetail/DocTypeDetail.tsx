import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 경로를 확인하고 맞게 수정하세요.
import ValidDoc from "../Badge/ValidDoc";
import CRR from "../Badge/CRR";

interface Document {
  id: string;
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

const DocTypeDetail: React.FC<{
  filteredDocument: Document[];
  Req: string;
  onPreview: (url: string, docName: string) => void;
}> = ({ filteredDocument, Req, onPreview }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const requiredDocs = filteredDocument.reduce<number[]>((acc, doc, index) => {
    if (
      (Req === "REQUIRED" && doc.requiredLevelENUM === "REQUIRED") ||
      (Req === "PREFERRED" && doc.requiredLevelENUM === "PREFERRED")
    ) {
      acc.push(index);
    }
    return acc;
  }, []);

  const count = requiredDocs.length;

  // 요소가 없으면 아무것도 렌더링하지 않음
  if (requiredDocs.length === 0) {
    return null;
  }

  return (
    <div className="mb-2 ">
      <div
        className="h-15 bgColor-white p-xl flex justify-between items-center hover:bg-primary-neutral-100 text-subTitle-20 whitespace-nowrap min-w-[700px]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          {Req === "REQUIRED"
            ? `필수 제출 서류 (${count})`
            : Req === "PREFERRED"
            ? `선택 제출 서류 (${count})`
            : ""}
        </div>

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
          <div className="flex justify-between items-center h-14 textColor-mid-emphasis text-subTitle-16 font-bold bgColor-white">
            <div className="flex-1 p-xl whitespace-nowrap ">서류명</div>
            <div className="w-[120px] p-xl whitespace-nowrap">제출여부</div>
            <div className="w-[216px] p-xl whitespace-nowrap">서류보기</div>
          </div>
          {/* Table Rows or No Data Message */}
          {requiredDocs.length > 0 ? (
            requiredDocs.map((index) => (
              <div
                key={index}
                className="flex justify-start items-center  text-subTitle-18 border-t last:border-b-2  borderColor bgColor-white"
              >
                <div className="flex-1 textColor-high-emphasis  whitespace-nowrap">
                  <div className="flex justify-between">
                    <div className="flex text-subTitle-18 p-xl truncate gap-x-2 justify-start items-center">
                      <Icon
                        name="Document"
                        width={20}
                        height={20}
                        style={{ flexShrink: 0 }}
                      />
                      {filteredDocument[index].documentName.includes("CRR") ? (
                        <div className="flex gap-x-2">
                          <span>신용평가보고서</span>
                          <CRR
                            CRA={
                              filteredDocument[index].documentName.includes(
                                "ecredible"
                              )
                                ? "ecredible"
                                : filteredDocument[index].documentName.includes(
                                    "nicednb"
                                  )
                                ? "nicednb"
                                : filteredDocument[index].documentName.includes(
                                    "etc"
                                  )
                                ? "etc"
                                : ""
                            }
                          />
                        </div>
                      ) : (
                        <span>{filteredDocument[index].documentName}</span>
                      )}
                    </div>
                    <div className="flex p-xl">
                      <ValidDoc />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "w-[120px] text-subTitle-18 p-xl textColor-mid-emphasis"
                  }
                >
                  제출
                </div>
                <div className="w-[216px] p-xl text-subTitle-18 flex items-center justify-start gap-x-2">
                  <button
                    className="btnStyle-main-2 btnSize-m font-bold flex items-center gap-x-2 whitespace-nowrap h-[44px] hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    //  ${
                    //   !DocType.docSubmit[index]
                    //     ? "bg-primary-neutral-100 border borderColor textColor-mid-emphasis cursor-not-allowed"
                    //     : "hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    // }`}
                    // disabled={!DocType.docSubmit[index]}
                    onClick={() => {
                      window.open(
                        filteredDocument[index].documentUrl,
                        "_blank"
                      );
                    }}
                  >
                    <Icon name="DownLoad" width={20} height={20} />
                  </button>
                  <button
                    className="btnStyle-main-2 btnSize-m font-bold flex items-center gap-x-2 whitespace-nowrap h-[44px] hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    //  ${
                    //   !DocType.docSubmit[index]
                    //     ? "bg-primary-neutral-100 border borderColor textColor-mid-emphasis cursor-not-allowed"
                    //     : "hover:bg-primary-neutral-100 hover:textColor-high-emphasis"
                    // }`}
                    // disabled={!DocType.docSubmit[index]}
                    onClick={() => {
                      // if (DocType.docSubmit[index]) {
                      onPreview(
                        filteredDocument[index].documentUrl,
                        filteredDocument[index].documentName
                      );
                      // }
                    }}
                  >
                    <Icon name="OpenDoc" width={20} height={20} />
                    열람
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
