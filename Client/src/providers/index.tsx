import React from "react";
import { ContextProviders } from "./context.provider";
import { QueryProvider } from "./react-query.provider";

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryProvider>
      <ContextProviders>{children}</ContextProviders>
    </QueryProvider>
  );
};
