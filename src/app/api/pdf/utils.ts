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

  try {
    const { data } = await axios.get(
      `/api/pdf?fileType=${type}&fileName=${name}&docType=${doc}`
    );
    // , {
    //   method: "get",
    // });
    // if (!response.ok) {
    //   throw new Error("Failed to fetch presigned URL");
    // }

    const { url, Key } = data;
    return await { url, Key };
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
  }
};

export const uploadFileToS3 = async (
  file: File | Blob,
  presignedUrl: string
) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });
    // const response = await fetch(presignedUrl, {
    //   method: "PUT",
    //   body: file,
    // });
    // if (!response.ok) {
    //   throw new Error("Failed to upload file");
    // }
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

// utils.tsx
export const uploadFilesAndUpdateUrls = async (
  filesToUpload: FileType[],
  pdfUrls: PdfUrlsType,
  setPdfUrls: SetPdfUrlsType
) => {
  for (const fileData of filesToUpload) {
    if (fileData.file) {
      const presignedData = await fetchPresignedUrl(
        fileData.file,
        fileData.type,
        fileData.doc
      );
      if (presignedData) {
        const uploadSuccess = await uploadFileToS3(
          fileData.file,
          presignedData.url
        );
        if (!uploadSuccess) {
          throw new Error("File upload failed");
        } else {
          const fileUrl = `https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/${encodeURIComponent(
            fileData.doc
          )}-${encodeURIComponent(fileData.file.name)}`;
          setPdfUrls((prevUrls) => ({
            ...prevUrls,
            [fileData.doc]: prevUrls[fileData.doc]
              ? [...prevUrls[fileData.doc], fileUrl]
              : [fileUrl],
          }));
        }
      } else {
        throw new Error("Failed to get presigned URL");
      }
    } else {
      console.error("파일이 없음");
    }
  }
};
