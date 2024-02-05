"use client";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "../../../common/components/Icon/Icon";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../../common/components/TopNavigator/TopNavigator";
import Modal from "../../../common/components/Modal/Modal";

export default function Home() {
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

  // 여기는 체크박스 사용하는 방법!!
  // 우선 각 체크박스에 들어갈 Text를 쓰고
  const checkboxes = [
    { text: "Checkbox 1" },
    { text: "Checkbox 2" },
    // ... 추가 체크박스 구성
  ];

  // 여기에서 각 Index마다 어떤 함수를 실행시킬지 결정하면 됨 (체크박스 후 확인 누르는 경우에는 상위에 함수 정의해서 쓰면 될 듯)
  const handleSelect = (index: number | null) => {
    console.log(
      `선택된 체크박스: ${index !== null ? checkboxes[index].text : "없음"}`
    );
  };

  // 이거는 체크박스 예시! (1개만 있음)
  const lookAgainCheckBox = [{ text: "하루 동안 다시 보지 않기" }];
  const handleSelectLookAgain = (index: number | null) => {
    console.log("다시 보지 않기 버튼 클릭함");
  };

  return (
    <div className="flex">
      <SideNavigator CompanyName="A 건설" />
      <div className="flex flex-col flex-grow">
        <TopNavigator>
          <Dropdown />
        </TopNavigator>
        <CheckBox items={checkboxes} onSelect={handleSelect} />
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
              leftButtonText="계속 검토하기"
              rightButtonText="결과 탭 가기"
              leftButtonOnClick={() => console.log("Modal1 왼쪽 버튼 클릭")}
              rightButtonOnClick={() => console.log("Modal1 오른쪽 버튼 클릭")}
              width="502px"
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
              leftButtonText="계속 검토하기"
              rightButtonText="결과 탭 가기"
              leftButtonOnClick={() => console.log("Modal1 왼쪽 버튼 클릭")}
              rightButtonOnClick={() => console.log("Modal1 오른쪽 버튼 클릭")}
              width="502px"
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
            <Modal hasCloseIcon={false} buttonType="none" width="502px">
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
              leftButtonText="계속 검토하기"
              rightButtonText="결과 탭 가기"
              leftButtonOnClick={() => console.log("Modal4 왼쪽 버튼 클릭")}
              rightButtonOnClick={() => console.log("Modal4 오른쪽 버튼 클릭")}
              width="502px"
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
              leftButtonText="계속 검토하기"
              rightButtonText="결과 탭 가기"
              leftButtonOnClick={() => console.log("Modal5 왼쪽 버튼 클릭")}
              rightButtonOnClick={() => console.log("Modal5 오른쪽 버튼 클릭")}
              width="502px"
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
            <Modal hasCloseIcon={true} buttonType="none" width="502px">
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
      </div>
    </div>
  );
}
