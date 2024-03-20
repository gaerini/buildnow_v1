// ocr.ts에서 함수 이름을 APICallComponent에서 fetchAPIData로 변경
import axios from "axios";

const fetchAPIData = async (url: string) => {
  try {
    const requestBody = {
      url: url,
      api_url:
        "https://iqv08bmvym.apigw.ntruss.com/custom/v1/29324/7d20272fe3a8a3eaa719e6d76e403857876ed085f8015723e6a6d0dc5acf5094/infer",
      secret_key: process.env.OCR_SECRET_KEY,
    };

    const response = await axios.post(
      "https://afw633wf9j.execute-api.ap-southeast-2.amazonaws.com/2024-03-20/get_result",
      requestBody
    );
    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error("There was an error!", error);
    return null; // 에러가 발생한 경우 null을 반환
  }
};

export default fetchAPIData;
