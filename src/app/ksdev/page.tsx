"use client";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "../../../common/components/Icon/Icon";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../../common/components/TopNavigator/TopNavigator";
import Modal from "../../../common/components/Modal/Modal";
import ScoreDetail from "../../../common/components/ScoreDetail/ScoreDetail";
import ModalButtons from "./ModalButtons";
import ScoreTable from "../../../common/components/ScoreTable/ScoreTable";
import CompanyList from "../../../common/components/ScoreTable/CompanyList.json";
import TopNavController from "../../../common/components/TopNavController/TopNavController";

export default function Home() {
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

  const MngInfo = {
    totalScore: 15,
    evalScore: 15,
    DetailCat: ["회사 설립 경과 년수", "지방 업체 여부", "산재 발생 여부"],
    DetailCatValue: ["22년", "지방", "미보유"],
    DetailCatTotalScore: [9, 3, 3],
    DetailCatEvalScore: [9, 3, 3],
  };

  const FinInfo = {
    totalScore: 40,
    evalScore: 33,
    DetailCat: ["신용등급", "현금흐름등급", "부채비율", "차입금 의존도"],
    DetailCatValue: ["BB-", "B", "68.7%", "30.7%"],
    DetailCatTotalScore: [10, 10, 10, 10],
    DetailCatEvalScore: [10, 8, 8, 7],
  };

  const CertiInfo = {
    totalScore: 10,
    evalScore: 8,
    DetailCat: ["ESG 인증 및 평가 양호 여부", "ISO 인증 보유 여부"],
    DetailCatValue: ["미보유", "보유"],
    DetailCatTotalScore: [5, 5],
    DetailCatEvalScore: [3, 5],
  };

  const ConstInfo = {
    totalScore: 35,
    evalScore: 30,
    DetailCat: ["시공능력평가액 순위", "최근 3년간 공시 실적"],
    DetailCatValue: ["5%", "양호"],
    DetailCatTotalScore: [20, 15],
    DetailCatEvalScore: [17, 13],
  };

  const data = CompanyList;
  return (
    <div className="flex h-screen">
      <SideNavigator CompanyName="A 건설" />
      <div className="flex flex-col flex-grow ">
        <TopNavigator>
          {/* <Dropdown /> */}
          <TopNavController
            companyName="L이앤씨"
            workType="금속 구조물 창호 온실공사"
            companyBefore="ABC 건설"
            companyAfter="DEF 건설"
          />
        </TopNavigator>
        {/* flex 레이아웃을 사용하여 ScoreDetail과 CheckBox, ModalButtons를 수평으로 배열 */}
        <div className="flex flex-grow">
          {/* ScoreDetail 부분 */}

          <div className="flex-grow">
            <ScoreDetail
              companyName="L이앤씨"
              totalScore={85}
              isPass="통과"
              MngInfo={MngInfo}
              FinInfo={FinInfo}
              CertiInfo={CertiInfo}
              ConstInfo={ConstInfo}
            />
          </div>
          {/* CheckBox와 ModalButtons 부분 */}
          {/* <div className="flex flex-col ml-4"> */}
          {/* {" "} */}
          {/* 여기서 ml-4는 왼쪽 요소와의 간격을 조정합니다 */}
          {/* <CheckBox items={checkboxes} onSelect={handleSelect} /> */}
          {/* <ModalButtons /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
