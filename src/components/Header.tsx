import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import ColorModeSwitcher from "./ColorSwitcher";

const Header: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const { isOpen, onToggle, onClose } = useDisclosure();

  const MotionBox = motion(Box);

  const { colorMode } = useColorMode();

  const headerBg = {
    light: "#fefdfa",
    dark: "#212121",
    red: "#fefdfa",
    green: "#fefdfa",
    blue: "#fefdfa", // Example of contrasting blue
  };

  const headerColor = {
    light: "#212121",
    dark: "#fefdfa",
    red: "#cc4339", // Set color for the 'red' mode
    blue: "#0023FF",
    green: "#5BCA41",
  };

  const Bg = headerBg[colorMode] || headerBg.light;
  const Color = headerColor[colorMode] || headerColor.light;

  const linkHoverStyle = {
    textDecoration: "none",
    transform: "scale(1.1)",
    transformOrigin: "center",
    transition: "transform 0.2s ease-in-out",
  };

  const generalLinks = [
    { label: "Services", href: "/services" },
    { label: "Pintone", href: "/pintone" },
  ];

  const categoryLinks = [
    { label: "Separation", href: "/#" },
    { label: "Bitmap", href: "/#" },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        as="header"
        position="fixed"
        top="0"
        w="100%"
        bg={Bg}
        color={Color}
        borderBottom="0.01rem solid"
        zIndex={9999}
        px={4}
        py={3}
      >
        <Flex
          justify="space-between"
          align="center"
          maxW="container.xl"
          mx="auto"
        >
          <Link
            href="/"
            _hover={linkHoverStyle}
            display={isMobile ? "none" : "block"}
            aria-label="Navigate to Simulasi Studio Home"
          >
            Simulasi Studio
          </Link>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              icon={
                isOpen ? (
                  <FaTimes aria-hidden="true" />
                ) : (
                  <FaBars aria-hidden="true" />
                )
              }
              onClick={onToggle}
              variant="unstyled"
            />
          )}

          {/* Desktop Links */}
          {!isMobile && (
            <HStack spacing={6}>
              {[...generalLinks, ...categoryLinks].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  _hover={linkHoverStyle}
                  aria-label={`Navigate to ${label}`}
                >
                  {label}
                </Link>
              ))}
            </HStack>
          )}

          {/* Color Mode Switcher */}
          <ColorModeSwitcher />
        </Flex>
      </Box>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <MotionBox
          position="fixed"
          top="80px"
          left="4"
          right="4"
          bg={Bg}
          color={Color}
          border="0.01rem solid"
          borderRadius="md"
          zIndex={1000}
          width={250}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Flex direction="column" gap={6} py={6}>
            {/* Section 1: General Links */}
            <Box pb={4} borderBottom="0.01rem solid" px={4}>
              <VStack align="flex-start" spacing={3}>
                {generalLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    _hover={linkHoverStyle}
                    aria-label={`Navigate to ${label}`}
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                ))}
              </VStack>
            </Box>

            {/* Section 2: Category Links */}
            <Box px={4}>
              <VStack align="flex-start" spacing={3}>
                {categoryLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    _hover={linkHoverStyle}
                    aria-label={`Navigate to ${label}`}
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                ))}
              </VStack>
            </Box>
          </Flex>
        </MotionBox>
      )}
    </Box>
  );
};

export default Header;
