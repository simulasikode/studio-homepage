import { useColorMode, Button, Icon, Box } from "@chakra-ui/react";
import { MdOutlineGradient } from "react-icons/md";

const ColorModeSwitcher = () => {
  const { colorMode, setColorMode } = useColorMode();

  const switchToNextColorMode = () => {
    const modes = ["light", "dark", "red", "blue", "green"];
    const nextMode = modes[(modes.indexOf(colorMode) + 1) % modes.length];
    setColorMode(nextMode);
  };

  const modeIcons = {
    light: MdOutlineGradient,
    dark: MdOutlineGradient,
    red: MdOutlineGradient,
    blue: MdOutlineGradient,
    green: MdOutlineGradient,
  };

  const iconColors = {
    light: "#1d1d1d",
    dark: "#e8e5dc",
    red: "#cc4339",
    blue: "blue.solid",
    green: "green.solid",
  };

  return (
    <Box>
      <Button onClick={switchToNextColorMode} variant="plain">
        <Icon
          as={modeIcons[colorMode]}
          color={iconColors[colorMode]}
          boxSize={6}
        />
      </Button>
    </Box>
  );
};

export default ColorModeSwitcher;
