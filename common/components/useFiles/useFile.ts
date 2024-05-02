"use client";
import { useState, useEffect } from "react";

// Use the specific type for file input change events in React
export function useFile(
  initialValue: File | File[] | null = null,
  isMultiple: boolean = false,
  isToolTip: boolean = false,
  detailedText: React.ReactNode
) {
  const [file, setFile] = useState<File | File[] | null>(initialValue);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // This ensures `File` is only used client-side
    if (typeof window !== "undefined" && initialValue instanceof File) {
      setFile(initialValue);
    }
  }, [initialValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setError(true);
      return;
    }

    setError(false);
    setFile(isMultiple ? Array.from(files) : files[0]);
  };

  return {
    file,
    setFile,
    error,
    setError,
    handleFileChange,
    isToolTip,
    detailedText,
  };
}
