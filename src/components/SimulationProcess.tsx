import { useEffect } from "react";
import { Box, Heading, Text, Stack, Image } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const SimulationProcess = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 2, // Multiplier for mouse wheel scroll
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Animate elements with GSAP and ScrollTrigger
    gsap.fromTo(
      ".gsap-text",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.in",
        scrollTrigger: {
          trigger: ".gsap-text",
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      },
    );
    gsap.fromTo(
      ".gsap-img",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".gsap-text",
          start: "top 90%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    return () => lenis.destroy(); // Clean up Lenis instance
  }, []);

  return (
    <Box as="section" mt={32} mb={16}>
      <Stack direction={["column", "column", "row"]} spacing={6} align="left">
        <Box flex="1">
          <Image
            className="gsap-img"
            src="/images/channel_.png"
            alt="Screen Printing Process"
            borderRadius="lg"
            width={{ base: "100%", md: "100%" }}
            height={{ base: "100%", md: "100%" }}
          />
        </Box>
        <Box flex="1">
          <Heading
            as="h2"
            size={{ base: "xl", md: "2xl" }}
            mb={6}
            className="gsap-text"
          >
            Color Separation
          </Heading>
          <Text fontSize="lg" mb={4} className="gsap-text">
            Color separation using applications such as Adobe Photoshop is a
            print simulation. In this process to determine the color and color
            density, if there is a stack of 2 different colors. In addition, it
            is also to find the color sequence when printing.{" "}
          </Text>
          <Text fontSize="lg" className="gsap-text">
            Why this process determines the print result, because screen
            printing on paper using water-based ink has many problems. The
            moisture of the ink can affect the paper used. Through this process
            we can outsmart it by trapping, exaggerating the angle of the
            stacked images so that during the printing process there is not much
            shift between the stacked images or colors.{" "}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default SimulationProcess;
