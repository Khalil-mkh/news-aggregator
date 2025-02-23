import { FC, useState, useEffect, useRef } from "react";
import { StateSetter } from "../../../types";
import { Categories } from "../../../features/userPreferences/config/categories";
import { Sources } from "../../../features/userPreferences/config/sources";
import { NewspaperIcon, CalendarIcon } from "@heroicons/react/16/solid";
import DateRange, { DateRangeType } from "../dateRange";

type Props = {
  activeCategory: string;
  setActiveCategory: StateSetter<string>;
  setActiveSource: StateSetter<string>;
  dateRange: DateRangeType;
  onDateRangeChange: (value: DateRangeType) => void;
};

const FiltersBar: FC<Props> = ({
  activeCategory,
  setActiveCategory,
  setActiveSource,
  dateRange,
  onDateRangeChange,
}) => {
  const [isSourcePopoverOpen, setIsSourcePopoverOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const sourcePopoverRef = useRef<HTMLDivElement>(null);
  const datePopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sourcePopoverRef.current &&
        !sourcePopoverRef.current.contains(event.target as Node)
      ) {
        setIsSourcePopoverOpen(false);
      }
      if (
        datePopoverRef.current &&
        !datePopoverRef.current.contains(event.target as Node)
      ) {
        setIsDatePopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full start-0 border-b border-gray-200 pt-14 bg-white">
      {/* ✅ Mobile Layout */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3">
        {/* ✅ Category Dropdown */}
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {Categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.name}
            </option>
          ))}
        </select>

        {/* ✅ Mobile Icons */}
        <div className="relative flex space-x-3">
          {/* ✅ Source Selection Button */}
          <button onClick={() => setIsSourcePopoverOpen(!isSourcePopoverOpen)}>
            <NewspaperIcon className="w-6 h-6 text-gray-700 hover:text-blue-500" />
          </button>

          {/* ✅ Source Popover */}
          {isSourcePopoverOpen && (
            <div
              ref={sourcePopoverRef}
              className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Select Sources
              </h3>
              <ul className="space-y-2">
                {Sources.map((source) => (
                  <li key={source.key}>
                    <button
                      className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
                      onClick={() => {
                        setIsSourcePopoverOpen(false);
                      }}
                    >
                      {source.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Date Picker Button */}
          <button onClick={() => setIsDatePopoverOpen(!isDatePopoverOpen)}>
            <CalendarIcon className="w-6 h-6 text-gray-700 hover:text-blue-500" />
          </button>

          {/* ✅ Date Popover */}
          {isDatePopoverOpen && (
            <div
              ref={datePopoverRef}
              className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
            >
              <DateRange
                value={dateRange}
                onChange={(newRange) => onDateRangeChange(newRange)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ✅ Desktop Layout */}
      <div className="hidden sm:flex bg-tarawera-950 text-white justify-between items-center border-b border-gray-700 px-4 py-3">
        {/* ✅ Category Tabs */}
        <div className="flex space-x-6 mx-auto">
          {Categories.map((category) => (
            <button
              key={category.key}
              className={`uppercase font-bold tracking-wide text-sm transition-all cursor-pointer ${
                activeCategory === category.key
                  ? "text-tarawera-300"
                  : "text-white hover:text-gray-300"
              }`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* ✅ Desktop Icons */}
        <div className="relative flex space-x-3">
          {/* ✅ Source Selection */}
          <button onClick={() => setIsSourcePopoverOpen(!isSourcePopoverOpen)}>
            <NewspaperIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
          </button>

          {isSourcePopoverOpen && (
            <div
              ref={sourcePopoverRef}
              className="absolute top-10 right-0 w-44 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Select Sources
              </h3>
              <ul className="space-y-2">
                {Sources.map((source) => (
                  <li key={source.key}>
                    <button
                      className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-md"
                      onClick={() => {
                        setActiveSource(source.key);
                        setIsSourcePopoverOpen(false);
                      }}
                    >
                      {source.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Date Picker */}
          <button onClick={() => setIsDatePopoverOpen(!isDatePopoverOpen)}>
            <CalendarIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
          </button>

          {isDatePopoverOpen && (
            <div
              ref={datePopoverRef}
              className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
            >
              <DateRange
                value={dateRange}
                onChange={(newRange) => onDateRangeChange(newRange)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FiltersBar;
