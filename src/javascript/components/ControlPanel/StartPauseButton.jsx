import React from 'react';

const StartPauseButton = ({
  loading, intervalId, handlePause, handleStart,
}) => {
  if (loading) {
    return (
      <div className="spinner bordered">
        <img src="./assets/images/spinner.svg" />
      </div>
    );
  }
  const startPauseButtonText = intervalId ? 'Pause' : 'Start';
  const handleClick = intervalId ? handlePause : handleStart;
  return (
    <div>
      <b>
        3. Click Here!
      </b>
      <div
        className="start-button clickable-div bordered"
        onClick={handleClick}
      >
        {startPauseButtonText}
      </div>
    </div>

  );
};

export default StartPauseButton;

// StartPauseButton.propTypes = {
//   isModalOn: PropTypes.bool.isRequired,
//   flipModal: PropTypes.func.isRequired,
// };
