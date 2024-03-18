import React, { useState, useEffect } from "react";

declare const daum: any; // 카카오 지도 API 전역 객체 선언

interface AddressData {
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: string;
  zonecode: string;
  bname: string;
  buildingName: string;
  apartment: string;
}

interface AddressSearchProps {
  setAddressState: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  setAddressState,
  isError,
  setIsError,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  const execDaumPostcode = () => {
    new daum.Postcode({
      oncomplete: function (data: AddressData) {
        let addr = "";
        let extraAddr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          setExtraAddress(extraAddr);
        } else {
          setExtraAddress("");
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setDetailAddress("");
        setAddressState(data.roadAddress);
      },
    }).open();
  };

  const inputStyle = isError
    ? "border-secondary-red-original textColor-high-emphasis" // Error style with high emphasis text
    : "focus:border-primary-blue-original textColor-high-emphasis"; // Normal style with high emphasis text

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex w-full gap-x-2 justify-between">
        <input
          className={`btnStyle-main-2 inputSize-l text-paragraph-16 placeholder:textColor-low-emphasis h-[44px] w-full font-normal focus:outline-none ${inputStyle}`}
          type="text"
          placeholder="우편번호"
          value={postcode}
          readOnly
        />
        <button
          className="btnStyle-main-2 btnSize-m whitespace-nowrap h-[44px] text-subTitle-16"
          onClick={execDaumPostcode}
        >
          찾기
        </button>
      </div>
      <div className="flex w-full gap-x-2 justify-between">
        <input
          className={`btnStyle-main-2 inputSize-l text-paragraph-16 placeholder:textColor-low-emphasis h-[44px] w-full font-normal focus:outline-none ${inputStyle}`}
          type="text"
          placeholder="주소"
          value={address}
          readOnly
        />
      </div>
      <div className="flex w-full gap-x-2 justify-between">
        <input
          className={`btnStyle-main-2 inputSize-l text-paragraph-16 placeholder:textColor-low-emphasis h-[44px] w-full font-normal focus:outline-none ${inputStyle}`}
          type="text"
          placeholder="상세주소"
          value={detailAddress}
          onChange={(e) => {
            setDetailAddress(e.target.value);
            setIsError(false); // Reset error state on input change
          }}
        />
      </div>
    </div>
  );
};

export default AddressSearch;
