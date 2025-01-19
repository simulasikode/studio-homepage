import React, { useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

const ColorMixer = () => {
  const [cyan, setCyan] = useState(0);
  const [magenta, setMagenta] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [black, setBlack] = useState(0);
  const [medium, setMedium] = useState(0);

  const [total, setTotal] = useState(0);
  const [result, setResult] = useState({
    cyanContribution: 0,
    magentaContribution: 0,
    yellowContribution: 0,
    blackContribution: 0,
    mediumContribution: 0,
    cyanPercentage: 0,
    magentaPercentage: 0,
    yellowPercentage: 0,
    blackPercentage: 0,
    mediumPercentage: 0,
    hue: 0,
    saturation: 0,
    brightness: 0,
    totalColor: 0,
    hexColor: "",
  });

  // Input handler
  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
      setter(parsedValue);
    }
  };

  // CMYK to RGB conversion
  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  // RGB to HSB conversion
  const rgbToHsb = (r: number, g: number, b: number) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
      if (max === r) {
        hue = (g - b) / delta;
      } else if (max === g) {
        hue = (b - r) / delta + 2;
      } else {
        hue = (r - g) / delta + 4;
      }
      hue = (hue * 60) % 360;
      if (hue < 0) hue += 360;
    }

    const saturation = max === 0 ? 0 : (delta / max) * 100;
    const brightness = (max / 255) * 100;

    return { hue, saturation, brightness };
  };

  // RGB to HEX conversion
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (num: number) => {
      const hex = num.toString(16).padStart(2, "0");
      return hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Calculate and update result
  const handleCalculate = () => {
    const totalWeight = cyan + magenta + yellow + black + medium;
    setTotal(totalWeight);

    if (totalWeight === 0) {
      return;
    }

    const cyanPercentage = (cyan / totalWeight) * 100;
    const magentaPercentage = (magenta / totalWeight) * 100;
    const yellowPercentage = (yellow / totalWeight) * 100;
    const blackPercentage = (black / totalWeight) * 100;
    const mediumPercentage = (medium / totalWeight) * 100;

    const totalColor =
      cyanPercentage +
      magentaPercentage +
      yellowPercentage +
      blackPercentage +
      mediumPercentage;

    const cyanContribution = (cyanPercentage / 100) * totalColor;
    const magentaContribution = (magentaPercentage / 100) * totalColor;
    const yellowContribution = (yellowPercentage / 100) * totalColor;
    const blackContribution = (blackPercentage / 100) * totalColor;
    const mediumContribution = (mediumPercentage / 100) * totalColor;

    const rgb = cmykToRgb(cyan / 100, magenta / 100, yellow / 100, black / 100);
    const { hue, saturation, brightness } = rgbToHsb(rgb.r, rgb.g, rgb.b);
    const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);

    setResult({
      cyanContribution,
      magentaContribution,
      yellowContribution,
      blackContribution,
      mediumContribution,
      cyanPercentage,
      magentaPercentage,
      yellowPercentage,
      blackPercentage,
      mediumPercentage,
      hue,
      saturation,
      brightness,
      totalColor,
      hexColor,
    });
  };

  // Calculate RGB based on CMYK values
  const rgb = cmykToRgb(cyan / 100, magenta / 100, yellow / 100, black / 100);
  const backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr", // 1 column on mobile
    md: "1fr 1fr", // 2 columns on medium screens and up
    lg: "1fr 1fr 1fr", // 3 columns on large screens and up
  });

  return (
    <Grid
      templateColumns={gridTemplateColumns}
      gap={14}
      py={32}
      px={{ base: "4", md: "32" }}
    >
      {/* First Grid: Calculator Input */}
      <GridItem>
        <Table>
          <Tbody>
            <Tr>
              <Td>Cyan</Td>
              <Td isNumeric>
                <Input
                  border="1px solid"
                  placeholder="Cyan"
                  value={cyan}
                  onChange={(e) => handleInputChange(e.target.value, setCyan)}
                  width="80px"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Magenta</Td>
              <Td isNumeric>
                <Input
                  border="1px solid"
                  placeholder="Magenta"
                  value={magenta}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setMagenta)
                  }
                  width="80px"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Yellow</Td>
              <Td isNumeric>
                <Input
                  border="1px solid"
                  placeholder="Yellow"
                  value={yellow}
                  onChange={(e) => handleInputChange(e.target.value, setYellow)}
                  width="80px"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Black</Td>
              <Td isNumeric>
                <Input
                  border="1px solid"
                  placeholder="Black"
                  value={black}
                  onChange={(e) => handleInputChange(e.target.value, setBlack)}
                  width="80px"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Medium</Td>
              <Td isNumeric>
                <Input
                  border="1px solid"
                  placeholder="Medium"
                  value={medium}
                  onChange={(e) => handleInputChange(e.target.value, setMedium)}
                  width="80px"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button onClick={handleCalculate} mt={4}>
          Calculate
        </Button>
      </GridItem>

      {/* Second Grid: Color Details (HSB) */}
      <GridItem bg={backgroundColor} p={4} borderRadius="md">
        <Text fontSize="lg">Color Details (HSB):</Text>
        <Text>Hue: {result.hue.toFixed(2)}°</Text>
        <Text>Saturation: {result.saturation.toFixed(2)}%</Text>
        <Text>Brightness: {result.brightness.toFixed(2)}%</Text>
        <Text>Hex Color: {result.hexColor}</Text>
      </GridItem>

      {/* Third Grid: Calculator Summary */}
      <GridItem>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Calculation Summary:
        </Text>
        <Text>Total Weight: {total.toFixed(2)} gram</Text>
        <Text>
          Cyan: {result.cyanPercentage.toFixed(2)}%
          <br />
          Magenta: {result.magentaPercentage.toFixed(2)}%
          <br />
          Yellow: {result.yellowPercentage.toFixed(2)}%
          <br />
          Black: {result.blackPercentage.toFixed(2)}
          %
          <br />
          Medium:
          {result.mediumPercentage.toFixed(2)}%
        </Text>
        <Text fontSize="lg" fontWeight="bold" mt={4} mb={2}>
          {" "}
          Calculated Contributions in Grams:
        </Text>
        <Text>Cyan: {result.cyanContribution.toFixed(2)} gram</Text>
        <Text>Magenta: {result.magentaContribution.toFixed(2)} gram</Text>
        <Text>Yellow: {result.yellowContribution.toFixed(2)} gram</Text>
        <Text>Black: {result.blackContribution.toFixed(2)} gram</Text>
        <Text>Medium: {result.mediumContribution.toFixed(2)} gram</Text>
      </GridItem>
    </Grid>
  );
};

export default ColorMixer;
