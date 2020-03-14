import React from 'react';

const DateSelector = ({ date, onChange }) => {
  const API_LATEST_DATE = new Date();
  API_LATEST_DATE.setDate(API_LATEST_DATE.getDate() - 10);
  const API_LATEST_DATE_STRING = API_LATEST_DATE.toJSON()
    .slice(0, 10);
  return (
    <div>
      <label htmlFor="date">
        <b>
  1. Select Date
        </b>
        <br />
        Range: 2012-07-01 ~
        {' '}
        {API_LATEST_DATE_STRING}
      </label>
      <input
        value={date}
        id="date"
        type="date"
        min="2012-07-01"
        max={API_LATEST_DATE_STRING}
        onChange={onChange}
      />
    </div>
  );
};

export default DateSelector;
