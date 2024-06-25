"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
export function GSAPRegistrations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });
  return null;
}
