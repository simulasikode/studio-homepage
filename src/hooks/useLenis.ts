import { useEffect } from "react";
import Lenis from "lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Adjust the duration for smoothness
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smoothWheel: true, // Enable smooth wheel scrolling
    });

    const raf = (time: number) => {
      lenis.raf(time); // Update Lenis on each animation frame
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Clean up Lenis instance
  }, []);
};

export default useLenis;
