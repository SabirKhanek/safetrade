"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
declare var Gradient: any;
export default function GradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {}, []);
  return (
    <>
      <canvas
        style={{
          background:
            "linear-gradient(180deg, #9a00bd 0%, #c4009b 50%, #ffad6a 100%)",
        }}
        id="hero_gradient"
        className="w-full h-full absolute bg-black"
        ref={canvasRef}
      ></canvas>
      <Script
        src="/assets/js/gradient_hero.js"
        onLoad={() => {
          try {
            let gradient = new Gradient();
            if (!(typeof window !== "undefined")) return;
            gradient.initGradient(`#${canvasRef.current?.id}`);
            // console.log("gradient configured");
          } catch (err) {
            console.log(err);
          }
        }}
      ></Script>
    </>
  );
}
