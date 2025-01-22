import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Grid,
  GridItem,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
  HStack,
  Flex,
  ListItem,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRedo, FaSync } from "react-icons/fa";

interface ColorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  min?: number;
  max?: number;
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  value,
  onChange,
  error,
  min = 0,
  max = 100,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={`Enter ${label} %`}
      min={min}
      max={max}
    />
    {error && <Text color="red.500">{error}</Text>}
  </FormControl>
);

function ColorMixingTool() {
  const [cyan, setCyan] = useState(0);
  const [magenta, setMagenta] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [black, setBlack] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = (
    value: number,
    field: string,
    min: number,
    max: number,
  ) => {
    if (isNaN(value) || value < min || value > max) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${field} must be between ${min} and ${max}.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputChange = (
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    field: string,
    min: number,
    max: number,
  ) => {
    if (value < min || value > max) return;
    setter(value);
    validateInput(value, field, min, max);
  };

  const cmykToHex = (c: number, m: number, y: number, k: number) => {
    const { r, g, b } = cmykToRgb(c, m, y, k);
    const hex = (n: number) =>
      Math.round(n).toString(16).padStart(2, "0").toUpperCase();
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  };

  const hsbToRgb = (h: number, s: number, b: number) => {
    const saturation = s / 100;
    const brightness = b / 100;
    const c = brightness * saturation;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = brightness - c;

    let r = 0,
      g = 0,
      blue = 0;
    if (h < 60) [r, g, blue] = [c, x, 0];
    else if (h < 120) [r, g, blue] = [x, c, 0];
    else if (h < 180) [r, g, blue] = [0, c, x];
    else if (h < 240) [r, g, blue] = [0, x, c];
    else if (h < 300) [r, g, blue] = [x, 0, c];
    else [r, g, blue] = [c, 0, x];

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      blue: Math.round((blue + m) * 255),
    };
  };

  const rgbToCmyk = (r: number, g: number, blue: number) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = blue / 255;

    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = (1 - rNorm - k) / (1 - k) || 0;
    const m = (1 - gNorm - k) / (1 - k) || 0;
    const y = (1 - bNorm - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  const recalculateFromHsb = () => {
    const { r, g, blue } = hsbToRgb(hue, saturation, brightness);
    const recalculatedCmyk = rgbToCmyk(r, g, blue);
    setCyan(recalculatedCmyk.c);
    setMagenta(recalculatedCmyk.m);
    setYellow(recalculatedCmyk.y);
    setBlack(recalculatedCmyk.k);
  };

  const totalInput = cyan + magenta + yellow + black + medium;
  const totalInk = cyan + magenta + yellow + black;

  const retarder = totalInk * 0.15;
  const totalWeight = totalInput + retarder;

  const calculateGrams = (percentage: number) =>
    (percentage / totalInput) * 100 || 0;

  const cyanGram = calculateGrams(cyan);
  const magentaGram = calculateGrams(magenta);
  const yellowGram = calculateGrams(yellow);
  const blackGram = calculateGrams(black);
  const mediumGram = calculateGrams(medium);
  const retarderGram = retarder;

  const { r, g, b } = cmykToRgb(cyan, magenta, yellow, black);
  const rgbColor = `rgb(${r}, ${g}, ${b})`;
  const hexColor = cmykToHex(cyan, magenta, yellow, black);

  const resetInputs = () => {
    setCyan(0);
    setMagenta(0);
    setYellow(0);
    setBlack(0);
    setMedium(0);
    setHue(0);
    setSaturation(0);
    setBrightness(0);
    setErrors({});
  };

  return (
    <Box px={{ base: "4", md: "16" }} py={16} mx={"auto"}>
      <Heading as="h1" mb={4} fontSize={{ base: "5xl", md: "7xl" }}>
        Pintone
      </Heading>
      <Flex p={4} mb={8} gap={6} justify="space-between" wrap="wrap">
        <Box w={{ base: "100%", md: "126px" }}>
          <Text fontSize="md">Version 1.0 Beta</Text>
        </Box>
        <Box w={{ base: "100%", md: "md" }}>
          <Text fontSize="md" fontWeight="semibold" lineHeight="normal">
            Pintone implies a focus on efficiency and accuracy in the
            pre-printing phase, making it an ideal tool for artists, designers,
            and print professionals who need to mix colors precisely and get
            their materials ready for production.
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "xl" }}>
          <UnorderedList fontSize="sm" spacing={2}>
            <ListItem>
              Enter percentages for Cyan, Magenta, Yellow, Black, and Medium.
            </ListItem>
            <ListItem>
              Provide values for Hue (0-360 degrees), Saturation (0-100%), and
              Brightness (0-100%).
            </ListItem>
            <ListItem>
              Use the "Recalculate from HSB" button to update CMYK values.
            </ListItem>
            <ListItem>
              Check the weight in grams for each component (Cyan, Magenta,
              Yellow, Black, Medium, Retarder).
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      <Divider />

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
        gap={4}
        mt={10}
        p={4}
      >
        {/* CMYK Inputs */}
        <GridItem colStart={1} colSpan={{ base: 1, md: 2 }}>
          <Box mb={6} p={4} borderWidth={1}>
            <Heading as="h2" size="sm" mb={4}>
              CMYK Inputs
            </Heading>
            <Stack gap={4}>
              {[
                { label: "Cyan", value: cyan, setter: setCyan },
                { label: "Magenta", value: magenta, setter: setMagenta },
                { label: "Yellow", value: yellow, setter: setYellow },
                { label: "Black", value: black, setter: setBlack },
                { label: "Medium", value: medium, setter: setMedium },
              ].map(({ label, value, setter }) => (
                <ColorInput
                  key={label}
                  label={label}
                  value={value}
                  onChange={(val) =>
                    handleInputChange(val, setter, label, 0, 100)
                  }
                  error={errors[label]}
                />
              ))}
            </Stack>
          </Box>
        </GridItem>
        <GridItem colStart={{ base: 1, md: 3 }} colSpan={{ base: 1, md: 2 }}>
          <Box mb={6} p={4} borderWidth={1}>
            {/* HSB Inputs */}
            <Heading as="h2" size="sm" mb={4}>
              HSB Inputs
            </Heading>
            <Stack gap={4}>
              {[
                { label: "Hue", value: hue, setter: setHue, min: 0, max: 360 },
                {
                  label: "Saturation",
                  value: saturation,
                  setter: setSaturation,
                  min: 0,
                  max: 100,
                },
                {
                  label: "Brightness",
                  value: brightness,
                  setter: setBrightness,
                  min: 0,
                  max: 100,
                },
              ].map(({ label, value, setter, min, max }) => (
                <ColorInput
                  key={label}
                  label={label}
                  value={value}
                  onChange={(val) =>
                    handleInputChange(val, setter, label, min, max)
                  }
                  error={errors[label]}
                  min={min}
                  max={max}
                />
              ))}
            </Stack>
            <HStack mt={6}>
              <IconButton
                aria-label="Reset"
                icon={<FaRedo />}
                onClick={resetInputs}
              />
              <IconButton
                aria-label="Recalculate from HSB"
                icon={<FaSync />}
                onClick={recalculateFromHsb}
              />
            </HStack>
            <Box mt={7} fontSize="sm">
              <Text color="gray">
                Recalculate HSB, which is often more intuitive for human
                understanding of color.
              </Text>
            </Box>
          </Box>
        </GridItem>

        {/* Color Preview */}
        <GridItem colStart={{ base: 1, md: 5 }} colSpan={{ base: 1, md: 4 }}>
          <Box borderWidth={1}>
            <Box
              p={4}
              height={"62vh"}
              bg={rgbColor}
              fontSize="4xl"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              onClick={() => navigator.clipboard.writeText(hexColor)}
            >
              <Text color="gray" mixBlendMode="difference">
                {" "}
                {hexColor}
              </Text>

              <Box fontSize={"sm"} color="gray" mixBlendMode="difference">
                <Text>
                  <strong>Hue:</strong> {hue.toFixed(0)}°
                </Text>
                <Text>
                  <strong>Saturation:</strong> {saturation.toFixed(0)}%
                </Text>
                <Text>
                  <strong>Brightness:</strong> {brightness.toFixed(0)}%
                </Text>
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Results */}
        <GridItem colStart={{ base: 1, md: 9 }} colSpan={{ base: 1, md: 4 }}>
          <Box p={4} borderWidth={1}>
            <Heading as="h2" size="sm" mb={4}>
              Result
            </Heading>
            <Table variant="simple" size="sm" mt={6}>
              <Thead>
                <Tr>
                  <Th>Component</Th>
                  <Th isNumeric>Weight (gram)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Cyan</Td>
                  <Td isNumeric>{cyanGram.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>Magenta</Td>
                  <Td isNumeric>{magentaGram.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>Yellow</Td>
                  <Td isNumeric>{yellowGram.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>Black</Td>
                  <Td isNumeric>{blackGram.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>Medium</Td>
                  <Td isNumeric>{mediumGram.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>Retarder</Td>
                  <Td isNumeric>{retarderGram.toFixed(2)}</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total Weight</Th>
                  <Th isNumeric>{totalWeight.toFixed(2)}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ColorMixingTool;
