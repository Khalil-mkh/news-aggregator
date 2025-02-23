import shallow from "zustand/shallow";
import { createStore } from "../../libs/zustand";
import { stateSetterHandler } from "../../libs/zustand/helpers";

export type SearchStoreType = {
  searchValue: string;
};

const initState: SearchStoreType = {
  searchValue: "",
};

const useFn = createStore({
  devtools: false,
  persist: false,
})(initState, (set) => {
  const handler = stateSetterHandler(set);
  return {
    setSearchValue: handler("searchValue"),
  };
});

export const useSearchStore = () => {
  const [searchValue, setSearchValue] = useFn(
    (s) => [s.searchValue, s.setSearchValue],
    shallow
  );

  return {
    searchValue,
    setSearchValue,
  };
};
