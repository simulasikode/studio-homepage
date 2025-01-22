// pages/index.tsx
import { Box, Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import SimulationProcess from "@/components/SimulationProcess";

const ParalaxSection = motion(Box);

const MainContent = () => (
  <Box
    px={{ base: "4", md: "16" }}
    py={16}
    w="container.xl"
    minH="100vh"
    transition="margin-left 0.3s ease"
  >
    <ParalaxSection
      initial={{ y: "10%", opacity: "0" }}
      animate={{ y: "0", opacity: "1" }}
      transition={{
        opacity: { duration: 1, ease: "easeIn" }, // opacity transition
        y: { duration: 1, ease: "easeOut" },
      }}
      position="relative"
    >
      <Heading
        as="h1"
        fontSize={{ base: "5xl", md: "7xl" }}
        fontWeight="extrabold"
        mb={4}
      >
        Prepress
      </Heading>
      <Text fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold">
        : the process of assembling and editing a product (such as a book or
        newspaper) prior to printing. adjusted the color in prepress. often used
        before another noun.
      </Text>
    </ParalaxSection>
    <SimulationProcess />
  </Box>
);

const Home = () => {
  return (
    <Box display="flex">
      <MainContent />
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fetchData = async () => {
    // Simulate fetching data from an API or database
    const should404 = false; // Change to `true` to test the 404
    return should404 ? null : "This is some homepage data!";
  };

  const data = await fetchData();

  if (!data) {
    return { props: { notFound: true } }; // Indicate that the page should render 404
  }

  return { props: { data, notFound: false } };
};

export default Home;
