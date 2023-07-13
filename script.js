fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const groupedData = {};
    data.series.forEach((item) => {
      const category = item.category;
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
      groupedData[category].push({
        x: item.x,
        y: [new Date(item.y[0]).getTime(), new Date(item.y[1]).getTime()],
        fillColor: item.fillColor,
      });
    });

    for (const category in groupedData) {
      const chartData = groupedData[category];

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
            return label;
          },
          style: {
            colors: ["#f3f4f5", "#fff"],
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              month: "MMM",
            },
          },
        },
       
        yaxis: {
          show: true,
        },
        grid: {
          row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1,
          },
        },
      };

      console.log(groupedData);
      const targetDivId = category.replace(/ /g, "-");
      console.log(targetDivId);
      const chart = new ApexCharts(
        document.querySelector(`#${targetDivId}`),
        options
      );
      chart.render();
    }
  })
  .catch((error) => console.error(error));
