import '../index.scss';
import "react-datepicker/dist/react-datepicker.css";

import { FC } from "react";

import DatePicker from "react-datepicker";

interface ITMRangedDatePicker {
  endDate: Date,
  placeholder?: string,
  startDate: Date,
  onChange: (dates: Date[]) => void,
};

const TMRangedDatePicker: FC<ITMRangedDatePicker> = ({
  endDate,
  placeholder = '',
  startDate,
  onChange,
}) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      placeholderText={placeholder}
      selectsRange
    />
  );
};

export default TMRangedDatePicker;
