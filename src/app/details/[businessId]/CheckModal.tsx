"use client";

// CheckModal.tsx
import React, { useState } from "react";
import Modal from "../../../../common/components/Modal/Modal";
import { useRouter } from "next/navigation";

interface CheckModalProps {
  isModalVisible: boolean;
  isSecondModalVisible: boolean;
  hideModal: () => void;
  showSecondModal: () => void;
  businessId : string
}

const CheckModal: React.FC<CheckModalProps> = ({
  isModalVisible,
  isSecondModalVisible,
  hideModal,
  showSecondModal,
  businessId
}) => {
  const router = useRouter();
  const NavToList = (path: string) => {
    router.push(path);
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
            NavToList("/list");
            console.log("여기서 이동해야함");
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
