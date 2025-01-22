// pages/_app.tsx
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  CSSReset,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import Theme from "../styles/theme";
import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import Footer from "@/components/Footer";
import useLenis from "../hooks/useLenis";
import { useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import "../styles/global.css";
import ParallaxText from "@/components/ParallaxText";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  useLenis();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      gsap.to(".page-transition", {
        duration: 0.5,
        opacity: 0,
        y: -50,
        ease: "power2.out",
      });
    };

    const handleRouteChangeComplete = () => {
      gsap.fromTo(
        ".page-transition",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <ChakraProvider theme={Theme}>
        <Head>
          {/* Basic Meta Tags */}
          <title>Simulasi Studio</title>
          <meta
            name="description"
            content="Simulation Studio, Workin on screen printing on paper for produce a fine art poster, base on  Yogyakarta, Indonesia"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Box
          className="page-transition"
          sx={{
            backgroundImage: "radial-gradient(circle, gray 2%, transparent 2%)",
            backgroundSize: "18px 18px",
            backgroundPosition: "0 0",
            backgroundRepeat: "repeat",
          }}
        >
          <GoogleTagManager gtmId="GTM-PBBJ4ZFZ" />
          <Header />
          <CSSReset />
          <Component {...pageProps} />
          <ParallaxText text="Everything is Simulation" speed={1} />
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
