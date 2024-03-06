// pages/api/pdf.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';

// AWS S3 설정
const s3 = new S3({
  region: 'ap-northeast-2',
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileName, fileType } = req.body;

    const params = {
      Bucket: 'buildnow-doc',
      Key: fileName,
      Expires: 60, // URL 유효 시간 (초)
      ContentType: fileType
    };

    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      res.status(200).json({ url });
    } catch (err) {
      res.status(500).json({ error: 'Error creating pre-signed URL' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
