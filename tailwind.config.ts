import { basename } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: {
            original: "#2F4252", // color-primary-navy-original
            "100": "#F1F4F6",
            "200": "#D6DEE5",
            "300": "#BCC8D3",
            "400": "#A3B2C1",
            "500": "#8C9DAE",
            "600": "#75899A",
            "700": "#617485",
            "800": "#3E4D5B",
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
          blue: {
            original: "#5085EA", // color-secondary-blue-original
            "100": "#F1F3FF",
            "200": "#D3DBFF",
            "300": "#B3C4FF",
            "400": "#93AEFF",
            "500": "#7298F6",
            "600": "#5184E7",
            "700": "#3270D2",
            "800": "#014A97",
          },
          green: {
            original: "#4ECC8F",
          },
          red: {
            original: "#FA9776",
          },
        },
        danger: {
          red: "#F52C00", // color-danger-red
          alpha10: "rgba(245, 44, 0, 0.1000)",
        },
      },
      fontSize: {
        "title-1": ["28px", "34px"], // text-title-1
        "title-2": ["24px", "32px"],
        "subTitle-1": ["20px", "28px"],
        "subTitle-2": ["18px", "28px"],
        "paragraph-l": ["16px", "24px"],
        "paragraph-m": ["14px", "20px"],
        "paragraph-s": ["12px", "16px"],
        caption: ["12px", "16px"],
      },
      boxShadow: {
        s: "0px 4px 10px rgba(0, 0, 0, 0.20)", // shadow-s
        m: "0px 8px 18px rgba(0, 0, 0, 0.20)",
        l: "0px 16px 30px rgba(0, 0, 0, 0.20)",
      },
      borderRadius: {
        s: "4px", // rounded-s
        m: "8px",
        l: "16px",
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
