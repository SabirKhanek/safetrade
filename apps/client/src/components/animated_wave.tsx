"use client";
import { HTMLProps, useRef } from "react";
import "./animated_wave.styles.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function AnimatedWave({ ...props }: HTMLProps<HTMLDivElement>) {
  const waveContainerRef = useRef(null);
  useGSAP(() => {
    const headerToggleClass = "header-attached";
    const headerClass = "main-header";
    gsap.timeline({
      scrollTrigger: {
        trigger: waveContainerRef.current,
        //      threshold header_height
        start: "10% 80px",
        endTrigger: waveContainerRef.current,
        end: "10% 80px",
        onEnter: () =>
          Array.from(document.getElementsByClassName(headerClass))
            .at(0)
            ?.classList.remove(headerToggleClass),
        onEnterBack: () =>
          Array.from(document.getElementsByClassName(headerClass))
            .at(0)
            ?.classList.add(headerToggleClass),
      },
    });
  }, []);
  return (
    <div
      {...props}
      ref={waveContainerRef}
      className={`wave-shape-divider overflow animated-wave ${props.className}`}
    >
      <WaveShape></WaveShape>
      <WaveShape></WaveShape>
    </div>
  );
}

function WaveShape() {
  return (
    <div className="min-w-[151vw] w-[150vw]">
      <div className="w-full h-full max-h-full min-h-full max-w-full min-w-full">
        <svg
          preserveAspectRatio=""
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 86 10"
        >
          <style type="text/css">{`.st0{fill:currentColor;}`}</style>
          <path
            id="Path_163"
            className="st0"
            d="M86,2.6V10H0V2.6C28.7,11.6,57.3-6.4,86,2.6z"
          ></path>
          <path
            id="Path_163_1_"
            className="st0"
            d="M123.7,157.7v12.2H-18.4v-12.2C29,172.6,76.4,142.8,123.7,157.7z"
          ></path>
          <path
            id="Path_163_2_"
            className="st0"
            d="M-18.4,157.7v12.2h-142.1v-12.2C-113.1,172.6-65.7,142.8-18.4,157.7z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
