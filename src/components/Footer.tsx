import {
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Icon,
  HStack,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaVimeo,
  FaPinterest,
} from "react-icons/fa";

const InfoFooter = () => {
  const { colorMode } = useColorMode();

  const footerBgColors = {
    light: "#212121",
    dark: "#212121",
    red: "#cc4339",
    green: "#5BCA41",
    blue: "#0023FF", // Example of contrasting blue
  };

  const footerTextColors = {
    light: "#fefdfa",
    dark: "#fefdfa",
    red: "#fefdfa",
    green: "#fefdfa",
    blue: "#fefdfa",
  };

  const footerBg = footerBgColors[colorMode] || footerBgColors.light;
  const footerColor = footerTextColors[colorMode] || footerTextColors.light;

  return (
    <Box as="footer" bg={footerBg} color={footerColor} py={10} px={5}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(8, 1fr)",
          lg: "repeat(12, 1fr)",
        }}
        gap={8}
        maxW="1200px"
        mx="auto"
        textAlign={{ base: "left", md: "left" }}
      >
        {/* Logo Section */}
        <GridItem colSpan={{ base: 1, md: 12 }}>
          <Image
            src="/simulasi.svg"
            alt="Company Logo"
            width="50px"
            mx={{ base: "0", md: "0" }}
          />
        </GridItem>

        {/* Links Section 1 */}
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Stack spacing={2} mt={2}>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              About Us
            </Link>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              What on
            </Link>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Flipcard
            </Link>
            <Link
              href="/services"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Services
            </Link>
          </Stack>
        </GridItem>

        {/* Links Section 2 */}
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Stack spacing={2} mt={2}>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Fundamental
            </Link>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Separation
            </Link>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Halftone
            </Link>
            <Link
              href="#"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Diffusion Dither
            </Link>
          </Stack>
        </GridItem>

        {/* Quote Section */}
        <GridItem colSpan={{ base: 1, md: 6 }}>
          <Stack spacing={1} mt={0}>
            <Text fontSize="4xl" fontWeight="bold">
              Nothing is Real
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              Everything is Simulation
            </Text>
          </Stack>
        </GridItem>

        {/* Contact Information */}
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <VStack align="left" spacing={2}>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Studios. All rights reserved.
            </Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          {" "}
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=simulasi.studio@gmail.com"
            isExternal
          >
            simulasi.studio@gmail.com
          </Link>
          <HStack>
            <Text fontSize="sm">Design Simulasi</Text>
            <Text fontSize="sm">Code Keppett</Text>
          </HStack>
        </GridItem>

        {/* Social Media Icons */}
        <GridItem colSpan={{ base: 1, md: 5 }}>
          <HStack
            spacing={4}
            mt={2}
            justify={{ base: "left", md: "flex-start" }}
          >
            <Link href="#" isExternal>
              <Icon
                as={FaPinterest}
                boxSize={8}
                _hover={{
                  transform: "translateY(-6px)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </Link>
            <Link href="#" isExternal>
              <Icon
                as={FaLinkedin}
                boxSize={8}
                _hover={{
                  transform: "translateY(-6px)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </Link>
            <Link href="#" isExternal>
              <Icon
                as={FaYoutube}
                boxSize={8}
                _hover={{
                  transform: "translateY(-6px)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </Link>
            <Link href="#" isExternal>
              <Icon
                as={FaVimeo}
                boxSize={8}
                _hover={{
                  transform: "translateY(-6px)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </Link>
            <Link href="#" isExternal>
              <Icon
                as={FaInstagram}
                boxSize={8}
                _hover={{
                  transform: "translateY(-6px)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </Link>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default InfoFooter;
