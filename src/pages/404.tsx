import { Box, Heading, Link } from "@chakra-ui/react";

import { FC } from "react";

const Custom404: FC = () => {
  return (
    <Box
      position="relative" // Shift content when sidebar is open
      p={10}
      w="full"
      minH="100vh"
      bg="dark.bg"
      transition="margin-left 0.3s ease"
      color="dark.color"
      sx={{
        backgroundImage: "radial-gradient(circle, black 20%, transparent 20%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
        backgroundRepeat: "repeat",
      }}
    >
      <Heading
        as="h1"
        fontSize={{ base: "5xl", md: "7xl" }}
        fontWeight="extrabold"
        mb={4}
      >
        404 page
      </Heading>
      <Link href="/">
        return to homepage, maybe next time we make this page.
      </Link>
    </Box>
  );
};

export default Custom404;
