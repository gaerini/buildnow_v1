//  이 코드는 버려도 되는 코드임! 그냥 어케 쓰는지 보기용임!

"use client";
import React, { useState } from "react";
import CheckBox from "../../../../common/components/CheckBox/CheckBox";
import Modal from "../../../../common/components/Modal/Modal";

export default function ModalButtons() {
  // 여기는 모달 보여주는 버튼 때문에 쓴 코드임 (필요 없음)
  const [showModal, setShowModal] = useState<Record<string, boolean>>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
  });

  const toggleModal = (modalNumber: string) => {
    setShowModal({ ...showModal, [modalNumber]: !showModal[modalNumber] });
  };
  // 이거는 체크박스 예시! (1개만 있음)
  const lookAgainCheckBox = [{ text: "하루 동안 다시 보지 않기" }];
  const handleSelectLookAgain = (index: number | null) => {
    console.log("다시 보지 않기 버튼 클릭함");
  };

  return (
    <div>
      {/* 버튼들 */}
      {["1", "2", "3", "4", "5", "6"].map((num) => (
        <button
          key={num}
          className="bg-primary-neutral-400 border-black text-black mx-4 p-2"
          onClick={() => toggleModal(num)}
        >
          Modal {num}
        </button>
      ))}

      {/* 모달들 */}
      {showModal["1"] && (
        <Modal
          hasCloseIcon={false}
          buttonType="negative-positive"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={() => console.log("Modal1 왼쪽 버튼 클릭")}
          rightButtonOnClick={() => console.log("Modal1 오른쪽 버튼 클릭")}
        >
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}

      {/* 나머지 모달에 대한 조건부 렌더링 */}
      {showModal["2"] && (
        <Modal
          hasCloseIcon={false}
          buttonType="neutral"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={() => console.log("Modal1 왼쪽 버튼 클릭")}
          rightButtonOnClick={() => console.log("Modal1 오른쪽 버튼 클릭")}
        >
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}
      {showModal["3"] && (
        <Modal hasCloseIcon={false} buttonType="none">
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}
      {showModal["4"] && (
        <Modal
          hasCloseIcon={true}
          buttonType="negative-positive"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={() => console.log("Modal4 왼쪽 버튼 클릭")}
          rightButtonOnClick={() => console.log("Modal4 오른쪽 버튼 클릭")}
        >
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}
      {showModal["5"] && (
        <Modal
          hasCloseIcon={true}
          buttonType="neutral"
          leftButtonText="취소"
          rightButtonText="완료"
          leftButtonOnClick={() => console.log("Modal5 왼쪽 버튼 클릭")}
          rightButtonOnClick={() => console.log("Modal5 오른쪽 버튼 클릭")}
        >
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}
      {showModal["6"] && (
        <Modal hasCloseIcon={true} buttonType="none">
          <div className="mb-4">배점표 검토를 완료하시겠습니까?</div>
          <div>
            <CheckBox
              items={lookAgainCheckBox}
              onSelect={handleSelectLookAgain}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
