// components/InputExcelUpload.tsx
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const InputExcelUpload = () => {
  const [performanceJson, setPerformanceJson] = useState<any>(null);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
        setPerformanceJson(json);
      };
      reader.readAsBinaryString(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps({
          className:
            "w-full border-2 border-color h-[44px] text-mid-emphasis cursor-pointer rounded-s",
        })}
      >
        <input {...getInputProps()} />
        <p className="m-0 text-center leading-[44px]">파일 선택</p>
      </div>
      {performanceJson && (
        <div className="w-full h-60 bg-white mt-1 overflow-auto">
          <pre>{JSON.stringify(performanceJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InputExcelUpload;
