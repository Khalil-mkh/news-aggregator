import { QueryClientConfig } from "@tanstack/react-query";
import { createReactQueryFns } from "./helpers";
import { httpRequest } from "../axios";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: 2 * 60 * 1000,
      structuralSharing: true,
      retry: false,
    },
    mutations: {},
  },
};

export const { createQuery } = createReactQueryFns({
  axiosInstance: httpRequest(),
});

export type QueryKeyType = {
  url: string;
};
