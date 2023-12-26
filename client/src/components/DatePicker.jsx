import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ startDate, setStartDate = new Date() }) => {
  return (
    <DatePicker
      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default Datepicker;
