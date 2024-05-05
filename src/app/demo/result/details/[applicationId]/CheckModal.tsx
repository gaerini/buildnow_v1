"use client";

// CheckModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../../../../../../common/components/Modal/Modal";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Icon from "../../../../../../common/components/Icon/Icon";
import CheckBox from "../../../../../../common/components/CheckBox/CheckBox";

interface CheckModalProps {
  isModalVisible: boolean;
  isSecondModalVisible: boolean;
  hideModal: () => void;
  showSecondModal: () => void;
  businessId: string;
}

const CheckModal: React.FC<CheckModalProps> = ({
  isModalVisible,
  isSecondModalVisible,
  hideModal,
  showSecondModal,
  businessId,
}) => {
  const cookieJWTToken = Cookies.get("token");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: {
      Authorization: `Bearer ${cookieJWTToken}`,
    },
  });
  const router = useRouter();
  const NavToList = (path: string) => {
    router.push(path);
  };

  const handlePatchRequest = async () => {
    try {
      await axiosInstance.patch(`application/isChecked/${businessId}`);
      console.log("Patch request successful");
    } catch (error) {
      console.error("Error in patch request:", error);
    }
  };

  const [skipFirstModal, setSkipFirstModal] = useState(false);

  useEffect(() => {
    const skipModalCookie = Cookies.get("skipModal");
    if (skipModalCookie) {
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
  const hide = (index: number | null) => {
    Cookies.set("skipModal", "true", { expires: 1 });
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
        >
          <div className="mb-4 text-subTitle-18">
            배점표 검토를 완료하시겠습니까?
          </div>
          <CheckBox items={checkbox} onSelect={hide} />
        </Modal>
      )}

      {isSecondModalVisible && (
        <Modal
          hasCloseIcon={true}
          buttonType="neutral"
          leftButtonText="지원서 목록 가기"
          leftButtonOnClick={() => {
            handlePatchRequest();
            NavToList("/list");
          }}
          backgroundOnClick={hideModal}
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
