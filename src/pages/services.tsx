import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Button,
  Text,
  Select,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Table,
  Tr,
  Td,
  Tbody,
  Heading,
  useColorMode,
  Image,
  Link,
} from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

// Define constants for paper sizes and their prices
const PAPER_SIZES = ["B5", "A4", "B4", "A3", "B3", "A2", "Poster"];
const PAPER_PRICES: Record<string, number> = {
  B5: 2500,
  A4: 3000,
  B4: 5000,
  A3: 6000,
  B3: 10000,
  A2: 12000,
  Poster: 15000,
};

const ScreenPrintingCalculator = () => {
  const [paperSize, setPaperSize] = useState("");
  const [colorCount, setColorCount] = useState(0);
  const [totalPrint, setTotalPrint] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [costPerSheet, setCostPerSheet] = useState(0);

  const material = 66863;
  const production = 369262;
  const overhead = 123090;
  const labor = 7200;
  const colorPrice = 12325;
  const emulsionBasePrice = 50828;

  const handlePaperSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaperSize(event.target.value);
  };

  const calculateCosts = () => {
    console.log("Selected Paper Size:", paperSize); // Debugging line

    if (totalPrint <= 0 || totalPrint < 15 || !paperSize || colorCount <= 0) {
      setTotalCost(0);
      setCostPerSheet(0);

      return;
    }
    // Ensure paperSize is valid
    const paperPrice = PAPER_PRICES[paperSize];
    if (paperPrice === undefined) {
      console.error("Invalid paper size selected.");
      return;
    }

    const totalFixedCosts = material + production + overhead + labor;
    const totalColorCost = colorPrice * colorCount;
    const totalEmulsionCost = emulsionBasePrice * colorCount;

    const calculatedCostPerSheet =
      ((totalFixedCosts + paperPrice + totalColorCost + totalEmulsionCost) *
        3.8) /
      totalPrint;
    const calculatedTotalCost = calculatedCostPerSheet * totalPrint;

    setCostPerSheet(calculatedCostPerSheet);
    setTotalCost(calculatedTotalCost);
  };

  const formatCurrency = (value: number | string): string => {
    if (typeof value === "number") {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "IDR",
      });
    } else if (typeof value === "string") {
      const numberValue = parseFloat(value.replace(/,/g, ""));
      if (!isNaN(numberValue)) {
        return numberValue.toLocaleString("en-US", {
          style: "currency",
          currency: "IDR",
        });
      }
    }
    return "IDR 0";
  };

  const { colorMode } = useColorMode();

  const imageSrc = {
    light: "/papersize.svg", // Image for Light mode
    dark: "/papersize_white.svg", // Image for Dark mode
    red: "/papersize_red.svg", // Image for Red mode
    blue: "/papersize_blue.svg", // Image for Blue mode
    green: "/papersize_green.svg", // Image for Green mode
  }[colorMode]; // Default image

  return (
    <Box px={{ base: "4", md: "32" }} py={16}>
      <Heading as="h1" fontSize={{ base: "5xl", md: "6xl" }} mb={6}>
        Estimated Price{" "}
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <GridItem>
          <Text mb={2}>
            We doing hand pulled screen printing on paper using waterbase ink.
            For regular paper, we offer Fedrigoni ARENA 300gsm. Or you can
            request what kind paper you like.
          </Text>
          <Text mb={2}>
            You can use the calculator to find out the printing costs according
            to the size you want.
          </Text>{" "}
          <Text>
            <Link
              href="https://forms.fillout.com/t/pFE4XxyiXGus"
              isExternal
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Request a Quote here
            </Link>
          </Text>
          <Stack gap={4} align="flex-start" mt={8} maxW={320}>
            <FormControl>
              <FormLabel>Paper Size</FormLabel>
              <Select
                placeholder="Select paper size"
                value={paperSize}
                onChange={handlePaperSizeChange}
              >
                {PAPER_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Our standard paper using Fedrigoni 300 GSM{" "}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Number of Color</FormLabel>
              <Input
                type="number"
                value={colorCount}
                onChange={(e) => setColorCount(parseInt(e.target.value) || 0)}
                placeholder="Enter number of colors"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Print</FormLabel>
              <Input
                type="number"
                value={totalPrint}
                onChange={(e) => setTotalPrint(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <Button
              onClick={calculateCosts}
              mb={4}
              leftIcon={<FaCalculator />}
              isDisabled={totalPrint < 15 || !paperSize || colorCount <= 0}
            >
              Calculate
            </Button>
          </Stack>
          {totalCost > 0 && (
            <>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Paper Size: {paperSize}</Td>
                  </Tr>
                  <Tr>
                    <Td>Number of Colors: {colorCount}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">
                      Cost per Sheet: IDR {formatCurrency(costPerSheet)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">
                      Total Cost for {totalPrint} Prints: IDR{" "}
                      {formatCurrency(totalCost)}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </>
          )}
          {totalCost === 0 && totalPrint > 0 && (
            <Text color="red.500">
              Invalid input. Please check your values.
            </Text>
          )}
          {totalPrint < 15 && (
            <Text color="blue.500">Minimum running print is 15 sheets.</Text>
          )}
        </GridItem>

        <GridItem display="flex" justifyContent="center">
          <Image
            src={imageSrc}
            alt="Screen Printing"
            width={{ base: "100%", md: "100%" }}
            height={{ base: "100%", md: "100%" }}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ScreenPrintingCalculator;
