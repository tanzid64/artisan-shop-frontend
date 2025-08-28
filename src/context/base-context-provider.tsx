"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import { Toaster } from "sonner";

interface BaseProviderProps {
  children: ReactNode;
}

export const BaseContextProvider: FC<BaseProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        expand
        richColors
        closeButton
        duration={4000}
      />
    </QueryClientProvider>
  );
};
