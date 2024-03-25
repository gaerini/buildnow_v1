import React, { useState, useEffect, useRef } from "react";

interface TableColumn {
  name: string;
  column: string;
  class: string;
}

const tableColumns: TableColumn[] = [
  {
    name: "id",
    column: "id",
    class: "w-[144px] justify-start",
  },
  {
    name: "회사명",
    column: "회사명",
    class: "w-[144px] flex-1 px-8 justify-start",
  },
  {
    name: "지원날짜",
    column: "지원날짜",
    class: "w-[144px] px-8 justify-start",
  },
  {
    name: "가입날짜",
    column: "가입날짜",
    class: "w-[144px] px-8 justify-start",
  },
  {
    name: "검수여부",
    column: "검수여부",
    class: "w-[144px] px-8 justify-center",
  },
];

const TableHeader = () => {
  return (
    <div className="flex">
      {tableColumns.map((item) => {
        return (
          <div
            className={`h-14 bg-white border-b border-gray-300 px-8 py-[19px] flex items-center ${item.class}`}
            key={item.name}
          >
            <div
              className="whitespace-nowrap justify-center items-center inline-flex 
                textColor-mid-emphasis"
            >
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TableHeader;
