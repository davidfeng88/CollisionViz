import React from 'react';

import DateSelector from './DateSelector';

class ControlPanel extends React.Component {
  updateDate = (e) => {
    this.props.updateFilter({
      date: e.currentTarget.value,
      loading: true,
    });
  };

  render = () => {
    const { date } = this.props;
    return (
      <div>
        <div className="flex-row">
          <DateSelector
            date={date}
            onChange={this.updateDate}
          />
        </div>
        <div className="flex-row">
          <b>
            2. Select Hour (click on bar)
          </b>
        </div>

      </div>
    );
  };
}

export default ControlPanel;
