import './index.scss';
import "react-datepicker/dist/react-datepicker.css";

import { FC } from "react";

import DatePicker from "react-datepicker";

interface ITMDatePickerProps {
  date: Date,
  showTimeSelect?: boolean,
  onChange: (date: Date) => void,
};

const TMDatePicker: FC<ITMDatePickerProps> = ({ date, showTimeSelect = false, onChange }) => {
  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      showTimeSelect={showTimeSelect}
    />
  );
};

export default TMDatePicker;
