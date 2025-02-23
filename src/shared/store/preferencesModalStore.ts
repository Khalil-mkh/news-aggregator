import shallow from "zustand/shallow";
import { stateSetterHandler } from "../../libs/zustand/helpers";
import { createStore } from "../../libs/zustand";

export type PreferencesModalState = {
  open: boolean;
};

const initState: PreferencesModalState = {
  open: false,
};

const useFn = createStore({
  devtools: false,
  persist: false,
})(initState, (set) => {
  const handler = stateSetterHandler(set);
  return {
    setOpen: handler("open"),
  };
});

export const usePreferencesModalStore = () => {
  const [open, setOpen] = useFn((s) => [s.open, s.setOpen], shallow);

  return {
    open,
    setOpen,
  };
};
