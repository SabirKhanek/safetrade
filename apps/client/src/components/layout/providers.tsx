"use client";
import React from "react";
import { ThemeProvider } from "../providers/theme-provider";
import { LocalStorage } from "common";
import { AuthStateProvider } from "../providers/authstate-provider";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey={LocalStorage.ThemeVar}>
        <AuthStateProvider>{children}</AuthStateProvider>
      </ThemeProvider>
    </>
  );
}
