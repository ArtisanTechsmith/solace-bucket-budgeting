import {QueryClient, QueryClientProvider as QCP} from "@tanstack/react-query";
import type {PropsWithChildren} from "react";

export const QueryClientProvider = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (<QCP client={queryClient}>
    {children}
  </QCP>)
}