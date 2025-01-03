import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box>
      {/* Button to trigger the Drawer */}
      <Button
        onClick={onOpen}
        colorScheme="dark"
        color="dark.color"
        position="fixed"
        zIndex={100}
        py={6}
      >
        About
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay
          sx={{
            backdropFilter: "blur(12px)", // Apply blur to the overlay
          }}
        />
        <DrawerContent bg="dark.bg" color="dark.color">
          <DrawerCloseButton />
          <DrawerHeader>Simulasi Studio</DrawerHeader>

          <DrawerBody>
            <Text>
              "The exploration of materials and the process of printing
              experience as self-expression on the screen printing technique to
              find the pleasure of artistic surprises can be achieved."
              Simulation studio believe that screen printing techniques still
              need as much experimentation and exploration in the studio.{" "}
            </Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose} fontSize="sm">
              Back
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
