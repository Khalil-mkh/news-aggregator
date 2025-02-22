import { AnyObject } from "../../types";
import { GetState, SetState, StoreApi } from "zustand";
import { PersistOptions } from "zustand/middleware";

export type StateCreator<
  TState extends AnyObject,
  TActions extends AnyObject = TState,
  TSetState = SetState<TState>,
  TGetState = GetState<TState & TActions>,
  TStoreApi = StoreApi<TState & TActions>
> = (set: TSetState, get: TGetState, api: TStoreApi) => TActions;

export type ZustandPersistedState<T extends Record<string, unknown>> = {
  state: T;
  version: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomPersistOptions = Omit<PersistOptions<any>, "name">;
