import type React from "react";
import { AuthProvider } from "../context/auth.context";

export const ContextProviders = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <AuthProvider>{children}</AuthProvider>;
};
