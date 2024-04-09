"use server";

import { cookies } from "next/headers";

// Role : Admin, Recruiter
export async function getAccessToken(
  Role: string
): Promise<string | undefined> {
  // cookies().get()을 통해 쿠키 값을 가져옵니다.
  // 여기서는 Role에 따라 다른 accessToken 쿠키 값을 가져올 수 있도록 합니다.
  const value = cookies().get(`accessToken${Role}`);
  return value?.value; // 쿠키 값이 존재한다면 해당 값을, 그렇지 않으면 undefined를 반환합니다.
}
