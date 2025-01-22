import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Input,
  Button,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Box,
  Heading,
} from "@chakra-ui/react";
import { MdCalculate } from "react-icons/md";

interface ColorResult {
  cyanPercentage: number;
  magentaPercentage: number;
  yellowPercentage: number;
  blackPercentage: number;
  mediumPercentage: number;
  cyanGram: number;
  magentaGram: number;
  yellowGram: number;
  blackGram: number;
  mediumGram: number;
  hue: number;
  saturation: number;
  brightness: number;
  hexColor: string;
}

const ColorMixer = () => {
  const [cyan, setCyan] = useState<number>(0);
  const [magenta, setMagenta] = useState<number>(0);
  const [yellow, setYellow] = useState<number>(0);
  const [black, setBlack] = useState<number>(0);
  const [medium, setMedium] = useState<number>(0);

  const [result, setResult] = useState<ColorResult>({
    cyanPercentage: 0,
    magentaPercentage: 0,
    yellowPercentage: 0,
    blackPercentage: 0,
    mediumPercentage: 0,
    cyanGram: 0,
    magentaGram: 0,
    yellowGram: 0,
    blackGram: 0,
    mediumGram: 0,
    hue: 0,
    saturation: 0,
    brightness: 0,
    hexColor: "#FFFFFF", // Default white color
  });

  const blendColors = (
    foreground: string,
    background: string,
    alpha: number,
  ) => {
    const fg = {
      r: parseInt(foreground.substring(1, 3), 16),
      g: parseInt(foreground.substring(3, 5), 16),
      b: parseInt(foreground.substring(5, 7), 16),
    };

    const bg = {
      r: parseInt(background.substring(1, 3), 16),
      g: parseInt(background.substring(3, 5), 16),
      b: parseInt(background.substring(5, 7), 16),
    };

    const r = Math.round(alpha * fg.r + (1 - alpha) * bg.r);
    const g = Math.round(alpha * fg.g + (1 - alpha) * bg.g);
    const b = Math.round(alpha * fg.b + (1 - alpha) * bg.b);

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
  };

  const [isInputValid, setIsInputValid] = useState(true);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
    isMedium: boolean = false,
    isTransparency: boolean = false,
  ) => {
    // Replace comma with period to handle both ',' and '.' as decimal separators
    const normalizedValue = value.replace(",", ".");

    // Parse the normalized string to a float
    const parsedValue = parseFloat(normalizedValue);

    // Allow empty input or valid number within range 0 to 100
    if (isTransparency && parsedValue >= 0 && parsedValue <= 100) {
      setter(parsedValue); // set transparency value
      setIsInputValid(true);
    } else if (
      !isTransparency &&
      !isNaN(parsedValue) &&
      parsedValue >= 0 &&
      (isMedium || parsedValue <= 100)
    ) {
      setter(parsedValue);
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };

  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  const rgbToHsb = (r: number, g: number, b: number) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
      if (max === rNorm) {
        hue = ((gNorm - bNorm) / delta) % 6;
      } else if (max === gNorm) {
        hue = (bNorm - rNorm) / delta + 2;
      } else if (max === bNorm) {
        hue = (rNorm - gNorm) / delta + 4;
      }
      hue *= 60;
      if (hue < 0) hue += 360;
    }

    const saturation = max === 0 ? 0 : (delta / max) * 100;
    const brightness = max * 100;

    return {
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      brightness: Math.round(brightness),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (num: number) => num.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase(); // Convert to uppercase
  };

  const handleCalculate = () => {
    const totalInput = cyan + magenta + yellow + black + medium;

    // Check if total input is zero to avoid division by zero
    if (totalInput === 0) {
      return;
    }
    // Normalize the medium transparency, adjusting for the reduced contribution
    const transparencyFactor = medium / totalInput; // Reduces the effect of the medium

    // Apply the transparency factor to adjust the color mix
    const adjustedCyan = cyan * transparencyFactor;
    const adjustedMagenta = magenta * transparencyFactor;
    const adjustedYellow = yellow * transparencyFactor;
    const adjustedBlack = black * transparencyFactor;
    const adjustedMedium = medium * transparencyFactor;

    // Recalculate the total input after adjusting the medium transparency
    const adjustedTotal =
      adjustedCyan +
      adjustedMagenta +
      adjustedYellow +
      adjustedBlack +
      adjustedMedium;

    // Calculate the grams of each color based on the adjusted total
    const cyanGram = (adjustedCyan / adjustedTotal) * 100;
    const magentaGram = (adjustedMagenta / adjustedTotal) * 100;
    const yellowGram = (adjustedYellow / adjustedTotal) * 100;
    const blackGram = (adjustedBlack / adjustedTotal) * 100;
    const mediumGram = (adjustedMedium / adjustedTotal) * 100;

    // Convert the adjusted CMYK values to RGB and then to HSB and hex
    const rgb = cmykToRgb(
      cyanGram / 100,
      magentaGram / 100,
      yellowGram / 100,
      blackGram / 100,
    );

    const { hue, saturation, brightness } = rgbToHsb(rgb.r, rgb.g, rgb.b);

    // Blend with white background based on transparency
    const hexColor = blendColors(
      rgbToHex(rgb.r, rgb.g, rgb.b),
      "#FFFFFF", // Background color, usually white
      1 - transparencyFactor, // Adjust alpha
    );

    // Update the result state with the adjusted values
    setResult({
      cyanPercentage: cyanGram,
      magentaPercentage: magentaGram,
      yellowPercentage: yellowGram,
      blackPercentage: blackGram,
      mediumPercentage: mediumGram,
      cyanGram,
      magentaGram,
      yellowGram,
      blackGram,
      mediumGram,
      hue,
      saturation,
      brightness,
      hexColor,
    });
  };
  return (
    <Box py={14} px={{ base: "4", md: "32" }}>
      <Heading fontSize="6xl" mb={6}>
        Pintone
      </Heading>
      <Text fontSize="lg" mb={6}>
        Pintone is your go-to app for effortless color mixing, designed
        specifically for screen printing. Forget the hassle of manually
        calculating CMYK percentages—Pintone takes care of that for you! With a
        focus on precision, it allows you to easily input your desired colors
        and outputs the perfect mix, ensuring every print comes out just right.
      </Text>

      <Grid
        templateColumns={{
          base: "1fr", // single column on mobile
          md: "1fr 1fr", // two columns on medium and larger screens
        }}
        gap={10}
        mb={10}
      >
        {/* Color Input Section */}
        <GridItem>
          <Table variant="unstyled" p={0}>
            <Tbody>
              {[
                { label: "Cyan", value: cyan, setter: setCyan },
                { label: "Magenta", value: magenta, setter: setMagenta },
                { label: "Yellow", value: yellow, setter: setYellow },
                { label: "Black", value: black, setter: setBlack },
                {
                  label: "Medium",
                  value: medium,
                  setter: setMedium,
                  isMedium: true,
                },
              ].map(({ label, value, setter, isMedium }, index) => (
                <Tr key={index} p={0}>
                  <Td p={0}>{label}</Td>
                  <Td p={2}>
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(e.target.value, setter, isMedium)
                      }
                      isInvalid={!isInputValid}
                      focusBorderColor={!isInputValid ? "red.200" : undefined}
                      size="sm"
                      w="full"
                      mb={4} // Add margin for spacing
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button
            mt={4}
            onClick={handleCalculate}
            width="full"
            gap={2}
            isDisabled={!isInputValid}
          >
            <MdCalculate /> Calculate
          </Button>
        </GridItem>

        {/* Color Feedback Section */}
        <GridItem>
          <Box
            p={4}
            borderRadius="xl"
            bg={result.hexColor}
            flexDirection="column"
            alignItems="flex-start"
            height="full"
            display="flex"
          >
            <Text mb={2} fontSize="xl" fontWeight="bold">
              {result.hexColor}
            </Text>
            <Text>Hue: {result.hue}°</Text>
            <Text>Saturation: {result.saturation}%</Text>
            <Text>Brightness: {result.brightness}%</Text>
            <Box>
              {/* Add feedback on the mix accuracy */}
              <Text mt={4} fontSize="sm">
                {result.saturation > 60
                  ? "Your mix has high saturation, which will create vibrant colors."
                  : "Your mix has low saturation, which may result in muted colors."}
              </Text>
              <Text fontSize="sm">
                {result.brightness > 50
                  ? "The color is bright and will stand out on prints."
                  : "The color is relatively dark; consider adjusting the mix for better brightness."}
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      <Grid
        templateColumns={{
          base: "1fr", // single column on mobile
          md: "1fr", // single column on larger screens
        }}
        gap={6}
      >
        <GridItem>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Calculation Results:
          </Text>
          <Text>Cyan: {result.cyanGram.toFixed(2)} gram</Text>
          <Text>Magenta: {result.magentaGram.toFixed(2)} gram</Text>
          <Text>Yellow: {result.yellowGram.toFixed(2)} gram</Text>
          <Text>Black: {result.blackGram.toFixed(2)} gram</Text>
          <Text>Medium: {result.mediumGram.toFixed(2)} gram</Text>
        </GridItem>
      </Grid>

      <Box maxW={360}>
        <Text mt={12} fontSize="sm">
          Pintone is currently in its 1.0.0 beta version, giving you an early
          look at how it can revolutionize your color mixing process. We're
          still fine-tuning features, so you might spot a few quirks along the
          way. Your feedback is super valuable as we work to make Pintone even
          better. Try it out, experiment with your colors, and let us know what
          you think—you're helping shape the future of effortless color mixing!
        </Text>
      </Box>
    </Box>
  );
};

export default ColorMixer;
