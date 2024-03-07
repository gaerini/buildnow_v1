import { basename } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./common/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontFamily: {
      Pretendard: ["Pretendard"],
    },
    extend: {
      colors: {
        primary: {
          navy: {
            original: "#2F4252", // primary-navy-original
            "100": "#F1F4F6",
            "200": "#D6DEE5",
            "300": "#BCC8D3",
            "400": "#A3B2C1",
            "500": "#8C9DAE",
            "600": "#75899A",
            "700": "#617485",
            "800": "#3E4D5B",
          },
          blue: {
            original: "#5085EA", // secondary-blue-original
            "100": "#F1F3FF",
            "200": "#D3DBFF",
            "300": "#B3C4FF",
            "400": "#93AEFF",
            "500": "#7298F6",
            "600": "#5184E7",
            "700": "#3270D2",
            "800": "#014A97",
          },
          neutral: {
            black: "#000000",
            white: "#FFFFFF",
            "100": "#F3F3F3",
            "200": "#DDDDDD",
            "300": "#C6C6C6",
            "400": "#B0B0B0",
            "500": "#9B9B9B",
            "600": "#868686",
            "700": "#727272",
            "800": "#4B4B4B",
            alpha20: "rgba(0, 0, 0, 0.2000)",
          },
        },
        secondary: {
          green: {
            original: "#4ECC8F",
            "100": "#E9F7EE",
            "200": "#BDE6CE",
            "300": "#93D5AF",
            "400": "#69C293",
            "500": "#3FAE79",
            "600": "#029A62",
            "700": "#00854E",
            "800": "#00592F",
          },
          orange: {
            original: "#FF8226",
            "100": "#FFF0E4",
            "200": "#FFD1AF",
            "300": "#FFB37F",
            "400": "#FD9754",
            "500": "#ED7D2C",
            "600": "#D96400",
            "700": "#A53D00",
            "800": "#872E00",
          },
          red: {
            original: "#F52C00",
            "100": "#FFDECE",
            "200": "#FFA580",
            "300": "#FF8156",
            "400": "#FF5D31",
            "500": "#E31200",
            "600": "#C50000",
            "700": "#A20000",
            "800": "#7D0000",
            alpha10: "rgba(245, 44, 0, 0.1000)",
          },
        },
      },
      fontSize: {
        "title-28": ["28px", "40px"], // text-title-28
        "title-24": ["24px", "32px"],
        "subTitle-20": ["20px", "28px"],
        "subTitle-18": ["18px", "28px"],
        "paragraph-16": ["16px", "24px"],
        "paragraph-14": ["14px", "20px"],
        "paragraph-12": ["12px", "16px"],
        caption: ["12px", "16px"],
      },
      boxShadow: {
        xs: "0px 2px 5px rgba(0, 0, 0, 0.20)", // shadow-xs
        s: "0px 4px 10px rgba(0, 0, 0, 0.20)", // shadow-s
        m: "0px 8px 18px rgba(0, 0, 0, 0.20)",
        l: "0px 16px 30px rgba(0, 0, 0, 0.20)",
      },
      borderRadius: {
        s: "4px", // rounded-s
        m: "8px",
        l: "16px",
      },
      padding: {
        "2xs": "2px 10px",
        xs: "4px 10px",
        s: "4px 16px", // p-s
        m: "8px 16px",
        l: "16px 24px",
        xl: "16px 32px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
