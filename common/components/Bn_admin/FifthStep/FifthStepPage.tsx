"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "../../Icon/Icon";
import Cookies from "js-cookie";
import axios from "axios";

interface Scores {
  categoryName: string;
  score: number;
}

interface ApplicationEvaluation {
  id: number;
  score: number;
}

interface PerfectScores {
  [categoryName: string]: number;
}

interface RecruitmentGrade {
  id: number;
  category: string;
  perfectScore: number;
  upperCategoryENUM: string;
  applicationEvaluationList: ApplicationEvaluation[];
}

interface FifthStepPageProps {
  recruitmentGrading: RecruitmentGrade[];
  applicationId: string;
}

interface ScoreInputProps {
  onScoreChange: (score: number) => void;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ onScoreChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(e.target.value, 10);
    onScoreChange(isNaN(score) ? 0 : score);
  };

  return (
    <input type="number" onChange={handleChange} min="0" className="w-20" />
  );
};

const FifthStepPage: React.FC<FifthStepPageProps> = ({
  recruitmentGrading,
  applicationId,
}) => {
  const [categoryValues, setCategoryValues] = useState<string[]>([]);
  const accessTokenAdmin = Cookies.get("accessTokenAdmin");

  const [scores, setScores] = useState<Scores[]>([]);
  const [perfectScores, setPerfectScores] = useState<PerfectScores>({});
  const qs = require("qs");

  const recruitmentId = 1;

  useEffect(() => {
    const categories = recruitmentGrading?.map((grade) => grade.category);
    setCategoryValues(categories);
    console.log(categories);
  }, [recruitmentGrading]);

  useEffect(() => {
    // Mapping over recruitmentGrading to initialize scores with category names and zero scores
    const initialScores: Scores[] =
      recruitmentGrading?.map((grade) => ({
        categoryName: grade.category,
        score: 0,
      })) ?? [];

    const initialPerfectScores: PerfectScores = {};
    recruitmentGrading?.forEach((grade) => {
      initialPerfectScores[grade.category] = grade.perfectScore;
    });

    setScores(initialScores);
    setPerfectScores(initialPerfectScores);
  }, [recruitmentGrading]);

  // Update the score at a specific index with a new score
  const handleScoreChange = (index: number, newScore: number) => {
    const updatedScores = scores.map((score, idx) =>
      idx === index ? { ...score, score: newScore } : score
    );
    setScores(updatedScores);
  };

  const calculateTotalScore = () => {
    return scores.reduce((sum, score) => sum + score.score, 0);
  };

  useEffect(() => {
    // scores 상태가 바뀔 때마다 콘솔에 출력
    console.log("Scores updated:", scores);
  }, [scores]);

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      applicationEvaluationDTOList: scores,
    };

    const formBody = qs.stringify(requestBody, { allowDots: true });
    console.log("Request Body:", requestBody);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${applicationId}`,
        formBody,
        {
          headers: {
            Authorization: `Bearer ${accessTokenAdmin}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === 201) {
        console.log("점수 저장 성공", response.data);
        router.push("/bn_admin/list");
        return true;
      }
    } catch (error) {
      console.error("점수 저장 실패", error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 이미 해당 category에 점수가 들어가있습니다."
        ) {
          // Handle the case where the score is already present
          try {
            await axios.delete(
              `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${applicationId}`,
              {
                headers: {
                  Authorization: `Bearer ${accessTokenAdmin}`,
                },
              }
            );
            // Retry the POST request after successful DELETE
            const retryResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${applicationId}`,
              formBody,
              {
                headers: {
                  Authorization: `Bearer ${accessTokenAdmin}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            if (retryResponse.status === 201) {
              console.log(
                "점수 입력 완료",
                retryResponse.data
              );
              router.push("/bn_admin/list");
              return true;
            }
          } catch (retryError) {
            console.error("Error on retry", retryError);
          }
        } else if (
          errorMessage ===
          "Error Occurred: 이미 해당 category에 점수가 들어가있습니다."
        ) {
          // Handle the case where the score is too high
          alert("만점보다 높은 점수를 입력할 수 없습니다");
        }
      }
      return false;
    }
  };

  return (
    <div className="h-screen mt-2 ml-12 pt-16 overflow-auto flex flex-col gap-4">
      <div className="flex pl-[140px] gap-[260px] text-subTitle-20">
        <p>실제값</p>
        <p>점수</p>
      </div>
      {/* {Object.keys(categoryValues).map((category, index) => ( */}
      <div className="inline-flex">
        {/* <div className="pt-2 text-subTitle-20 font-bold">{category}</div> */}
        <div className="flex pl-8 flex-col gap-2">
          {scores.map((score, index) => (
            <div key={index} className="flex gap-4 items-center">
              <span className="w-[90px]">평가항목{index + 1} : </span>
              <div className="flex justify-start items-center w-[300px]">
                {`${score.categoryName}  (${
                  perfectScores[score.categoryName] ?? "N/A"
                })`}
              </div>
              <ScoreInput
                onScoreChange={(newScore) => handleScoreChange(index, newScore)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex pl-[330px] text-subTitle-20 font-bold">
        전체 점수 합계 &nbsp; : &nbsp; {calculateTotalScore()} / 100
      </div>
      <div className="flex fixed bottom-12 right-12 justify-end items-center">
        <button
          onClick={handleNextStep}
          className="inline-flex btnSize-l bg-pink-500 hover:bg-pink-900 text-white rounded gap-2"
        >
          <Icon name="Cat" width="32" height="32" />
          <p>완료</p>
          <Icon name="CatFoot" width="32" height="32" />
        </button>
      </div>
    </div>
  );
};

export default FifthStepPage;
