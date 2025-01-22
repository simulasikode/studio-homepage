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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
  };

  const calculateCosts = () => {
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
      if (totalPrint < 15 || !paperSize || colorCount <= 0) {
        setTotalCost(0);
        setCostPerSheet(0);
        setLoading(false);
        setErrorMessage("Please ensure all inputs are valid.");
        return;
      }

      const paperPrice = PAPER_PRICES[paperSize];
      if (paperPrice === undefined) {
        setLoading(false);
        setErrorMessage("Invalid paper size selected.");
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
      setLoading(false);
    }, 1000); // Simulate calculation delay
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "IDR",
    });
  };

  const { colorMode } = useColorMode();
  const imageSrc =
    {
      light: "/papersize.svg",
      dark: "/papersize_white.svg",
      red: "/papersize_red.svg",
      blue: "/papersize_blue.svg",
      green: "/papersize_green.svg",
    }[colorMode] || "/papersize.svg";

  return (
    <Box px={{ base: "4", md: "16" }} py={16}>
      <Heading as="h1" fontSize={{ base: "5xl", md: "7xl" }} mb={4}>
        Estimated Price
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} p={4}>
        <GridItem>
          <Text mb={2}>
            We offer hand-pulled screen printing on paper using water-based ink.
            Our standard paper is Fedrigoni ARENA 300gsm, or you can request
            custom paper.
          </Text>
          <Text mb={2}>
            Use the calculator to estimate printing costs based on your chosen
            size.
          </Text>
          <Text>
            <Link
              href="https://forms.fillout.com/t/pFE4XxyiXGus"
              isExternal
              _hover={{
                textDecoration: "underline",
                transform: "scale(1.1)",
                transformOrigin: "center",
                transition: "transform 0.2s ease-in-out",
                color: "blue.600",
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
              <FormHelperText>Standard paper: Fedrigoni 300 GSM</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Number of Colors</FormLabel>
              <Input
                type="number"
                value={colorCount}
                onChange={(e) =>
                  setColorCount(Math.max(0, parseInt(e.target.value) || 0))
                }
                placeholder="Enter number of colors"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Prints</FormLabel>
              <Input
                type="number"
                value={totalPrint}
                onChange={(e) =>
                  setTotalPrint(Math.max(0, parseInt(e.target.value) || 0))
                }
              />
            </FormControl>
            <Button
              onClick={calculateCosts}
              mb={4}
              leftIcon={<FaCalculator />}
              isDisabled={totalPrint < 15 || !paperSize || colorCount <= 0}
            >
              {loading ? <Spinner size="sm" /> : "Calculate"}
            </Button>
          </Stack>
          {errorMessage && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          {totalCost > 0 && !loading && (
            <Table mt={4}>
              <Tbody>
                <Tr>
                  <Td>Paper Size: {paperSize}</Td>
                </Tr>
                <Tr>
                  <Td>Number of Colors: {colorCount}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">
                    Cost per Sheet: {formatCurrency(costPerSheet)}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">
                    Total Cost for {totalPrint} Prints:{" "}
                    {formatCurrency(totalCost)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          )}
          {totalPrint < 15 && (
            <Text color="blue.500" mt={4}>
              Minimum print run is 15 sheets.
            </Text>
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
