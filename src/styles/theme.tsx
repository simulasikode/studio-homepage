import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Set the default mode to dark
    useSystemColorMode: false, // Disable using the system's color mode preference
  },
  fonts: {
    heading: `'IBM Plex Sans', sans-serif`, // Set the heading font
    body: `'IBM Plex Sans', sans-serif`, // Set the body font
  },
  colors: {
    dark: {
      bg: "#121212", // Dark background for dark mode
      color: "#EAEAEA", // Lighter text color for better contrast in dark mode
    },
    light: {
      bg: "#FFFFFF", // Light background for light mode
      color: "#333333", // Dark text for better contrast in light mode
    },
  },
  styles: {
    global: {
      html: {
        overscrollBehavior: "none", // Disable overscroll globally
      },
      body: {
        overscrollBehavior: "none", // Ensure no overscroll on the body
      },
    },
  },
  fontSizes: {
    "5xl": "4rem", // Custom font size larger than 4xl
    "6xl": "8rem", // You can go even larger
    "7xl": "10rem", // Custom size if you need something extremely large
  },
  components: {
    Drawer: {
      // You can also customize the Drawer specifically
      baseStyle: {
        overlay: {
          bg: "rgba(0, 0, 0, 0.4)", // Dark overlay when Drawer is open
        },
        content: {
          bg: "gray.800", // Set the background color of the Drawer
          color: "white", // Set text color for content
        },
      },
    },
  },
  breakpoints: {
    sm: "30em", // Small screens start from 480px
    md: "48em", // Medium screens start from 768px
    lg: "62em", // Large screens start from 992px
    xl: "80em", // Extra large screens start from 1280px
  },
});

export default theme;
