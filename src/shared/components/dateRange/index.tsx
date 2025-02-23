import React from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export type DateRangeType = {
  start: Date;
  end: Date;
};

type DateRangePickerProps = {
  value: DateRangeType;
  onChange: (value: DateRangeType) => void;
};

const DateRange: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const handleChange = (ranges: RangeKeyDict) => {
    const range = ranges.range1;
    if (range?.startDate && range?.endDate) {
      onChange({ start: range.startDate, end: range.endDate });
    }
  };

  return (
    <DateRangePicker
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      months={1}
      minDate={new Date(2010, 0, 1)}
      maxDate={new Date()}
      ranges={[
        {
          startDate: value?.start,
          endDate: value?.end,
        },
      ]}
      direction={"horizontal"}
      className="text-gray-700"
    />
  );
};

export default DateRange;
