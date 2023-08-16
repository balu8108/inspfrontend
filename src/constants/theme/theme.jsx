import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const scheme = {
  colors: {
    pallete: {
      backgroundLightBlue: "#F1F5F8",
      lightGreen: "#C1E3B6",
      primaryBlue: "#3C8DBC",
      mainTextColor: "#2C3329",
      secondaryTextColor: "rgba(44, 51, 41, 0.47)",
      lightGrey: "rgba(241, 245, 248, 1)",
    },
  },
};
const styles = {
  global: (props) => ({
    body: {},
  }),
};
const theme = extendTheme({
  ...scheme,
  styles,
  config,
  fonts: {
    body: "inter",
    heading: "inter",
  },
});
export default theme;
