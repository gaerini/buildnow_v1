// import React, { useState, useRef } from "react";
// import ErrorMessage from "./ErrorMessage";
// import FileBadge from "./FileBadge";
// import Icon from "../Icon/Icon";

// interface InputStyleMultiUploadBtnProps {
//   errorMessage?: string;
//   onChange?: React.ChangeEventHandler<HTMLInputElement>;
//   isDisabled?: boolean;
//   isError: boolean;
//   setIsError: React.Dispatch<React.SetStateAction<boolean>>;
//   setFilesName: React.Dispatch<React.SetStateAction<string>>;
//   setFilesNameError: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const InputStyleMultiUploadBtn: React.FC<InputStyleMultiUploadBtnProps> = ({
//   errorMessage,
//   onChange,
//   isDisabled = false,
//   isError,
//   setIsError,
//   setFilesName,
//   setFilesNameError,
// }) => {
//   // const [isFocused, setIsFocused] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setSelectedFile(file ? file.name : null);
//     if (file) {
//       setIsError(false);
//       // setIsFocused(false);
//       // 파일이 선택되면, 오류 상태를 해제
//     }
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null); // 선택한 파일 상태를 null로 설정
//     // input type="file"을 초기화합니다.
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     // 상위 컴포넌트에 변경 사항을 알리려면, onChange 이벤트를 직접 생성하여 호출
//     // if (onChange && fileInputRef.current) {
//     //   const event = new Event("", { bubbles: true });
//     //   onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
//     // }
//     // 파일 제거 시 상태 업데이트 로직을 직접 호출
//     setFilesName(""); // 파일 이름 상태를 빈 문자열로 설정
//     setFilesNameError(false); // 에러 상태를 false로 설정
//   };

//   const handleBlur = () => {
//     // setIsError(false);
//     // setIsHovered(true);
//   };

//   const baseStyle = "inputSize-l bgColor-white border borderColor ";
//   const errorStyle = "border border-secondary-red-original outline-none";
//   const hoverStyle =
//     "border hover:outline-none hover:border-primary-blue-original hover:textColor-high-emphasis";
//   const disabledStyle = "bgColor-neutral textColor-low-emphasis";

//   let inputStyle = `${baseStyle} ${
//     isDisabled
//       ? disabledStyle
//       : isError
//       ? errorStyle
//       : isHovered
//       ? hoverStyle
//       : ""
//   }`;

//   return (
//     <div className="w-[311px] h-16 flex flex-col justify-start items-start gap-1  whitespace-nowrap">
//       {/*  */}
//       <div
//         className={`w-full flex justify-between items-center ${baseStyle} ${inputStyle}`}
//       >
//         <div className="flex justify-between items-center gap-2">
//           <input
//             id="file-input"
//             ref={fileInputRef}
//             type="file"
//             className="hidden"
//             onChange={handleFileChange}
//             onBlur={handleBlur}
//           />
//           <label
//             htmlFor="file-input"
//             onMouseEnter={() => handleBlur()} // 마우스 진입 시 호버 상태 true
//             onMouseLeave={() => setIsHovered(false)} // 마우스 벗어날 때 호버 상태 false
//             className={`cursor-pointer text-paragraph-16 font-normal
//           ${
//             isHovered
//               ? "textColor-focus underline underline-offset-4 decoration-current duration-500"
//               : "btnStyle-textOnly"
//           }
//           tabIndex={0}`}
//           >
//             파일 선택
//           </label>
//         </div>
//         {!selectedFile && (
//           <p className="textColor-low-emphasis">선택한 파일 없음</p>
//         )}
//       </div>
//       {/*  */}
//       <div className="w-full textColor-mid-emphasis flex justify-between items-start">
//         <div className="text-paragraph-12 font-normal">권장 용량 및 확장자</div>
//         <div className="flex justify-between items-center gap-1">
//           <Icon name="Help" width={12} height={12} />
//           <div className="text-paragraph-12 font-normal">도움말</div>
//         </div>
//       </div>
//       {selectedFile && (
//         <FileBadge
//           filename={selectedFile}
//           handleRemoveFile={handleRemoveFile}
//         />
//       )}
//       {/*  */}
//       {isError && !isDisabled && errorMessage && (
//         <ErrorMessage errorMessage={errorMessage} />
//       )}
//     </div>
//   );
// };

