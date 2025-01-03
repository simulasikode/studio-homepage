// pages/index.tsx
import { Box, Heading, Text, Mark } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import DrawerMenu from "@/components/drawerMenu";

const currentYear = new Date().getFullYear();
const ParalaxSection = motion(Box);
const MainContent = () => (
  <Box
    position="relative" // Shift content when sidebar is open
    px={{ base: "4", md: "16" }}
    py={10}
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
    <ParalaxSection
      initial={{ y: "30%", opacity: "0" }}
      animate={{ y: "0", opacity: "1" }}
      transition={{
        opacity: { duration: 1.5, ease: "easeInOut" }, // opacity transition
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
        newspaper) prior to printing. adjusted{" "}
        <Mark bg="light.color" color="dark.color" borderRadius="md" p={2}>
          the colors
        </Mark>{" "}
        in prepress. often used before another noun.
      </Text>
      <Text mt={8}> &copy; {currentYear}. Simulasi Studio</Text>
    </ParalaxSection>
  </Box>
);

const Home = () => {
  return (
    <Box display="flex">
      <DrawerMenu />
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
