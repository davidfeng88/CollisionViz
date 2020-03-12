import React from 'react';

import DateSelector from './DateSelector';

class ControlPanel extends React.Component {
  updateField = field => ((e) => {
    e.preventDefault();
    switch (field) {
      case 'date':
        this.props.updateFilter({
          date: e.currentTarget.value,
          loading: true,
        });
        break;

      default:
        break;
    }
  });

  render = () => {
    const { date } = this.props;
    return (
      <div>
        <div className="flex-row">
          <DateSelector
            date={date}
            onChange={this.updateField('date')}
          />
        </div>
        <div className="flex-row start-row">
          <b>
            4. Click on markers for details
          </b>

        </div>
      </div>
    );
  };
}

export default ControlPanel;
