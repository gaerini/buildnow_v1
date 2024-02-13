"use client";

// CheckModal.tsx
import React, { useState } from "react";
import Modal from "../../../../common/components/Modal/Modal";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

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
    baseURL:
      "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000",
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

  return (
    <>
      {isModalVisible && (
        <Modal
          hasCloseIcon={false}
          buttonType="negative-positive"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={hideModal}
          rightButtonOnClick={showSecondModal}
          backgroundOnClick={hideModal}
        >
          배점표 검토를 완료하시겠습니까?
        </Modal>
      )}

      {isSecondModalVisible && (
        <Modal
          hasCloseIcon={true}
          buttonType="neutral"
          leftButtonText="지원서 목록 가기"
          leftButtonOnClick={() => {
            hideModal();
            handlePatchRequest();
            NavToList("/list");
          }}
          backgroundOnClick={hideModal}
        >
          배점표 검토가 완료되었습니다
        </Modal>
      )}
    </>
  );
};

export default CheckModal;
