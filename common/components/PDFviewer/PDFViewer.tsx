"use client";
import React from "react";

const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
  return (
    <iframe
      src={url}
      className="w-full min-w-[400px] h-full"
      frameBorder="0"
    ></iframe>
  );
};

export default PDFViewer;
