/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import omit from 'lodash/omit';

import {
  useQuery as useBaseQuery,
  UseQueryOptions,
  QueryClient,
  Updater,
} from '@tanstack/react-query';
import mergeFunctions from '../../utils/mregeFunctions';

export type AxiosRequestConfigWithTypes<
  TData = any,
  TQuery extends string = string,
  TParams = any
> = Omit<AxiosRequestConfig, 'data' | 'params' | 'query'> & {
  data?: TData;
  query?: Record<TQuery, string | number | boolean | undefined | null>;
  params?: TParams;
};

const defaultOptions: Required<CreateReactQueryOptions> = {
  axiosInstance: axios.create(),
};

export type CreateReactQueryOptions = {
  axiosInstance?: AxiosInstance;
  // toast?: false | ((err: AxiosError) => unknown | Promise<unknown>);
  // log?: false | ((err: AxiosError) => unknown | Promise<unknown>);
};

const createQueryHelper = ({ axiosInstance }: Required<CreateReactQueryOptions>) => <
  TQueryData = any,
  TQueryBody = any,
  TQueryQuery extends string = string,
  TQueryParams = any
>(
  baseConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
  baseQueryOptions?: UseQueryOptions<
    TQueryData,
    unknown,
    TQueryData,
    [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
  >
) => {
  const useFn = (
    hookConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null,
    hookQueryOptions?: UseQueryOptions<
      TQueryData,
      unknown,
      TQueryData,
      [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
    > | null
  ) => {
    const config = useMemo(() => ({ ...baseConfig, ...hookConfig }), [hookConfig]);
    const queryKey = useFn.getQueryKey(hookConfig);

    const options = useMemo(
      () => ({
        ...baseQueryOptions,
        ...hookQueryOptions,
        onSuccess: mergeFunctions(baseQueryOptions?.onSuccess, hookQueryOptions?.onSuccess),
        onSettled: mergeFunctions(baseQueryOptions?.onSettled, hookQueryOptions?.onSettled),
        onError: mergeFunctions(baseQueryOptions?.onError, hookQueryOptions?.onError),
      }),
      [hookQueryOptions]
    );
    return useBaseQuery<
      TQueryData,
      unknown,
      TQueryData,
      [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
    >(
      [queryKey],
      async ({ signal }) => {
        try {
          const { data } = (await axiosInstance.request<TQueryData>({
            ...config,
            signal,
          })) as any;
          return data;
        } catch (err) {
          if (!axios.isAxiosError(err)) throw err;
          // log && log(err);
          // toast && toast(err);
          throw err;
        }
      },
      options
    );
  };

  useFn.request = (fnConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>) =>
    axiosInstance
      .request<TQueryData>({
        ...baseConfig,
        ...fnConfig,
      })
      .then(({ data }: any) => data as TQueryData);

  useFn.config = baseConfig;

  useFn.getQueryKey = (
    hookConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null
  ) => {
    const customConfig = omit(hookConfig, ['headers', 'transformRequest', 'transformResponse']);
    const cleanBaseConfig = omit(baseConfig, ['headers', 'transformRequest', 'transformResponse']);

    return { ...cleanBaseConfig, ...customConfig };
  };

  useFn.fetchQuery = (
    queryClient: QueryClient,
    hookConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null
  ) => {
    const queryKey = useFn.getQueryKey(hookConfig);
    const config = { ...baseConfig, ...hookConfig };

    return queryClient.fetchQuery([queryKey], async ({ signal }) => {
      try {
        const { data } = (await axiosInstance.request<TQueryData>({
          ...config,
          signal,
        })) as any;
        return data;
      } catch (err) {
        if (!axios.isAxiosError(err)) throw err;
        // log && log(err);
        // toast && toast(err);
        throw err;
      }
    });
  };

  useFn.invalidate = (
    queryClient: QueryClient,
    hookConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null
  ) => {
    queryClient.invalidateQueries([
      hookConfig
        ? useFn.getQueryKey(hookConfig)
        : {
            method: baseConfig?.method,
            url: baseConfig?.url,
          },
    ]);
  };

  useFn.setData = (
    queryClient: QueryClient,
    hookConfig: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null,
    updater: Updater<TQueryData | undefined, TQueryData>
  ) => {
    queryClient.setQueryData<TQueryData>([useFn.getQueryKey(hookConfig)], updater);
  };

  useFn.getData = (
    queryClient: QueryClient,
    hookConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams> | null
  ) => {
    return queryClient.getQueryData<TQueryData>([useFn.getQueryKey(hookConfig)]);
  };

  return useFn;
};

export const createReactQueryFns = (options?: CreateReactQueryOptions) => {
  const resOptions = { ...defaultOptions, ...options };
  return {
    createQuery: createQueryHelper(resOptions),
  };
};