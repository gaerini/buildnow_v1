"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const InitalLoadActiveUsers = () => {
  useEffect(() => {
    sendGAEvent({ event: "cookieDomain", value: "none" });
  }, []);
  return "";
};

export default InitalLoadActiveUsers;