// export default InputStyleMultiUploadBtn;

import React, { useState, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import FileBadge from "./FileBadge";
import Icon from "../Icon/Icon";

interface InputStyleMultiUploadBtnProps {
  titleText: string;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setFilesName: React.Dispatch<React.SetStateAction<string[]>>;
  setFilesNameError: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputStyleMultiUploadBtn: React.FC<InputStyleMultiUploadBtnProps> = ({
  titleText,
  errorMessage,
  onChange,
  isDisabled = false,
  isError,
  setIsError,
  setFilesName,
  setFilesNameError,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles((prevFiles) => {
      // 새로운 파일 중에서 이전에 선택되지 않은 파일만 필터링합니다.
      const filteredNewFiles = files.filter(
        (file) => !prevFiles.some((prevFile) => prevFile.name === file.name)
      );

      // 중복되지 않은 새 파일들을 이전 파일 목록에 추가합니다.
      return [...prevFiles, ...filteredNewFiles];
    });
    setIsError(false);
    // 파일이 선택되면, 오류 상태를 해제합니다.
    if (onChange) {
      onChange(e);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.name !== fileName);

      // 파일 목록을 업데이트한 후 남은 파일이 없으면 input의 값을 초기화합니다.
      if (updatedFiles.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 업데이트된 파일 목록을 반환하여 상태를 업데이트합니다.
      return updatedFiles;
    });
    setFilesName((prevFiles) => prevFiles.filter((file) => file !== fileName)); // 이 부분은 필요에 따라 조정하시기 바랍니다.
    setFilesNameError(false); // 에러 상태를 false로 설정합니다.
  };

  const baseStyle = "inputSize-l bgColor-white border borderColor";
  const errorStyle = "border border-secondary-red-original outline-none";
  const hoverStyle =
    "border hover:outline-none hover:border-primary-blue-original hover:textColor-high-emphasis";
  const disabledStyle = "bgColor-neutral textColor-low-emphasis";

  let inputStyle = `${baseStyle} ${
    isDisabled
      ? disabledStyle
      : isError
      ? errorStyle
      : isHovered
      ? hoverStyle
      : ""
  }`;

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-1 whitespace-nowrap">
      <div
        className={`w-full flex justify-start items-center ${baseStyle} ${inputStyle} gap-2`}
      >
        <input
          id={titleText}
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple // 여러 파일 선택을 허용합니다.
        />
        <label
          htmlFor={titleText}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer text-paragraph-16 font-normal ${
            isHovered
              ? "textColor-focus underline underline-offset-4 decoration-current"
              : "textColor-mid-emphasis btnStyle-textOnly"
          } tabIndex={0}`}
        >
          파일 선택
        </label>
        {selectedFiles.length === 0 && (
          <p className="textColor-low-emphasis">선택한 파일 없음</p>
        )}
      </div>
      <div className="w-full textColor-mid-emphasis flex justify-between items-start">
        <div className="text-paragraph-12 font-normal">권장 용량 및 확장자</div>
        <div className="flex justify-between items-center gap-1">
          <Icon name="Help" width={12} height={12} />
          <div className="text-paragraph-12 font-normal">도움말</div>
        </div>
      </div>
      <div
        className="w-full flex flex-wrap justify-start items-center gap-[4px]" // 파일 배지를 위한 컨테이너에 flex-wrap 적용
      >
        {selectedFiles.map((file, index) => (
          <FileBadge
            key={index}
            filename={file.name}
            title={file.name}
            handleRemoveFile={() => handleRemoveFile(file.name)}
          />
        ))}
      </div>
      {isError && !isDisabled && errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default InputStyleMultiUploadBtn;
