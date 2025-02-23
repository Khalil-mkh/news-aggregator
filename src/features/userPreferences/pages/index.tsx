import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPreferences } from "../types/userPreferences";
import { usePreferencesStore } from "../store/preferencesStore";
import PreferencesLayout from "../../../shared/components/preferencesLayout";
import CategoriesPreferences from "../components/categoriesPreferences";
import SourcesPreferences from "../components/sourcesPreferences";

const UserPreferencesPage = () => {
  const navigate = useNavigate();
  const { setPreferences, setIsPreferencesSet } = usePreferencesStore();
  const [step, setStep] = useState(1);
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>({
    categories: [],
    sources: [],
  });

  const handleSubmit = () => {
    setPreferences(localPreferences);
    setIsPreferencesSet(true);
    navigate("/");
  };

  const renderActions = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="flex items-center justify-end mt-8 space-x-4">
            <button
              className="text-gray-300 hover:underline"
              onClick={() => setStep(step + 1)}
            >
              Skip
            </button>
            <button
              className="bg-tarawera-500 text-white px-4 py-2 rounded-lg hover:bg-tarawera-700 transition-colors"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between items-center mt-8">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-500 hover:underline"
                onClick={() => setStep(step + 1)}
              >
                Skip
              </button>
              <button
                className="bg-tarawera-500 text-white px-4 py-2 rounded-lg hover:bg-tarawera-600 transition-colors"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <button
            className="bg-tarawera-500 w-full text-white px-4 py-2 rounded-lg hover:bg-tarawera-700 transition-colors mt-4"
            onClick={handleSubmit}
          >
            Submit & Continue
          </button>
        );
      default:
        return null;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <CategoriesPreferences
            preferences={localPreferences}
            setPreferences={setLocalPreferences}
          />
        );
      case 2:
        return (
          <SourcesPreferences
            preferences={localPreferences}
            setPreferences={setLocalPreferences}
          />
        );
      case 3:
        return (
          <div className="bg-white p-6 shadow-lg rounded-lg mx-auto w-full max-w-md mt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V6H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Categories
              </h3>
              {localPreferences.categories?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {localPreferences.categories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-gray-600">{category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No categories selected</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V6H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Sources
              </h3>
              {localPreferences.sources?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {localPreferences.sources.map((source, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-gray-600">{source}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No sources selected</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PreferencesLayout actions={renderActions(step)}>
      {renderStepContent(step)}
    </PreferencesLayout>
  );
};

export default UserPreferencesPage;
