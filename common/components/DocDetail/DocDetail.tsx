import React, { useState } from "react";
import DocTypeDetail from "./DocTypeDetail";
import PDFViewer from "../PDFviewer/PDFViewer";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 경로를 확인하고 맞게 수정하세요.

interface Document {
  docName: string[];
  docReq: boolean[];
  docSubmit: boolean[];
  docRef: string[];
}

const DocDetail: React.FC<{
  MngDoc: Document;
  FinDoc: Document;
  CertiDoc: Document;
  ConstDoc: Document;
}> = ({ MngDoc, FinDoc, CertiDoc, ConstDoc }) => {
  const [activeTab, setActiveTab] = useState("MngDoc");
  const [pdfUrl, setPdfUrl] = useState("");

  let activeDoc = MngDoc;
  if (activeTab === "MngDoc") activeDoc = MngDoc;
  else if (activeTab === "FinDoc") activeDoc = FinDoc;
  else if (activeTab === "CertiDoc") activeDoc = CertiDoc;
  else if (activeTab === "ConstDoc") activeDoc = ConstDoc;

  const showPdf = (url: string) => {
    setPdfUrl(url);
  };

  return (
    <div
      className="flex flex-col flex-grow bg-primary-neutral-100 "
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-full h-14 bg-primary-neutral-white p-2xl text-primary-neutral-black text-Subtitle-20 font-medium">
        제출 서류 보기
      </div>

      {pdfUrl ? (
        <>
          <div className="h-14 flex justify-start items-center px-8 border-b border-t bg-primary-neutral-white border-primary-neutral-300 text-paragraph-16">
            <Icon
              name="ArrowLeftSingle"
              width={24}
              height={24}
              onClick={() => setPdfUrl("")}
            />
            <span className="ml-2 text-subTitle-20 text-primary-neutral-black">
              서류명
            </span>
          </div>
          <PDFViewer url={pdfUrl} />
        </>
      ) : (
        <>
          <div className="bg-primary-neutral-white">
            <div className="flex justify-start space-x-4 px-8 border-b border-t border-primary-neutral-300">
              {["MngDoc", "FinDoc", "CertiDoc", "ConstDoc"].map(
                (tab, index) => (
                  <div
                    key={index}
                    className={`h-14 flex items-center px-4 cursor-pointer text-paragraph-16 font-normal hover:font-bold whitespace-nowrap ${
                      activeTab === tab
                        ? "text-primary-neutral-black font-bold border-b-2 border-primary-neutral-black"
                        : "text-primary-neutral-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "MngDoc" && "경영일반"}
                    {tab === "FinDoc" && "재무부문"}
                    {tab === "CertiDoc" && "인증현황"}
                    {tab === "ConstDoc" && "시공실적"}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col overflow-y-scroll h-full">
            <DocTypeDetail DocType={activeDoc} Req="필수" onPreview={showPdf} />
            <DocTypeDetail DocType={activeDoc} Req="선택" onPreview={showPdf} />
          </div>
        </>
      )}
    </div>
  );
};

export default DocDetail;
