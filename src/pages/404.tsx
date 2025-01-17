import { Box, Heading, Link } from "@chakra-ui/react";

import { FC } from "react";

const Custom404: FC = () => {
  return (
    <Box
      position="relative" // Shift content when sidebar is open
      p={16}
      w="full"
      minH="100vh"
      transition="margin-left 0.3s ease"
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
