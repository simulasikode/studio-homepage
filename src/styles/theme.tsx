import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'IBM Plex Sans', sans-serif`,
    body: `'IBM Plex Sans', sans-serif`,
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      html: {
        overscrollBehavior: "none",
      },
      body: {
        overscrollBehavior: "none",
        bg:
          {
            light: "#fffcf5",
            dark: "#2d2d2d",
            red: "#fffcf5", // Set color for the 'red' mode
            blue: "#fffcf5",
            green: "#fffcf5",
          }[props.colorMode] || "#1d1d1d", // Default color fallbackprops.colorMode
        color:
          {
            light: "#1d1d1d",
            dark: "#fffcf5",
            red: "#cc4339", // Set color for the 'red' mode
            blue: "#0023FF",
            green: "#5BCA41",
          }[props.colorMode] || "#1d1d1d", // Default color fallback
      },
    }),
  },
  fontSizes: {
    "5xl": "4rem",
    "6xl": "8rem",
    "7xl": "10rem",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
  },
});

export default theme;
