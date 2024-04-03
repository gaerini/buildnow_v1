import React, { useState, useEffect } from "react";
import InputForm1 from "./InputForm1";
import { useRouter } from "next/navigation";
import Icon from "../../Icon/Icon";

interface Category {
  items: number;
  maxScore: number;
}

interface Scores {
  [category: string]: number[];
}

const categories: { [key: string]: Category } = {
  분류1: { items: 3, maxScore: 25 },
  분류2: { items: 3, maxScore: 25 },
  분류3: { items: 3, maxScore: 35 },
  분류4: { items: 3, maxScore: 15 },
};

interface ScoreInputProps {
  onScoreChange: (score: number) => void;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ onScoreChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(e.target.value, 10);
    onScoreChange(isNaN(score) ? 0 : score);
  };

  return (
    <input type="number" onChange={handleChange} min="0" className="w-16" />
  );
};

const Evaluation: React.FC = () => {
  const [inputValues, setInputValues] = useState({
    신용평가등급: "AA+",
    자본금: "500만원",
    인원보유현황_기술자: "10명",
    인원보유현황_기능공: "5명",
    보유면허1_업종: "철근콘크리트",
    보유면허1_년도: "2023",
    보유면허1_등록번호: "21-424-242-534",
    보유면허1_시평액: "5천만원",
    보유면허2_업종: "철근콘크리트",
    보유면허2_년도: "2023",
    보유면허2_등록번호: "21-424-242-534",
    보유면허2_시평액: "5천만원",
    보유면허3_업종: "철근콘크리트",
    보유면허3_년도: "2023",
    보유면허3_등록번호: "21-424-242-534",
    보유면허3_시평액: "5천만원",
    사업자등록번호: "123-45-67890",
    제재처분이력: "없음",
    사업자상태: "정상",
  });

  const [scores, setScores] = useState<Scores>({});

  useEffect(() => {
    const initialScores: Scores = {};
    Object.keys(categories).forEach((category) => {
      initialScores[category] = Array(categories[category].items).fill(0);
    });
    setScores(initialScores);
  }, []);

  const handleScoreChange = (
    category: string,
    index: number,
    newScore: number
  ) => {
    const currentCategoryScores = scores[category];
    const categorySum = currentCategoryScores.reduce(
      (sum, score, idx) => sum + (idx === index ? newScore : score),
      0
    );

    if (categorySum <= categories[category].maxScore) {
      const newScores = [...currentCategoryScores];
      newScores[index] = newScore;
      setScores((prevScores) => ({ ...prevScores, [category]: newScores }));
    }
  };

  const calculateTotalScore = (): number => {
    return Object.values(scores)
      .flat()
      .reduce((sum, score) => sum + score, 0);
  };

  const calculateCategorySum = (category: string): number => {
    return scores[category]?.reduce((sum, score) => sum + score, 0) ?? 0;
  };

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    router.push("/bn_admin/list");
  };

  return (
    <div className="h-screen mt-2 ml-12 pt-16 overflow-auto flex flex-col gap-4">
      <div className="flex pl-[160px] gap-[130px]">
        <p>실제값</p>
        <p>점수</p>
      </div>
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="inline-flex">
          <div className="pt-2 text-subTitle-20 font-bold">{category}</div>
          <div className="flex pl-8 flex-col gap-2">
            {scores[category]?.map((score, itemIndex) => (
              <div key={itemIndex} className="flex gap-4 items-center">
                <span className="pr-2">평가항목{itemIndex + 1}</span>
                <div>
                  <InputForm1
                    inputValues={inputValues}
                    isString={false}
                    keyString={(itemIndex + 1).toString()}
                    isButton={false}
                  />
                </div>
                <ScoreInput
                  onScoreChange={(score) =>
                    handleScoreChange(category, itemIndex, score)
                  }
                />
              </div>
            ))}
            <div className="flex justify-end">
              총합: {calculateCategorySum(category)} /{" "}
              {categories[category].maxScore}
            </div>
          </div>
        </div>
      ))}
      <div className="flex pl-[165px] text-subTitle-20 font-bold">
        전체 점수 합계: {calculateTotalScore()} / 100
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

export default Evaluation;
