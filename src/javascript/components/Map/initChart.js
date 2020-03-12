const initChart = (collisions, updateFilter) => {
  google.charts.load('current', {
    packages: ['corechart'],
  });
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn({
      type: 'timeofday',
      label: 'Time',
    });
    data.addColumn({
      type: 'number',
      label: 'No Injuries/Deaths',
    });
    data.addColumn({
      type: 'number',
      label: 'With Injuries',
    });
    data.addColumn({
      type: 'number',
      label: 'With Deaths',
    });
    let noInjuriesThisHour = 0;
    let injuriesThisHour = 0;
    let deathsThisHour = 0;
    let totalCount = 0;
    for (let hour = 0; hour <= 23; hour++) {
      if (hour in collisions) {
        collisions[hour].forEach((collision) => {
          if (collision.number_of_persons_killed > 0) {
            deathsThisHour += 1;
          } else if (collision.number_of_persons_injured > 0) {
            injuriesThisHour += 1;
          } else {
            noInjuriesThisHour += 1;
          }
        });
      }
      const label = `${hour.toString()}:00 - ${(hour)
        .toString()}:59`;
      data.addRow([{
        v: [hour, 30, 0],
        f: label,
      },
      noInjuriesThisHour, injuriesThisHour, deathsThisHour,
      ]);
      totalCount += noInjuriesThisHour + injuriesThisHour + deathsThisHour;
      noInjuriesThisHour = 0;
      injuriesThisHour = 0;
      deathsThisHour = 0;
    }
    const title = `Time Distribution of ${totalCount.toString()} Collisions`;
    const options = {
      animation: {
        startup: true,
        duration: 300,
      },
      chartArea: {
        width: '90%',
      },
      colors: ['#4285f4', '#f4b400', '#db4437'],
      width: 500,
      height: 300,
      hAxis: {
        baselineColor: 'white',
        gridlines: {
          color: 'white',
        },
      },
      vAxis: {
        ticks: [0, 20, 40, 60],
      },
      fontSize: 14,
      title,
      legend: {
        position: 'top',
        maxLines: 5,
      },
      isStacked: true,
      bar: {
        groupWidth: '100%',
      },
    };
    const chart = new google.visualization
      .ColumnChart(document.getElementById('chart-div'));

    const selectHandler = () => {
      const selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        const hour = selectedItem.row;
        updateFilter({
          hour,
        });
      }
    };

    google.visualization.events
      .addListener(chart, 'select', selectHandler);

    chart.draw(data, options);
  });
};

export default initChart;
