// components/Sidebar.tsx
import {
  Box,
  Icon,
  VStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure(); // Chakra UI hook to toggle sidebar visibility

  return (
    <Box>
      {/* Sidebar for mobile and desktop */}
      <Box
        w={{ base: "full", md: "380px" }} // Full width on mobile, fixed width on desktop
        h="100vh"
        bg="black"
        p={6}
        position="fixed"
        top={0}
        left={0}
        zIndex={10}
        transition="transform 0.02s ease"
        transform={isOpen ? "translateX(0)" : "translateX(-100%)"} // Toggle visibility
        display={{ base: "block", md: "block" }} // Sidebar is always visible on desktop
      >
        <VStack align="start" spacing={0}>
          <Stack spacing={0}>
            <Text color="white" fontSize="xl">
              Home
            </Text>
          </Stack>
        </VStack>
      </Box>

      {/* Hamburger Icon for Mobile */}
      <Box
        position="fixed"
        top={0}
        p={6}
        // Change the position based on whether the sidebar is open
        left={isOpen ? "auto" : "0"} // Move to the left when closed
        right={isOpen ? "1000px" : "auto"} // Move to the right when open
        zIndex={20}
        display={{ base: "block", md: "block" }} // Only show on mobile
        onClick={onToggle} // Toggling the state
        transition="left 0.3s ease, right 0.3s ease" // Smooth transition for moving
        bg="black"
        h="100vh"
        _hover={{ bg: "orange.400" }}
      >
        <Icon
          cursor="pointer"
          as={isOpen ? FiX : FiMenu}
          boxSize="50px" // Adjust the icon size here
          color="white" // Set color of the icon
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
