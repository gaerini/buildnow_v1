import React, { useState, useEffect } from "react";
import axios from "axios";

// API 응답 구조에 대한 인터페이스를 정의합니다.
interface ApiResponse {
  data: any; // 'any' 대신 더 구체적인 타입을 사용할 수 있습니다.
}

const APICallComponent = (url: string[]) => {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);

  const fetchData = async (url: string[]) => {
    try {
      const requestBody = {
        url: url,
        api_url:
          "https://iqv08bmvym.apigw.ntruss.com/custom/v1/29324/7d20272fe3a8a3eaa719e6d76e403857876ed085f8015723e6a6d0dc5acf5094/infer",
        secret_key: "bXBwR3Vyak1UcVZMSldqeFJlTFBzQXZwcURnT2NYR1g=",
      };

      const response = await axios.post<ApiResponse>(
        "https://afw633wf9j.execute-api.ap-southeast-2.amazonaws.com/2024-03-20/get_result",
        requestBody
      );

      setResponseData(response.data); // 응답 데이터를 상태에 저장합니다.
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  fetchData(url); // 정의한 비동기 함수를 호출합니다.
  //   console.log("결과", "ㅎㅇ");

  console.log("결과", responseData);
};

export default APICallComponent;
