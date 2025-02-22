import create, { SetState, UseBoundStore } from "zustand";
import { devtools, persist, StateStorage } from "zustand/middleware";
import produce, { Draft } from "immer";
import { CustomPersistOptions, StateCreator } from "./types";
import { AnyObject } from "../../types";

/**
 * apply immer to store.
 * @param config store actions.
 * @returns store config after produce the setters.
 */
const immer =
  <TState extends AnyObject, TActions extends AnyObject>(
    config: StateCreator<
      TState,
      TActions,
      (fn: (draft: Draft<TState>) => void) => void
    >
  ): StateCreator<TState, TActions> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as never), get, api);

/**
 * apply combine plugin on the store.
 * @param initialState initial state for the store.
 * @param _create store actions.
 * @returns store config after combine the store.
 */
const combine =
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    _create: StateCreator<TState, TActions>
  ): StateCreator<TState & TActions> =>
  (set, get, api) => ({
    ...initialState,
    ..._create(set as SetState<TState>, get, api),
  });

/**
 * apply combine and immer on the store.
 * @param initialState initial state for the store.
 * @param config store actions.
 * @returns store config after combine the store and produce the actions.
 */
const combineAndImmer = <TState extends AnyObject, TActions extends AnyObject>(
  initialState: TState,
  config: StateCreator<
    TState,
    TActions,
    (fn: (draft: Draft<TState>) => void) => void
  >
) => combine(initialState, immer(config));

// **********************************************************************

const createStoreFull =
  (name: string, persistOptions: CustomPersistOptions) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<
      TState,
      TActions,
      (fn: (draft: Draft<TState>) => void) => void
    >
  ) => {
    const getStorage = persistOptions?.getStorage || (() => localStorage);
    return create(
      devtools(
        persist(combineAndImmer(initialState, actions), {
          ...persistOptions,
          name,
          getStorage,
        }),
        {
          name,
        }
      )
    );
  };

const createStoreWithOutPersist =
  (name: string) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<
      TState,
      TActions,
      (fn: (draft: Draft<TState>) => void) => void
    >
  ) =>
    create(devtools(combineAndImmer(initialState, actions), { name }));

const createStoreWithOutDevtools =
  (name: string, persistOptions: CustomPersistOptions) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<
      TState,
      TActions,
      (fn: (draft: Draft<TState>) => void) => void
    >
  ) => {
    const getStorage = persistOptions?.getStorage || (() => localStorage);

    return create(
      persist(combineAndImmer(initialState, actions), {
        ...persistOptions,
        name,
        getStorage,
      })
    );
  };

const createStorePure = <TState extends AnyObject, TActions extends AnyObject>(
  initialState: TState,
  actions: StateCreator<
    TState,
    TActions,
    (fn: (draft: Draft<TState>) => void) => void
  >
) => create(combineAndImmer(initialState, actions));

export type CreateStoreOptions =
  | { persist?: false; devtools?: false }
  | {
      persist: true;
      devtools?: false;
      name: string;
      getStorage?: () => StateStorage;
      persistOptions?: CustomPersistOptions;
    }
  | { persist?: false; devtools: true; name: string }
  | {
      persist: true;
      devtools: true;
      name: string;
      getStorage?: () => StateStorage;
      persistOptions?: CustomPersistOptions;
    };

/**
 * function that create zustand store.
 * @param options create store options.
 * @returns function that create the real store.
 */
export const createStore =
  (options?: CreateStoreOptions) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<
      TState,
      TActions,
      (fn: (draft: Draft<TState>) => void) => void
    >
  ): UseBoundStore<TState & TActions> => {
    if (options?.devtools && options?.persist)
      return createStoreFull(options?.name, {
        getStorage: options?.getStorage,
        ...options?.persistOptions,
      })(initialState, actions);
    if (options?.devtools)
      return createStoreWithOutPersist(options.name)(initialState, actions);
    if (options?.persist)
      return createStoreWithOutDevtools(options.name, {
        getStorage: options?.getStorage,
        ...options?.persistOptions,
      })(initialState, actions);
    return createStorePure(initialState, actions);
  };
