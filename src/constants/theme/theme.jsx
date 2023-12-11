import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const scheme = {
  colors: {
    pallete: {
      redBtnColor: "rgba(246, 63, 74, 1)",
      backgroundLightBlue: "#F1F5F8",
      lightGreen: "#C1E3B6",
      primaryBlue: "#3C8DBC",
      primaryBlueLight: "rgba(60, 141, 188, 0.8)",
      mainTextColor: "#2C3329",
      btnTextColor: "rgba(107, 104, 112, 1)",
      secondaryTextColor: "rgba(44, 51, 41, 0.47)",
      lightGrey: "rgba(241, 245, 248, 1)",
      eventLightGreen: "rgba(193, 227, 182, 1)",
      eventLightBlue: "rgba(183, 224, 230, 1)",
      extraTextLight: "rgba(58, 53, 65, 0.87)",
      lightBorderColor: "rgba(58, 53, 65, 0.23)",
      notStartedBtnColor: "rgba(255, 89, 89, 1)",
      ongoingBtnColor: "rgba(193, 227, 182, 1)",
      scheduledBtnColor: "#3C8DBC",
      finishedBtnColor: "rgba(232, 232, 232, 1)",
      notConductedBtnColor: "rgba(196, 196, 196, 1)",
      outerBackground: "rgba(232, 242, 249, 1)",
      innerBackground: "white",
      innerBoxShadow: "none",
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
