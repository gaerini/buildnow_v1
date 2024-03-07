import React, { useState } from "react";
import Optional from "./Optional";

export default function DropDown() {
  const [toggleIsOpen, settoggleIsOpen] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = (index: number) => {
    settoggleIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  
  return (
    <div>
      {/* <Optional toggleOpen={toggleOpen} toggleIsOpen={toggleIsOpen} settoggleIsOpen={settoggleIsOpen} /> */}
    </div>
  );
}
