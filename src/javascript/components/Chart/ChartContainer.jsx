import React from 'react';
import Chart from './Chart';
import initChart from './GoogleChartAPI';

class ChartContainer extends React.Component {
  componentDidMount = () => {
    const { loading, collisions, updateAppState } = this.props;
    if (!loading) {
      initChart(collisions, updateAppState);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { loading, collisions, updateAppState } = nextProps;
    if (!loading) {
      initChart(collisions, updateAppState);
    }
  };

  render = () => (
    <div className="flex-row">
      <Chart />
    </div>
  );
}

export default ChartContainer;
