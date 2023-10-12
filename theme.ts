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
  },
});

export default theme;
