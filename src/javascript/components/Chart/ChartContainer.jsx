import React from 'react';
import Chart from './Chart';
import drawChart from './GoogleChartAPI';

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.chartInited = false;
  }

  componentWillReceiveProps = (nextProps) => {
    /* loading changes from true to false
      => new collisions from a new date received
      => need to redraw the chart
    */
    const { loading } = this.props;
    if (loading && !nextProps.loading) {
      drawChart(nextProps.collisions, nextProps.updateAppState);
    }
  };

  render = () => (
    <div className="flex-row">
      <Chart />
    </div>
  );
}

export default ChartContainer;
