import { String } from "aws-sdk/clients/cloudhsm";
import axios from "axios";

export const fetchPresignedUrl = async (
  file: File,
  fileType: string,
  docType: String
) => {
  const type = encodeURIComponent(fileType);
  const name = file.name;
  const doc = docType;
  console.log(file, docType);

  console.log("Requesting URL with", {
    fileType: type,
    fileName: name,
    docType: doc,
  });

  try {
    const { data } = await axios.get(
      `/api/pdf?fileType=${type}&fileName=${name}&docType=${doc}`
    );
    console.log("Received data for URL", data);
    const { url, Key } = data;
    if (!url) {
      console.error("No URL received from API");
    }
    return { url, Key };
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
  }
};

export const uploadFileToS3 = async (
  file: File | Blob,
  presignedUrl: string
) => {
  console.log("Uploading to", presignedUrl);
  if (!presignedUrl) {
    console.error("Presigned URL is undefined or not received");
    return false;
  }
  try {
    await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });
    return true; // 성공적으로 업로드되면 true 반환
  } catch (error) {
    console.error("Error uploading file:", error);
    return false;
  }
};

export const getFileBlob = (file: File): Blob => {
  return file; // File 객체 자체가 Blob이므로 그대로 반환
};

type FileType = {
  file: File | null;
  type: string;
  doc: string;
};

type PdfUrlsType = {
  [key: string]: string[];
};

type SetPdfUrlsType = (
  value: PdfUrlsType | ((prevUrls: PdfUrlsType) => PdfUrlsType)
) => void;

// utils.tsx에 추가
export const uploadFileAndGetUrl = async (
  file: File,
  fileType: string,
  docType: string,
  setPdfUrls: SetPdfUrlsType
) => {
  try {
    const presignedData = await fetchPresignedUrl(file, fileType, docType);
    if (presignedData) {
      const uploadSuccess = await uploadFileToS3(file, presignedData.url);
      if (uploadSuccess) {
        const fileUrl = `https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/${encodeURIComponent(
          docType
        )}-${encodeURIComponent(file.name)}`;

        setPdfUrls((prevUrls) => ({
          ...prevUrls,
          [docType]: prevUrls[docType]
            ? [...prevUrls[docType], fileUrl]
            : [fileUrl],
        }));
      } else {
        console.error("파일 업로드 실패");
      }
    }
  } catch (error) {
    console.error("파일 업로드 중 오류 발생: ", error);
  }
};
