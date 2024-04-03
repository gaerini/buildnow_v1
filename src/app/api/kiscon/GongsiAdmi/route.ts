// 행정처분

import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

type S3Object = {
  ncrMasterNum: number; // 사업자 등록번호
  ecodeAdmiCon: string; // 위반내용
  ncrAdmiKname: string; // 업체명
  ncrAdmiDename: string; // 행정처분명
  ncrAdmiReason: string; // 위반내용(상세)
  ncrAdmiStopSdate: number; //영업정지종료일
  ncrGsFlag: string; // 공시내용구분
  ncrGsReason: string; //변경철회사유
  ncrItemName: string; // 처분업종
  ncrItemregno: string; // 처분업종등록번호
  ncrPdStatus: string; // 가처분내용존재여부
  // 기타 필요한 속성 추가...
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
        Key: "kiscon-GongsiAdmi.json", // 파일 이름
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
          ncrMasterNum,
          ecodeAdmiCon,
          ncrAdmiKname,
          ncrAdmiReason,
          ncrAdmiStopSdate,
          ncrGsFlag,
          ncrGsReason,
          ncrItemName,
          ncrItemregno,
          ncrPdStatus,
        }) => ({
          ncrMasterNum,
          ecodeAdmiCon,
          ncrAdmiKname,
          ncrAdmiReason,
          ncrAdmiStopSdate,
          ncrGsFlag,
          ncrGsReason,
          ncrItemName,
          ncrItemregno,
          ncrPdStatus,
        })
      );

    // 필터링된 데이터 반환
    NextResponse.json(filteredRecords);
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json({ message: "Internal Server Error" });
  }
}
