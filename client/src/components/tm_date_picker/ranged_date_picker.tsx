import './date_picker.scss';
import "react-datepicker/dist/react-datepicker.css";

import { FC } from "react";
import DatePicker from "react-datepicker";

interface TMRangedDatePickerProps {
  endDate: Date,
  onChange: (dates: Date[]) => void,
  startDate: Date,

  placeholder?: string,
};

const TMRangedDatePicker: FC<TMRangedDatePickerProps> = ({
  endDate,
  onChange,
  startDate,

  placeholder = '',
}) => (
  <DatePicker
    selected={startDate}
    onChange={onChange}
    startDate={startDate}
    endDate={endDate}
    placeholderText={placeholder}
    selectsRange
  />
);

export default TMRangedDatePicker;
