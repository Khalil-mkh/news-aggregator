import { FC } from "react";
import { Categories } from "../../config/categories";
import PreferredOptions from "../preferredOptions";
import { UserPreferences } from "../../types/userPreferences";

type Props = {
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences) => void;
};

const CategoriesPreferences: FC<Props> = ({
  preferences,
  setPreferences,
}) => {
  const selectedCategories = preferences.categories || null;

  const setSelectedCategories = (categories: string[] | null) => {
    setPreferences({ ...preferences, categories });
  };

  return (
    <PreferredOptions
      title="Select Categories"
      options={Categories}
      selectedOptions={selectedCategories}
      setSelectedOptions={setSelectedCategories}
    />
  );
};

export default CategoriesPreferences;
