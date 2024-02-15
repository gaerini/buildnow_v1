"use client";
import React, { useState } from "react";
import Icon from "../../../common/components/Icon/Icon"; // Icon 컴포넌트의 경로를 확인하세요.
import Modal from "../../../common/components/Modal/Modal";

const Page = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [validation, setValidation] = useState({
    name: true,
    company: true,
    email: true,
    phone: true,
    inquiry: true,
  });

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setInquiry("");
  };

  const validateInput = () => {
    const newValidation = {
      name: name.trim() !== "",
      company: company.trim() !== "",
      email: email.trim() !== "",
      phone: phone.trim() !== "",
      inquiry: inquiry.trim() !== "",
    };
    setValidation(newValidation);
    return Object.values(newValidation).every(Boolean);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateInput()) {
      console.log("담당자 성함:", name);
      console.log("회사:", company);
      console.log("이메일:", email);
      console.log("전화번호:", phone);
      console.log("문의내용:", inquiry);
      setShowModal(true);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bgColor-navy w-full h-screen flex flex-col justify-center gap-y-[150px] px-[50px] xl:px-[100px] min-w-max">
      <div className="w-full py-8 flex justify-start md:px-8">
        <Icon
          name="Buildnow"
          width={282}
          height={64}
          style={{ flexShrink: 0 }}
        />
      </div>
      <div className="items-center grow ">
        <div className="flex items-start gap-y-20 justify-center flex-col xl:flex-row xl:gap-x-12">
          <div className="flex w-full justify-center xl:justify-end xl:w-fit ">
            <div className="flex bg-white shadow-m px-8 py-8 flex-col gap-y-8 w-fit rounded-m">
              {/* 입력 폼 섹션 */}
              <div className="flex gap-x-6 ">
                {/* 담당자 성함 입력폼 */}
                <div>
                  <p className="text-paragraph-16 textColor-black">
                    담당자님의 성함
                  </p>
                  <input
                    type="text"
                    className={`w-[240px] h-10 bg-white rounded-s px-3 my-1 text-paragraph-16 ${
                      validation.name
                        ? "border borderColor"
                        : "border border-danger-red"
                    }`}
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!validation.name && (
                    <p className="text-paragraph-14 textColor-danger">
                      담당자님의 성함을 입력해 주세요.
                    </p>
                  )}
                </div>

                {/* 회사명 입력폼 */}
                <div>
                  <p className="text-paragraph-16 textColor-black">회사</p>
                  <input
                    type="text"
                    className={`w-[240px] h-10 bg-white rounded-s px-3 my-1 text-paragraph-16 ${
                      validation.company
                        ? "border borderColor"
                        : "border border-danger-red"
                    }`}
                    placeholder="회사"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  {!validation.company && (
                    <p className="text-paragraph-14 textColor-danger">
                      회사명을 입력해 주세요.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-x-6">
                {/* 이메일 입력폼 */}
                <div>
                  <p className="text-paragraph-16 textColor-black">이메일</p>
                  <input
                    type="email"
                    className={`w-[240px] h-10 bg-white rounded-s px-3 my-1 text-paragraph-16 ${
                      validation.email
                        ? "border borderColor"
                        : "border border-danger-red"
                    }`}
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!validation.email && (
                    <p className="text-paragraph-14 textColor-danger">
                      이메일을 입력해 주세요.
                    </p>
                  )}
                </div>

                {/* 전화번호 입력폼 */}
                <div>
                  <p className="text-paragraph-16 textColor-black">전화번호</p>
                  <input
                    type="text"
                    className={`w-[240px] h-10 bg-white rounded-s px-3 my-1 text-paragraph-16 ${
                      validation.phone
                        ? "border borderColor"
                        : "border border-danger-red"
                    }`}
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {!validation.phone && (
                    <p className="text-paragraph-14 textColor-danger">
                      전화번호를 입력해 주세요.
                    </p>
                  )}
                </div>
              </div>

              <div>
                {/* 문의내용 입력폼 */}
                <p className="text-paragraph-16 textColor-black">문의내용</p>
                <textarea
                  className={`w-full h-[100px] bg-white rounded-s px-3 py-2 my-1 text-paragraph-16 ${
                    validation.inquiry
                      ? "border borderColor"
                      : "border border-danger-red"
                  }`}
                  placeholder="문의내용을 입력하세요"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                />
                {!validation.inquiry && (
                  <p className="text-paragraph-14 textColor-danger">
                    문의내용을 입력해 주세요.
                  </p>
                )}
              </div>

              <button
                className="btnStyle-main-1 btnSize-xl w-full h-14 flex justify-center items-center"
                onClick={handleSubmit}
              >
                문의내용 접수
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full xl:justify-end xl:w-fit ">
            <div className="flex flex-col px-8 w-fit">
              <h2 className="text-4xl textColor-focus font-bold">고객센터</h2>
              <div>
                <div className="mt-[60px] whitespace-nowrap">
                  <h3 className="text-subTitle-20 textColor-mid-emphasis">
                    빌드나우 대표 연락처
                  </h3>
                  <div className="mt-4 flex items-center whitespace-nowrap gap-x-4">
                    <Icon name="Phone" width={24} height={24} />
                    <span className="text-subTitle-20 textColor-black">
                      010-6564-4208
                    </span>
                  </div>
                  <div className="mt-2 flex items-center whitespace-nowrap gap-x-4">
                    <Icon name="Email" width={24} height={24} />
                    <span className="text-subTitle-20 textColor-black">
                      business@buildnow.kr
                    </span>
                  </div>
                </div>
                <div className="mt-12 flex items-center whitespace-nowrap gap-x-4">
                  <h3 className="text-subTitle-20 textColor-mid-emphasis">
                    상담 시간
                  </h3>
                  <p className="text-subTitle-20 textColor-black">
                    월-금 10:00 ~ 19:00
                  </p>
                </div>
                <div className="mt-12 flex gap-x-4 items-start text-wrap">
                  <h3 className="text-subTitle-20 textColor-mid-emphasis">
                    주소
                  </h3>
                  <p className="text-subTitle-20 textColor-black">
                    (02841) 서울시 성북구 안암로 145 경영본관 2층 스타트업연구원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <Modal
            hasCloseIcon={true}
            buttonType="negative-positive"
            rightButtonText="확인"
            rightButtonOnClick={() => {
              setShowModal(false);
              resetForm();
            }}
            backgroundOnClick={hideModal}
            fullscreen={true}
          >
            <Icon name="CheckSign" width={32} height={32} />
            <div className="mt-[10px] text-subTitle-20">
              <div className="flex flex-col items-center">
                <div>상담 신청이 접수되었습니다.</div>
                <div>빠른 시일 내에 연락드리겠습니다.</div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Page;
