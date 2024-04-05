"use client";
// TempSaveContext.js
import React, { createContext, useState, useContext, ReactNode } from "react";

interface TempSaveState {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: any[];
}

interface TempSaveContextType {
  tempSaveList: TempSaveState;
  setTempSaveList: (newState: TempSaveState) => void; // Updated type
}

const defaultValue: TempSaveContextType = {
  tempSaveList: {
    corporateApplication: "",
    companyPhoneNum: "",
    workTypeApplying: "",
    type: "",
    companyAddress: "",
    companyIntro: "",
    tempHandedOutList: [],
  },
  setTempSaveList: () => {},
};

const TempSaveContext = createContext<TempSaveContextType>(defaultValue);

export const TempSaveProvider = ({ children }: { children: ReactNode }) => {
  const [tempSaveList, setTempSaveList] = useState<TempSaveState>(
    defaultValue.tempSaveList
  );

  // Provide a function to replace the entire state
  const updateTempSaveList = (newState: TempSaveState) => {
    setTempSaveList(newState);
  };

  const value = { tempSaveList, setTempSaveList: updateTempSaveList };

  return (
    <TempSaveContext.Provider value={value}>
      {children}
    </TempSaveContext.Provider>
  );
};

export const useTempSave = () => useContext(TempSaveContext);
