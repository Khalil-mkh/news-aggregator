import { useState } from "react";
import CategoriesPreferences from "../components/categoriesPreferences";
import SourcesPreferences from "../components/sourcesPreferences";
import { UserPreferences } from "../types/userPreferences";
import { useNavigate } from "react-router-dom";
import { usePreferencesStore } from "../store/preferencesStore";
import PreferencesLayout from "../../../shared/components/preferencesLayout";

const UserPreferencesPage = () => {
  const navigate = useNavigate();
  const { setPreferences, setIsPreferencesSet } = usePreferencesStore();
  const [step, setStep] = useState(1);

  const [localPreferences, setLocalPreferences] = useState<UserPreferences>({
    categories: null,
    sources: null,
  });

  const handleSubmit = () => {
    setPreferences(localPreferences);
    setIsPreferencesSet(true);

    navigate("/");
  };

  return (
    <>
      {step === 1 && (
        <PreferencesLayout
          actions={
            <div className="flex items-center justify-end mt-8 space-x-4">
              <button
                className="text-gray-500 hover:underline"
                onClick={() => {
                  //   setSelectedOptions(null);
                  setStep(step + 1);
                }}
              >
                Skip
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          }
        >
          <CategoriesPreferences
            preferences={localPreferences}
            setPreferences={setLocalPreferences}
          />
        </PreferencesLayout>
      )}
      {step === 2 && (
        <PreferencesLayout
          actions={
            <div className="flex justify-between items-center mt-8">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <div className="flex items-center justify-end space-x-4">
                <button
                  className="text-gray-500 hover:underline"
                  onClick={() => {
                    // setSelectedOptions(null);
                    setStep(step + 1);
                  }}
                >
                  Skip
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          }
        >
          <SourcesPreferences
            setStep={setStep}
            preferences={localPreferences}
            setPreferences={setLocalPreferences}
          />
        </PreferencesLayout>
      )}
      {step === 3 && (
        <PreferencesLayout
          actions={
            <button
              className="bg-green-500 w-full text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
              onClick={handleSubmit}
            >
              Submit & Continue
            </button>
          }
        >
          <div className="bg-white p-6 shadow-lg rounded-lg mx-auto">
            <h2 className="text-xl font-semibold">Review Your Preferences</h2>
            <p className="mt-2 text-gray-500">
              <strong>Categories:</strong>{" "}
              {localPreferences.categories?.join(", ") || "None selected"}
            </p>
            <p className="mt-2 text-gray-500">
              <strong>Sources:</strong>{" "}
              {localPreferences.sources?.join(", ") || "None selected"}
            </p>
          </div>
        </PreferencesLayout>
      )}
    </>
  );
};

export default UserPreferencesPage;
