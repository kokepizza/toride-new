import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./horizontal-scroll.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const slides = gsap.utils.toArray(".hs-slide", container);

    if (slides.length === 0) return;

    const totalScroll = window.innerHeight * slides.length;

    gsap.set(container, {
      marginBottom: totalScroll,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    gsap.to(slides, {
      xPercent: -(100 * (slides.length - 1)),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=" + (totalScroll + window.innerHeight),
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="hs-container" ref={containerRef}>
      {children}
    </div>
  );
};

export default HorizontalScroll;