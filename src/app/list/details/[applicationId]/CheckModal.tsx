"use client";

// CheckModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../../../../../common/components/Modal/Modal";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Icon from "../../../../../common/components/Icon/Icon";
import CheckBox from "../../../../../common/components/CheckBox/CheckBox";

interface CheckModalProps {
  isModalVisible: boolean;
  isSecondModalVisible: boolean;
  hideModal: () => void;
  showSecondModal: () => void;
  applicationId: string;
  isNarrow: boolean;
}

const CheckModal: React.FC<CheckModalProps> = ({
  isModalVisible,
  isSecondModalVisible,
  hideModal,
  showSecondModal,
  applicationId,
  isNarrow,
}) => {
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessTokenRecruiter")
  );
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPRING_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const router = useRouter();
  const NavToList = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (isSecondModalVisible) {
      handlePatchRequest();
    }
  }, [isSecondModalVisible]);

  const handlePatchRequest = async () => {
    try {
      await axiosInstance.patch(
        `application/recruiter/check-true/${applicationId}`
      );
      console.log("Patch request successful");
    } catch (error) {
      console.error("Error in patch request:", error);
    }
  };

  const [skipFirstModal, setSkipFirstModal] = useState(false);

  useEffect(() => {
    const skipModalCookie = Cookies.get("skipModal");
    if (skipModalCookie === "true") {
      setSkipFirstModal(true);
    } else {
      setSkipFirstModal(false);
    }
  }, []);

  useEffect(() => {
    if (skipFirstModal && isModalVisible) {
      showSecondModal(); // 두 번째 모달을 바로 보여줌
    }
  }, [skipFirstModal, isModalVisible, showSecondModal]);

  const checkbox = [{ text: "하루동안 다시 보지 않기" }];

  const toggleSkipModal = () => {
    const currentSkipModal = Cookies.get("skipModal") === "true";
    Cookies.set("skipModal", String(!currentSkipModal), { expires: 1 });
  };

  return (
    <>
      {!skipFirstModal && isModalVisible && (
        <Modal
          hasCloseIcon={false}
          buttonType="negative-positive"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={hideModal}
          rightButtonOnClick={showSecondModal}
          backgroundOnClick={hideModal}
          isNarrow={isNarrow}
        >
          <div className="mb-4 text-subTitle-18">
            배점표 검토를 완료하시겠습니까?
          </div>
          <CheckBox items={checkbox} onSelect={toggleSkipModal} />
        </Modal>
      )}

      {isSecondModalVisible && (
        <Modal
          hasCloseIcon={true}
          closeOnClick={() => NavToList("/list")}
          buttonType="neutral"
          leftButtonText="지원서 목록 가기"
          leftButtonOnClick={() => {
            NavToList("/list");
          }}
          backgroundOnClick={() =>
            NavToList(`/result/details/${applicationId}`)
          }
          isNarrow={isNarrow}
        >
          <Icon name="CheckSign" width={32} height={32} />
          <div className="mt-[10px] text-subTitle-18">
            배점표 검토가 완료되었습니다
          </div>
        </Modal>
      )}
    </>
  );
};

export default CheckModal;
