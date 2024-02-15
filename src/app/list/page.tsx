"use client";
import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import List from "../../../common/components/ScoreTable/List";

function App() {
  return (
    <LoadingProvider>
      <List />
    </LoadingProvider>
  );
}

export default App;
