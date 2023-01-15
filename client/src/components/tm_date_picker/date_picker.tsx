import './date_picker.scss';
import "react-datepicker/dist/react-datepicker.css";

import { FC } from "react";
import DatePicker from "react-datepicker";

interface ITMDatePicker {
  date: Date,
  onChange: (date: Date) => void,

  showTimeSelect?: boolean,
};

const TMDatePicker: FC<ITMDatePicker> = ({
  date,
  onChange,
  showTimeSelect = false,
}) => (
  <DatePicker
    selected={date}
    onChange={onChange}
    showTimeSelect={showTimeSelect}
  />
);

export default TMDatePicker;
