import shallow from "zustand/shallow";
import { createStore } from "../../../libs/zustand";
import { stateSetterHandler } from "../../../libs/zustand/helpers";
import { UserPreferences } from "../types/userPreferences";

export type PreferencesStoreType = {
  preferences: UserPreferences | null;
  isPreferencesSet: boolean;
};

const initState: PreferencesStoreType = {
  preferences: null,
  isPreferencesSet: false,
};

const useFn = createStore({
  name: "user-preferences",
  devtools: false,
  persist: true,
})(initState, (set) => {
  const handler = stateSetterHandler(set);
  return {
    setPreferences: handler("preferences"),
    setIsPreferencesSet: handler("isPreferencesSet"),
  };
});

export const usePreferencesStore = () => {
  const [preferences, setPreferences] = useFn(
    (s) => [s.preferences, s.setPreferences],
    shallow
  );

  const [isPreferencesSet, setIsPreferencesSet] = useFn(
    (s) => [s.isPreferencesSet, s.setIsPreferencesSet],
    shallow
  );

  return {
    preferences,
    setPreferences,
    isPreferencesSet,
    setIsPreferencesSet
  };
};
