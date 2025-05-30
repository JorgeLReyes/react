import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, PropsWithChildren } from "react";

const clientProvider = new QueryClient();

export const TanStackProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={clientProvider}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
