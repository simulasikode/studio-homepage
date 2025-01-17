import React, { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  text: string;
  speed?: number;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ text, speed = 1 }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      gsap.fromTo(
        element,
        { x: "100%" },
        {
          x: "-100%",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          duration: 20 / speed,
          repeat: 1,
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <Box
      overflow="hidden"
      whiteSpace="nowrap"
      position="relative"
      width="100%"
      py={6}
    >
      <Text
        ref={textRef}
        display="inline-block"
        fontSize={{ base: "5xl", md: "6xl" }}
        fontWeight="bold"
      >
        {text}
      </Text>
    </Box>
  );
};

export default ParallaxText;
