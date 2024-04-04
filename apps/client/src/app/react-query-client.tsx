"use client";
import { initQueryClient } from "@ts-rest/react-query";
import { apiClientConfig } from "./api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from ;
import { useState } from "react";
import { contract } from "api-contract";
import { InitClientArgs } from "@ts-rest/core";

export const gQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => gQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {children}

        
      </>
    </QueryClientProvider>
  );
};

export const apiQueryClient = initQueryClient(contract, {
  ...apiClientConfig,
} satisfies InitClientArgs);
