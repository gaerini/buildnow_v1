import React from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";

interface FileData {
  file: File | File[] | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | File[] | null>>; // Corrected type to handle both single and multiple files
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface FileInputProps {
  label: string;
  fileData: FileData;
  isRequired: boolean;
  isMultiple: boolean;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>; // Optional, add if needed
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  fileData,
  isRequired,
  isMultiple,
  setPdfUrls,
}) => {
  return (
    <InputFileLayer
      titleText={label}
      isEssential={isRequired}
      fileName={
        fileData.file instanceof File
          ? fileData.file.name
          : fileData.file?.map((f) => f.name).join(", ")
      }
      fileNameError={fileData.error}
      inputComponent={
        isMultiple ? (
          <InputStyleMultiUploadBtn
            titleText={label}
            onChange={fileData.handleFileChange}
            errorMessage="필수 입력란입니다."
            isError={fileData.error}
            setIsError={fileData.setError}
            setFiles={
              fileData.setFile as React.Dispatch<React.SetStateAction<File[]>>
            } // Cast to ensure type safety for multiple files
            setFilesNameError={fileData.setError}
            setPdfUrls={setPdfUrls}
          />
        ) : (
          <InputStyleUploadBtn
            titleText={label}
            onChange={fileData.handleFileChange}
            errorMessage="필수 입력란입니다."
            isError={fileData.error}
            setIsError={fileData.setError}
            setFile={
              fileData.setFile as React.Dispatch<
                React.SetStateAction<File | null>
              >
            } // Cast to ensure type safety for single file
            setFileNameError={fileData.setError}
            setPdfUrls={setPdfUrls}
          />
        )
      }
    />
  );
};

export default FileInput;
