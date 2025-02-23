import { FC } from "react";

type Option = {
  key: string;
  name: string;
};

type Props = {
  title: string;
  options: Option[];
  selectedOptions: string[] | null;
  setSelectedOptions: (values: string[] | null) => void;
};

const PreferredOptions: FC<Props> = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleOptionChange = (option: string) => {
    if (selectedOptions === null) {
      setSelectedOptions([option]);
    } else {
      const newValues = selectedOptions.includes(option)
        ? selectedOptions.filter((c) => c !== option)
        : [...selectedOptions, option];

      setSelectedOptions(newValues);
    }
  };

  return (
    <div className="bg-white py-8 mx-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedOptions?.includes(option.key) || false}
              onChange={() => handleOptionChange(option.key)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreferredOptions;
