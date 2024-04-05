import Home from "./Home";
import { cookies } from "next/headers";
import { TempSaveProvider } from "../../../../../common/components/TempSaveContext";

// `as string`을 사용하여 TypeScript에게 businessId의 타입이 'string'임을 단언합니다.

export default async function Page({}) {
  return (
    <TempSaveProvider>
      <Home />
    </TempSaveProvider>
  );
}
