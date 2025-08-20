import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./preloader.css";

export default function Preloader({ active = true }) {
  const preloaderRef = useRef(null);

  useEffect(() => {
    if (!active) return; // si no está activo no se corre la animación

    const ctx = gsap.context(() => {
      gsap.set(".imagotipo", { x: "40%" });
      gsap.set(".imagotipo-head", { y: -100, opacity: 0 });
      gsap.set(".imagotipo-arm", { x: -100, opacity: 0 });
      gsap.set(".imagotipo-leg", { x: 100, opacity: 0 });

      gsap.set(".oride-o", { scale: 0, opacity: 0 });
      gsap.set(".oride-r", { scale: 0, opacity: 0 });
      gsap.set(".oride-i", { scale: 0, opacity: 0 });
      gsap.set(".oride-d", { scale: 0, opacity: 0 });
      gsap.set(".oride-e", { scale: 0, opacity: 0 });
      gsap.set(".oride-ipunto", { y: -100, opacity: 0 });

      const tl = gsap.timeline();

      tl.to(".imagotipo-arm", { duration: 0.4, x: 0, opacity: 1, ease: "power2.inOut" })
        .to(".imagotipo-leg", { duration: 0.4, x: 0, opacity: 1, ease: "power2.inOut" }, "-=0.7")
        .to(".imagotipo-head", { duration: 0.5, opacity: 1, y: 0, ease: "bounce.out" })
        .to(".imagotipo", { duration: 0.4, x: 0, ease: "power2.inOut" })

        .to(".oride-o", { duration: 0.2, scale: 1, opacity: 1, ease: "power2.inOut" })
        .to(".oride-r", { duration: 0.2, scale: 1, opacity: 1, ease: "power2.inOut" }, "-=0.1")
        .to(".oride-i", { duration: 0.2, scale: 1, opacity: 1, ease: "power2.inOut" }, "-=0.1")
        .to(".oride-d", { duration: 0.2, scale: 1, opacity: 1, ease: "power2.inOut" }, "-=0.1")
        .to(".oride-e", { duration: 0.2, scale: 1, opacity: 1, ease: "power2.inOut" }, "-=0.1")
        .to(".oride-ipunto", { duration: 0.5, y: 0, opacity: 1, ease: "bounce.out" })

        .add(() => {
          const hidePreloader = () => {
            gsap.to(preloaderRef.current, {
              duration: 1,
              y: "-100%",
              opacity: 0,
              ease: "power2.inOut",
              onComplete: () => {
                if (preloaderRef.current) {
                  preloaderRef.current.style.display = "none";
                }
              },
            });
          };

          if (document.readyState === "complete") {
            hidePreloader();
          } else {
            window.addEventListener("load", hidePreloader);
          }
        });
    }, preloaderRef);

    return () => ctx.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div className="preloader" ref={preloaderRef}>
      <svg className="logo_preloader" viewBox="0 0 1114.4 800">
        <g className="oride" fill="var(--black)">
          <path className="oride-o" d="M469.4,340.3c-5.8-14.1-13.5-21.5-15.1-23-7.7-7.1-15.5-10.4-19.1-11.9,0,0-9.8-4.2-21.3-4.8-20.7-1.1-51.6,8.3-77.7,29.6-32.6,26.6-43.1,60-46.5,71.4-3.5,11.6-9,30.8-4.5,54.7,2,10.4,4.3,22.3,13.4,33,22.9,26.8,65.5,19.2,69.9,18.4,12.6-2.4,22.6-7.5,28.2-10.4,3.2-1.6,15.9-8.3,29.4-20.7,8.5-7.8,42.7-39.2,48.5-88.7,3.1-26.3-3.5-43.4-5.2-47.5h0ZM437.8,361.5c-1,4.5-2.6,10.4-5.9,21.9-1,3.5-2.9,10.4-3.8,13.3-6.4,21.5-18.1,44-22,51.4-9.2,17.2-13.8,25.8-22.6,35.3-8.9,9.5-17,18.1-29.6,18.9-1,0-15.6.8-25.1-9.6-6-6.6-7-14.4-8-23-1.1-8.8-.3-16.2,1.1-24.8,3.5-20.1,9.4-35.7,12.2-42.8,4.9-12.3,12.8-28.7,24.9-45.9,7.9-11.1,14.3-18,15.8-19.6,8.4-8.9,16.5-15.4,22.9-19.9,11.3-9.3,24.9-11.5,32.8-6,6.6,4.6,8.8,14.1,9.5,17,1,4.5.9,7.9.7,13.6-.3,8.2-1.6,14.2-2.9,20.3h0Z"/>
          <path className="oride-r" d="M466.6,479.1c-6,18.3-10,30.4-10,30.4h50.2c5.3-16.7,13.3-40.8,24.1-69.5,15.9-42.6,24.1-64.1,35.8-78.4,10.6-13,36.4-38.5,93.5-47.5-25.1-3-44.1-.1-56.9,3-18.6,4.6-45.8,15.2-44.9,14.9l6.9-24.1h-42.6s-37.6,114.8-56.1,171.1h0Z" />
          <path className="oride-i" d="M540.5,509.1c8.6-1.3,36.4-7.3,50.2-14.4,24.4-12.7,37.4-31.2,46.8-45,16.8-24.6,23.2-46.7,31-74.3,4.7-16.6,10-39.6,13-67.8h50.2c-2.2,17.3-4.8,31.4-6.8,41.3-6.4,32.1-11.7,57.7-26.9,86.3-4.4,8.2-8.6,16-16,25.2-19.1,23.5-41.3,33.9-47.8,36.8-18.2,8-33.5,9.4-54,11.4-16.2,1.5-29.8,1.2-39.5.7" />
          <circle className="oride-ipunto" cx="706.4" cy="252.3" r="25.2" />
          <path className="oride-d" d="M862.8,311s-11.3-2.2-26.2,0c-28.6,4.3-47.7,21.4-50.7,24.2-24.4,22.6-39.4,61.1-28.2,89.7,4.2,10.7,10.4,16.9,12.4,18.8,11.8,10.9,29.9,15.8,45.6,11,9.2-2.8,15.5-8.3,19.9-12.9,27.5-29,31.3-80.8,32.2-100.4,1-24.9-.5-65-17.2-112.6h50.2c10.8,37.9,13.5,70.1,14,92.4.5,25,1,71.2-21.3,119.7-9.1,19.8-17.2,29.6-23.4,35.8-9.1,9.1-29.2,29.6-60.8,30.2-37.6.7-60.9-27.2-63-29.9-13.8-17.1-16.2-35.2-17.4-45.3-5.6-46.2,22.3-79.9,27.2-85.7,5.1-6.1,19.8-22.9,44.2-31.6,31.4-11.3,62.7-3.5,62.7-3.4h-.2Z" />
          <path className="oride-e" d="M1061.1,507.8c21.3.7,37.2-1.4,39.9-1.8l13.4-48.4c-29.8,3.6-60.8,1.9-78.3-.1-37.8-4.3-48.7-12.9-54-18.2-10.9-10.9-14.1-23.9-15.8-30.6-1.5-6.1-6.8-30.3,6.2-53.3,6.7-11.8,15.2-18.2,17.2-19.6,4.1-3,10.2-7.3,19.3-8.9,13.3-2.4,23.8,2.4,26.5,3.8,3.1,1.6,14,7.2,19.6,20.3,6.9,16.2,0,31-1,33.4-5.8,12.1-16.1,17.5-26.1,22.7-13.4,7-31.8,11.6-41,12.1,43.9,2.3,77.2-21.6,81.6-49.1,3.8-24-15.5-43.1-17-44.5-25-23.9-70-20.2-97.2,1.4-36.6,29-28.5,80.7-26.6,90.8.6,3.3,4.6,23.5,18.3,42.2,27.8,37.9,79,46.7,115.1,47.8h0Z" />
        </g>
        <g className="imagotipo" fill="var(--black)">
          <path className="imagotipo-arm" d="M0,294.3c144.4-16.5,276.5-127.9,276.5-127.9l35.4,51.6S168.5,332.4,0,294.3" />
          <path className="imagotipo-leg" d="M224.4,695.1c-16.6-75.4-12.4-136.9-7.1-174.5,7.9-55.4,20.9-145.9,93.5-207.7,4.9-4.2,25-20.9,59.1-36.4,122.9-55.9,256.6-18.5,307.5-1.8C-6.6,20.3,224.4,695.1,224.4,695.1" />
          <circle className="imagotipo-head" cx="227.2" cy="144" r="35.9" />
        </g>
      </svg>
    </div>
  );
}