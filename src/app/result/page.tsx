"use client";
import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import Result from "../../../common/components/ScoreTable/Result";

function App() {
  return (
    <LoadingProvider>
      <Result />
    </LoadingProvider>
  );
}

export default App;
