import React, { useState } from 'react';
import DatePicker from  './DateField';

const DatePickerExample = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};

export default DatePickerExample;
