import React from 'react';

const DateSelector = ({ date, onChange, intervalId }) => {
  const oneWeekAgo = new Date();
  const disabled = intervalId ? 'disabled' : '';
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoString = oneWeekAgo.toJSON()
    .slice(0, 10);
  return (
    <div>
      <label htmlFor="date">
        <b>
  1. Select Date
        </b>
        <br />
        2012-07-01 ~
        {' '}
        {oneWeekAgoString}
      </label>
      <input
        value={date}
        id="date"
        type="date"
        min="2012-07-01"
        max={oneWeekAgoString}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DateSelector;

// DateSelector.propTypes = {
//   isModalOn: PropTypes.bool.isRequired,
//   flipModal: PropTypes.func.isRequired,
// };
