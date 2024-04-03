"use client";
import React from "react";

const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
  return (
    <iframe
      src={url}
      style={{ width: "100%", height: "100%" }}
      frameBorder="0"
    ></iframe>
  );
};

export default PDFViewer;
