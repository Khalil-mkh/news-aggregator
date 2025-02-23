import { FC } from "react";
import { Sources } from "../../config/sources";
import PreferredOptions from "../preferredOptions";
import { UserPreferences } from "../../types/userPreferences";

type Props = {
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences) => void;
};

const SourcesPreferences: FC<Props> = ({ preferences, setPreferences }) => {
  const selectedSources = preferences.sources || null;

  const setSelectedSources = (sources: string[] | null) => {
    setPreferences({ ...preferences, sources });
  };

  return (
    <PreferredOptions
      title="Select Sources"
      options={Sources}
      selectedOptions={selectedSources}
      setSelectedOptions={setSelectedSources}
    />
  );
};

export default SourcesPreferences;
