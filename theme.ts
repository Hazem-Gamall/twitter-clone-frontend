import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const styles = {
  global: {
    body: {
      bg: "black",
      color: "white",
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  colors: {
    twitter: {
      "50": "#E7F5FE",
      "100": "#BBE3FB",
      "200": "#90D1F9",
      "300": "#65BFF6",
      "400": "#39ADF4",
      "500": "#0E9BF1",
      "600": "#0B7CC1",
      "700": "#085D91",
      "800": "#063E60",
      "900": "#031F30",
    },
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      650: "#383838",
      700: "#202020",
      800: "#121212",
      900: "#0f0f0f",
    },
  },
});

export default theme;
