// 건설업체 등록

import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

type S3Object = {
  ncrMasterNum: number; // 사업자 등록번호
  ncrCessReason: string; //폐업 사유
  ncrGsFlag: string; // 공시내용구분
  ncrGsKname:string; // 업체명
  ncrGsNumber: string; //공고번호
  ncrGsReason: string; // 변경사유철회
  ncrGsRegdate: number; // 공시일자
  ncrItemName: string; //신고 업종
  ncrItemregno: string; // 신고 업종 등록번호
};

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 환경변수에서 Access Key ID 가져오기
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 환경변수에서 Secret Access Key 가져오기
  region: process.env.AWS_REGION, // S3 버킷이 위치한 리전
});

export async function GET(req: NextRequest, res: NextResponse) {
  // HTTP 메소드 확인
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Only GET method is allowed" });
  }

  try {
    // S3에서 JSON 데이터 가져오기
    const data = await s3
      .getObject({
        Bucket: "kisconbucket", // S3 버킷 이름
        Key: "kiscon-GongsiCess.json", // 파일 이름
      })
      .promise();

    if (!data.Body) {
      throw new Error("No data found in S3 object");
    }

    // JSON 데이터 파싱
    const records: S3Object[] = JSON.parse(data.Body.toString());

    // 쿼리 파라미터에서 '사업자 등록번호' 가져오기
    const ncrMasterNum = req.nextUrl.searchParams.get("businessId") as string;
    const businessId = parseInt(ncrMasterNum, 10);

    // 필터링
    const filteredRecords = records
      .filter((record) => record.ncrMasterNum === businessId)
      .map(
        ({
          ncrCessReason, //폐업 사유
          ncrGsFlag, // 공시내용구분
          ncrGsNumber, //공고번호
          ncrGsReason, // 변경사유철회
          ncrGsRegdate, // 공시일자
          ncrItemName, //신고 업종
          ncrItemregno, // 신고 업종 등록번호
        }) => ({
          ncrCessReason, //폐업 사유
          ncrGsFlag, // 공시내용구분
          ncrGsNumber, //공고번호
          ncrGsReason, // 변경사유철회
          ncrGsRegdate,
          ncrItemName, //신고 업종
          ncrItemregno, // 신고 업종 등록번호
        })
      );

    // 필터링된 데이터 반환
    NextResponse.json(filteredRecords);
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ message: "Internal Server Error" });
  }
}
