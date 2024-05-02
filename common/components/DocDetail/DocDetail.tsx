import React, { useState, useEffect } from "react";
import DocTypeDetail from "./DocTypeDetail";
import PDFViewer from "../PDFviewer/PDFViewer";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 경로를 확인하고 맞게 수정하세요
import SkeletonRow from "./SkeletonRow";
import ValidDoc from "../Badge/ValidDoc";
import { useLoading } from "../../../common/components/LoadingContext";

interface Document {
  id: string;
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

const DocDetail: React.FC<{
  documentList: Document[];
  isTab: boolean;
}> = ({ documentList, isTab }) => {
  const [activeTab, setActiveTab] = useState("BUSINESS");
  const [filteredDocument, setFilteredDocument] = useState<Document[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("");
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (isTab) {
      switch (activeTab) {
        case "BUSINESS":
          setFilteredDocument(
            documentList.filter((doc) => doc.upperCategoryENUM === "BUSINESS")
          );
          break;
        case "LICENSE":
          setFilteredDocument(
            documentList.filter((doc) => doc.upperCategoryENUM === "LICENSE")
          );
          break;
        case "FINANCE":
          setFilteredDocument(
            documentList.filter((doc) => doc.upperCategoryENUM === "FINANCE")
          );
          break;
        // case "APPLICATION":
        //   setFilteredDocument(
        //     documentList.filter((doc) => doc.upperCategoryENUM === "APPLICATION")
        //   );
        //   break;
        case "AUTHENTICATION":
        case "PATENT":
          setFilteredDocument(
            documentList.filter(
              (doc) =>
                doc.upperCategoryENUM === "AUTHENTICATION" ||
                doc.upperCategoryENUM === "PATENT"
            )
          );
          break;
        case "PERFORMANCE":
          setFilteredDocument(
            documentList.filter(
              (doc) => doc.upperCategoryENUM === "PERFORMANCE"
            )
          );
          break;
        default:
          setFilteredDocument([]);
      }
    } else {
      setFilteredDocument(documentList); // No filtering, use all documents
    }
  }, [activeTab, documentList, isTab]);

  const showPdf = (url: string, pdfName: string) => {
    setPdfUrl(url);
    setPdfName(pdfName);
  };

  const getTabName = (tab: string) => {
    switch (tab) {
      // case "APPLICATION":
      //   return "등록신청서";
      case "LICENSE":
        return "보유면허";
      case "BUSINESS":
        return "경영일반";
      case "FINANCE":
        return "재무정보";
      case "AUTHENTICATION" || "PATENT":
        return "인증현황";
      case "PERFORMANCE":
        return "시공실적";
      default:
        return "";
    }
  };

  return (
    <div
      className="w-full flex-1 flex-col flex-grow bgColor-neutral border-t borderColor"
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
        <div
          className="flex flex-col w-full"
          style={{ height: "calc(100vh - 4rem - 3.5rem)" }}
        >
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
        </div>
      ) : (
        <>
          <div className="bgColor-white">
            {isTab ? (
              isLoading ? (
                <div className="flex justify-start gap-x-4 px-8 border-t borderColor ">
                  {[
                    "BUSINESS",
                    "LICENSE",
                    "FINANCE",
                    "AUTHENTICATION",
                    "PERFORMANCE",
                  ].map((tab, index) => (
                    <div
                      key={index}
                      className={`w-[88px] h-14 flex items-center justify-center last:cursor-pointer text-paragraph-16 whitespace-nowrap ${
                        activeTab === tab
                          ? "textColor-high-emphasis font-bold border-b-2 border-primary-blue-original"
                          : "textColor-mid-emphasis font-normal hover:font-bold "
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "BUSINESS" && "경영일반"}
                      {tab === "LICENSE" && "보유면허"}
                      {tab === "FINANCE" && "재무부문"}
                      {(tab === "AUTHENTICATION" || tab === "PATENT") &&
                        "인증현황"}
                      {tab === "PERFORMANCE" && "시공실적"}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-start h-14 gap-x-4 px-8 border-b border-t borderColor items-center">
                  <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                  <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                  <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                  <div className="animate-pulse h-6 w-[88px] rounded-s border-none bgColor-neutral" />
                </div>
              )
            ) : null}
          </div>
          <div
            className="flex flex-col overflow-y-scroll h-full border-t borderColor"
            style={{ height: "calc(100vh - 4rem - 3.5rem)" }}
          >
            {isLoading ? (
              <>
                <DocTypeDetail
                  filteredDocument={filteredDocument}
                  Req="REQUIRED"
                  onPreview={showPdf}
                />
                <DocTypeDetail
                  filteredDocument={filteredDocument}
                  Req="PREFERRED"
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
