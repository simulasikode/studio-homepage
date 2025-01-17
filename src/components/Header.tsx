import React from "react";
import { Box, Flex, HStack, Link, useBreakpointValue } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorSwitcher";

const Header: React.FC = () => {
  // Define whether the screen is small or large to change layout accordingly
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Box
        as="header"
        w="100%"
        p={2}
        top={0}
        zIndex={100}
        position="fixed"
        color="white"
        mixBlendMode="difference"
      >
        <Flex
          justify="space-around"
          align="center"
          direction={isMobile ? "row" : "row"}
        >
          {/* Logo */}
          <Flex justify="flex-start">
            <Link
              href="/"
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
              display={isMobile ? "none" : "flex"}
            >
              Simulasi Studio
            </Link>
          </Flex>
          <Flex gap={6}>
            <Link
              href="/services"
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
              display={isMobile ? "none" : "flex"}
            >
              Services
            </Link>

            <Link
              href="https://forms.fillout.com/t/pFE4XxyiXGus"
              isExternal
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
              display={isMobile ? "none" : "flex"}
            >
              Request
            </Link>
          </Flex>
          <HStack
            spacing={6}
            align="center"
            display={isMobile ? "none" : "flex"}
          >
            <Link
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Fundamental
            </Link>
            <Link
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Separation
            </Link>
            <Link
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Color
            </Link>
            <Link
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Halftone
            </Link>
            <Link
              _hover={{
                textDecoration: "none",
                transform: "scale(1.1)", // Scaling effect
                transformOrigin: "center", // Keep scaling centered
                transition: "transform 0.2s ease-in-out", // Smooth transition
              }}
            >
              Diffusion dither
            </Link>
          </HStack>
        </Flex>
      </Box>
      <ColorModeSwitcher />
    </Box>
  );
};

export default Header;
