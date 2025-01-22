import { Box, Heading, Link, Text } from "@chakra-ui/react";

import { FC } from "react";

const Custom404: FC = () => {
  return (
    <Box p={16}>
      <Heading
        as="h1"
        fontSize={{ base: "5xl", md: "7xl" }}
        fontWeight="extrabold"
        mb={4}
      >
        404 Page Not Found!
      </Heading>
      <Heading as="h2" size="sm">
        <Link href="/">return to homepage.</Link>
      </Heading>
      <Text mt={4}>Thank you</Text>
    </Box>
  );
};

export default Custom404;
