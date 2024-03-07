// pages/api/pdf.ts
import { NextRequest, NextResponse } from "next/server";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";

// AWS S3 설정
const s3 = new S3({
  region: "ap-northeast-2",
  accessKeyId: "AKIAZJ4GSOPKT2YIORKJ",
  secretAccessKey: "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",
  signatureVersion: "v4",
});

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    // 파일 이름 생성하는 부분
    const type = req.nextUrl.searchParams.get("fileType") as string;
    const ex = type.split("/")[1]; // application/pdf

    const name = req.nextUrl.searchParams.get("fileName") as string;
    const doc = req.nextUrl.searchParams.get("docType") as string;

    const Key = `${doc}-${name}`; // 이게 이름임
    console.log(ex, name, doc);

    const s3Params = {
      Bucket: "buildnowtestbucket",
      Key,
      Expires: 60, // URL 유효 시간 (초)
      ContentType: `application/${ex}`,
    };

    try {
      const url = await s3.getSignedUrlPromise("putObject", s3Params);
      return NextResponse.json({ url: url, key: Key });
    } catch (err) {
      return NextResponse.json({ error: "Error creating pre-signed URL" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}
