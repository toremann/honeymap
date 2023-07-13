fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const chartData = data.series.map((item) => ({
      x: item.x,
      y: [new Date(item.y[0]).getTime(), new Date(item.y[1]).getTime()],
      fillColor: item.fillColor,
    }));

    const options = {
      series: [
        {
          data: chartData,
        },
      ],
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          return label 
        },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      xaxis: {
        type: "datetime",
      },
      annotations: {
        xaxis: [
          {
            x: moment().format("YYYY-MM-DD"), 
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Current Date",
            },
          },
        ],
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1,
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  })
  .catch((error) => console.error(error));
