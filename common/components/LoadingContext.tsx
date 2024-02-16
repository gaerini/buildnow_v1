"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

// isLoading과 setIsLoading 함수의 타입을 명시하기 위한 인터페이스 정의
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// createContext의 기본값 설정을 위해 명시적 타입 정의
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// children prop의 타입을 ReactNode로 지정
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
