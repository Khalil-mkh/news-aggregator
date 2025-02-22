/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import {
  useQuery as useBaseQuery,
  UseQueryOptions,
  QueryClient,
} from "@tanstack/react-query";
import omit from "lodash/omit";

export type AxiosRequestConfigWithTypes<
  TData = any,
  TQuery extends string = string,
  TParams = any
> = Omit<AxiosRequestConfig, "data" | "params" | "query"> & {
  data?: TData;
  query?: Record<TQuery, string | number | boolean | undefined | null>;
  params?: TParams;
};

export type CreateReactQueryOptions = {
  axiosInstance?: AxiosInstance;
};

const defaultOptions: Required<CreateReactQueryOptions> = {
  axiosInstance: axios.create(),
};

const createQueryHelper =
  ({ axiosInstance }: Required<CreateReactQueryOptions>) =>
  <
    TQueryData = any,
    TQueryBody = any,
    TQueryQuery extends string = string,
    TQueryParams = any
  >(
    baseConfig?: AxiosRequestConfigWithTypes<
      TQueryBody,
      TQueryQuery,
      TQueryParams
    >,
    baseQueryOptions?: UseQueryOptions<
      TQueryData,
      unknown,
      TQueryData,
      [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
    >
  ) => {
    const useFn = (
      hookConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      > | null,
      hookQueryOptions?: UseQueryOptions<
        TQueryData,
        unknown,
        TQueryData,
        [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
      > | null
    ) => {
      const config = useMemo(
        () => ({ ...baseConfig, ...hookConfig }),
        [hookConfig]
      );
      const queryKey = useFn.getQueryKey(hookConfig);

      return useBaseQuery<
        TQueryData,
        unknown,
        TQueryData,
        [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
      >({
        queryKey: [queryKey], // ✅ Fixed TypeScript error
        queryFn: async ({ signal }: { signal?: AbortSignal }) => {
          try {
            const { data } = await axiosInstance.request<TQueryData>({
              ...config,
              signal,
            });
            return data;
          } catch (err) {
            if (!axios.isAxiosError(err)) throw err;
            throw err;
          }
        },
        ...baseQueryOptions, // ✅ Merging options correctly
        ...hookQueryOptions,
      });
    };

    useFn.request = (
      fnConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      >
    ) =>
      axiosInstance
        .request<TQueryData>({
          ...baseConfig,
          ...fnConfig,
        })
        .then(({ data }) => data as TQueryData);

    useFn.getQueryKey = (
      hookConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      > | null
    ) => {
      return omit({ ...baseConfig, ...hookConfig }, [
        "headers",
        "transformRequest",
        "transformResponse",
      ]);
    };

    useFn.fetchQuery = (
      queryClient: QueryClient,
      hookConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      > | null
    ) => {
      const queryKey = useFn.getQueryKey(hookConfig);
      return queryClient.fetchQuery({
        queryKey: [queryKey], // ✅ Fixed TypeScript error
        queryFn: async ({ signal }: { signal?: AbortSignal }) => {
          const { data } = await axiosInstance.request<TQueryData>({
            ...baseConfig,
            ...hookConfig,
            signal,
          });
          return data;
        },
      });
    };

    return useFn;
  };

export const createReactQueryFns = (options?: CreateReactQueryOptions) => {
  const resOptions = { ...defaultOptions, ...options };
  return {
    createQuery: createQueryHelper(resOptions),
  };
};
