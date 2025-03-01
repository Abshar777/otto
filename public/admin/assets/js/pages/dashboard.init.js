function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var r = document.getElementById(e).getAttribute("data-colors");
    return (r = JSON.parse(r)).map(function (e) {
      var r = e.replace(" ", "");
      if (-1 == r.indexOf("--")) return r;
      var t = getComputedStyle(document.documentElement).getPropertyValue(r);
      return t || void 0;
    });
  }
}
var options = {
    series: [{ data: [2, 36, 22, 30, 12, 38] }],
    chart: { type: "line", height: 61, sparkline: { enabled: !0 } },
    colors: (barchartColors = getChartColorsArray("mini-1")),
    stroke: { curve: "smooth", width: 2.5 },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: { show: !1 },
    },
  },
  chart = new ApexCharts(document.querySelector("#mini-1"), options);
chart.render();
options = {
  series: [{ data: [36, 12, 30, 20, 36, 14] }],
  chart: { type: "line", height: 61, sparkline: { enabled: !0 } },
  colors: (barchartColors = getChartColorsArray("mini-2")),
  stroke: { curve: "smooth", width: 2.5 },
  tooltip: {
    fixed: { enabled: !1 },
    x: { show: !1 },
    y: {
      title: {
        formatter: function (e) {
          return "";
        },
      },
    },
    marker: { show: !1 },
  },
};
(chart = new ApexCharts(document.querySelector("#mini-2"), options)).render();
options = {
  series: [{ data: [14, 40, 14, 46, 28, 38] }],
  chart: { type: "line", height: 61, sparkline: { enabled: !0 } },
  colors: (barchartColors = getChartColorsArray("mini-3")),
  stroke: { curve: "smooth", width: 2.5 },
  tooltip: {
    fixed: { enabled: !1 },
    x: { show: !1 },
    y: {
      title: {
        formatter: function (e) {
          return "";
        },
      },
    },
    marker: { show: !1 },
  },
};
(chart = new ApexCharts(document.querySelector("#mini-3"), options)).render();
options = {
  series: [{ data: [34, 2, 30, 12, 35, 20] }],
  chart: { type: "line", height: 61, sparkline: { enabled: !0 } },
  colors: (barchartColors = getChartColorsArray("mini-4")),
  stroke: { curve: "smooth", width: 2.5 },
  tooltip: {
    fixed: { enabled: !1 },
    x: { show: !1 },
    y: {
      title: {
        formatter: function (e) {
          return "";
        },
      },
    },
    marker: { show: !1 },
  },
};
(chart = new ApexCharts(document.querySelector("#mini-4"), options)).render();

var barchartColors = getChartColorsArray("earning-item"),
  options = {
    series: [
      {
        data: [
          {
            x: "Iphone",
            y: [
              new Date("2021-10-02").getTime(),
              new Date("2021-10-10").getTime(),
            ],
            fillColor: barchartColors[0],
          },
          {
            x: "Android",
            y: [
              new Date("2021-10-12").getTime(),
              new Date("2021-10-21").getTime(),
            ],
            fillColor: barchartColors[1],
          },
          {
            x: "Watch 8",
            y: [
              new Date("2021-10-06").getTime(),
              new Date("2021-10-16").getTime(),
            ],
            fillColor: barchartColors[0],
          },
          {
            x: "Books",
            y: [
              new Date("2021-10-12").getTime(),
              new Date("2021-10-22").getTime(),
            ],
            fillColor: barchartColors[1],
          },
          {
            x: "Speaker",
            y: [
              new Date("2021-10-05").getTime(),
              new Date("2021-10-16").getTime(),
            ],
            fillColor: barchartColors[0],
          },
          {
            x: "Cover",
            y: [
              new Date("2021-10-17").getTime(),
              new Date("2021-10-26").getTime(),
            ],
            fillColor: barchartColors[1],
          },
        ],
      },
    ],
    chart: { height: 381, type: "rangeBar", toolbar: { show: !1 } },
    plotOptions: { bar: { horizontal: !0, barHeight: "30%" } },
    xaxis: { type: "datetime" },
  };
(chart = new ApexCharts(
  document.querySelector("#earning-item"),
  options
)).render(),
  Chart.pluginService.register({
    afterUpdate: function (e) {
      for (var r, t = 1; t < e.config.data.labels.length; t++) {
        (r = e.getDatasetMeta(0).data[t]).round = {
          x: (e.chartArea.left + e.chartArea.right) / 2,
          y: (e.chartArea.top + e.chartArea.bottom) / 2,
          radius: (e.outerRadius + e.innerRadius) / 2,
          thickness: (e.outerRadius - e.innerRadius) / 2 - 1,
          backgroundColor: r._model.backgroundColor,
        };
      }
      (r = e.getDatasetMeta(0).data[0]).round = {
        x: (e.chartArea.left + e.chartArea.right) / 2,
        y: (e.chartArea.top + e.chartArea.bottom) / 2,
        radius: (e.outerRadius + e.innerRadius) / 2,
        thickness: (e.outerRadius - e.innerRadius) / 2 - 1,
        backgroundColor: r._model.backgroundColor,
      };
    },
    afterDraw: function (e) {
      for (var r = 1; r < e.config.data.labels.length; r++) {
        var t = e.chart.ctx;
        arc = e.getDatasetMeta(0).data[r];
        Math.PI, arc._view.startAngle;
        var a = Math.PI / 2 - arc._view.endAngle;
        t.save(),
          t.translate(arc.round.x, arc.round.y),
          (t.fillStyle = arc.round.backgroundColor),
          t.beginPath(),
          t.arc(
            arc.round.radius * Math.sin(a),
            arc.round.radius * Math.cos(a),
            arc.round.thickness,
            0,
            2 * Math.PI
          ),
          t.closePath(),
          t.fill(),
          t.restore();
      }
      t = e.chart.ctx;
      arc = e.getDatasetMeta(0).data[0];
      Math.PI, arc._view.startAngle;
      a = Math.PI / 2 - arc._view.endAngle;
      t.save(),
        t.translate(arc.round.x, arc.round.y),
        (t.fillStyle = arc.round.backgroundColor),
        t.beginPath(),
        t.arc(
          arc.round.radius * Math.sin(a),
          arc.round.radius * Math.cos(a),
          arc.round.thickness,
          0,
          2 * Math.PI
        ),
        t.closePath(),
        t.fill(),
        t.restore();
    },
  });
var salescategorycolors = getChartColorsArray("sales-category");

const {data}=fetch('/admin/salesByCat',{
  method:"GET",
}).then(res=>res.json()).then(data=>{
  console.log(data);
  
  
  config = {
    type: "doughnut",
    data: {
      labels:Object.keys(data.result).map(e=>e),
      datasets: [
        {
          data:Object.values(data.result).map(e=>e)
          ,
          backgroundColor: salescategorycolors,
          hoverBackgroundColor: salescategorycolors,
          borderWidth: 0,
          borderColor: salescategorycolors,
          hoverBorderWidth: 0,
        },
      ],
    },
    options: {
      responsive: !1,
      legend: { display: !1 },
      tooltips: { enabled: !0 },
      cutoutPercentage: 75,
      rotation: -0.5 * Math.PI,
      circumference: 2 * Math.PI,
      title: { display: !1 },
    },
  },
  ctx = document.getElementById("sales-category");
  window.myDoughnut = new Chart(ctx, config);
})
  
