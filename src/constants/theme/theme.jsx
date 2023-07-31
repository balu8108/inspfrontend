import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const scheme = { colors: {} };
const styles = {
  global: (props) => ({
    body: {},
  }),
};
const theme = extendTheme({ ...scheme, styles, config });
export default theme;
