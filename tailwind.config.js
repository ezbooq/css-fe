/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Urbanist"],
      },
      fontSize: {
        xm: ["12px", { lineHeight: "1.6" }],
        sm: ["14px", { lineHeight: "1.6" }],
        base: ["16px", { lineHeight: "1.2" }],
        lg: ["18px", { lineHeight: "1.2" }],
        xl: ["20px", { lineHeight: "1.2" }],
        "2xl": ["22px", { lineHeight: "1.2" }],
        "3xl": ["24px", { lineHeight: "1.2" }],
        "4xl": ["32px", { lineHeight: "1.2" }],
      },
      fontWeight: {
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        light: {
          primary: {
            DEFAULT: "#22AD01",
            light: "#7FD76A",
            dark: "#268F0C",
          },
          secondary: {
            DEFAULT: "#E6E6E6",
            light: "#C0C4CA",
            dark: "#E0E0E0",
          },
          base: {
            DEFAULT: "#F2F2F2",
            light: "#F9F9F9",
            dark: "#414141",
          },
          background: "#FAFAFA",
          surface: "#FFFFFF",
        },
        status: {
          green: "#CCEDC5",
          red: "#FFE0DC",
          yellow: "#FFF3D3",
          blue: "#E7ECFF",
          purple: "#E5D9FF",
          orange: "#F68319",
          basic: "#E7E7E7",
        },
        typography: {
          primary: {
            DEFAULT: "#22AD01",
            light: "#FFFFFF",
            dark: "#26AE0633",
          },
          secondary: {
            DEFAULT: "#2E2E2E",
            light: "#7E7E7E",
            dark: "#393939",
          },
          status: {
            green: "#22AD01",
            red: "#FF472E",
            yellow: "#CC9300",
            blue: "#423EEA",
            purple: "#6734F8",
            orange: "#FF7658",
          },
        },
      },
    },
  },
  plugins: [],
};
