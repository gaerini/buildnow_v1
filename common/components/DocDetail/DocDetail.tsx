import React, { useState, useEffect } from "react";
import DocTypeDetail from "./DocTypeDetail";
import PDFViewer from "../PDFviewer/PDFViewer";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 경로를 확인하고 맞게 수정하세요
import SkeletonRow from "./\bSkeletonRow";
import ValidDoc from "../Badge/ValidDoc";

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
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ MngDoc, FinDoc, CertiDoc, ConstDoc, isLoading, setIsLoading }) => {
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const [activeTab, setActiveTab] = useState("MngDoc");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("");

  let activeDoc = MngDoc;
  if (activeTab === "MngDoc") activeDoc = MngDoc;
  else if (activeTab === "FinDoc") activeDoc = FinDoc;
  else if (activeTab === "CertiDoc") activeDoc = CertiDoc;
  else if (activeTab === "ConstDoc") activeDoc = ConstDoc;

  const showPdf = (url: string, pdfName: string) => {
    setPdfUrl(url);
    setPdfName(pdfName);
  };

  const getTabName = (tab: string) => {
    switch (tab) {
      case "MngDoc":
        return "경영일반";
      case "FinDoc":
        return "재무정보";
      case "CertiDoc":
        return "인증현황";
      case "ConstDoc":
        return "시공실적";
      default:
        return "";
    }
  };

  return (
    <div
      className="flex flex-col flex-grow bgColor-neutral "
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {isLoading ? (
        <div className="w-full h-14 bgColor-white p-xl textColor-mid-emphasis text-Subtitle-20 font-medium">
          제출 서류 보기
        </div>
      ) : (
        <div className="w-full h-14 bgColor-white px-8 py-[11px]">
          <div className="animate-pulse h-[33px] w-[178px] rounded-s border-none bgColor-neutral" />
        </div>
      )}

      {pdfUrl ? (
        <>
          <div className="h-14 flex justify-start items-center px-8 border-b border-t bgColor-white borderColor text-paragraph-16 textColor-mid-emphasis">
            <Icon
              name="ArrowLeftSingle"
              width={24}
              height={24}
              onClick={() => setPdfUrl("")}
            />
            <div className="ml-2 text-subTitle-20 textColor-mid-emphasis flex items-start">
              <span className="font-normal">
                {getTabName(activeTab)}&nbsp;/&nbsp;
              </span>
              <span className="font-bold mr-2">{pdfName}</span>
              <ValidDoc />
            </div>
          </div>
          <PDFViewer url={pdfUrl} />
        </>
      ) : (
        <>
          <div className="bgColor-white">
            {isLoading ? (
              <div className="flex justify-start gap-x-4 px-8 border-b border-t borderColor ">
                {["MngDoc", "FinDoc", "CertiDoc", "ConstDoc"].map(
                  (tab, index) => (
                    <div
                      key={index}
                      className={`w-[88px] h-14 flex items-center  justify-center last:cursor-pointer text-paragraph-16 whitespace-nowrap ${
                        activeTab === tab
                          ? "textColor-high-emphasis font-bold border-b-2 border-primary-blue-original"
                          : "textColor-mid-emphasis font-normal hover:font-bold "
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
            ) : (
              <div className="flex justify-start h-14 gap-x-4 px-8 border-b border-t borderColor items-center">
                <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
              </div>
            )}
          </div>
          <div className="flex flex-col overflow-y-scroll h-full">
            {isLoading ? (
              <>
                <DocTypeDetail
                  DocType={activeDoc}
                  Req="필수"
                  onPreview={showPdf}
                />
                <DocTypeDetail
                  DocType={activeDoc}
                  Req="선택"
                  onPreview={showPdf}
                />
              </>
            ) : (
              <>
                <div className="min-w-[700px] p-xl bgColor-white flex flex-col justify-start">
                  <div className="animate-pulse h-6 w-[134px] rounded-s border-none bgColor-neutral" />
                </div>
                <div className="flex justify-start items-center h-16 p-xl bgColor-white">
                  <div className="w-5/12 p-xs">
                    <div className="animate-pulse h-6 w-[42px] rounded-s border-none bgColor-neutral" />
                  </div>
                  <div className="w-1/6 p-xs">
                    <div className="animate-pulse h-6 w-[62px] rounded-s border-none bgColor-neutral" />
                  </div>
                  <div className="w-5/12 p-xs">
                    <div className="animate-pulse h-6 w-[62px] rounded-s border-none bgColor-neutral" />
                  </div>
                </div>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DocDetail;
