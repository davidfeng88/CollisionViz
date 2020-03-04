import React from 'react';
import {
  timeIntToString,
} from '../../util';

const TimeSelector = ({ finish, onChange, intervalId }) => {
  const time = timeIntToString(finish);
  const disabled = intervalId ? 'disabled' : '';
  return (
    <div>
      <label htmlFor="time">
        <b>
    2. Select Start Time
        </b>
      </label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TimeSelector;

// TimeSelector.propTypes = {
//   isModalOn: PropTypes.bool.isRequired,
//   flipModal: PropTypes.func.isRequired,
// };
