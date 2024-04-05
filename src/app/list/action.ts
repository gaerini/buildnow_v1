"use server";

import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string | undefined> {
  const value = cookies().get("accessTokenRecruiter")?.value;
  return value;
}
