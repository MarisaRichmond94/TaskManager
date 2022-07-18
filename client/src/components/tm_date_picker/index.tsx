import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

import DatePicker from "react-datepicker";

const TMDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
  );
};

export default TMDatePicker;
