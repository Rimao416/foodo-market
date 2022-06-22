import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
const RadialBar = ({ pointage,year }) => {
const [jourTravail,setJourTravail]=useState(0)
const [jourAbsence,setJourAbsence]=useState(0)

  useEffect(() => {
    let calculJour=0
    let calculAbsence=0
    pointage.map((p) => {
      calculJour+=p.jourTravail
      setJourTravail(calculJour)
      calculAbsence+=p.jourAbsence
      setJourAbsence(calculAbsence)
    });
  }, [pointage]);
  const series = [Math.round((jourTravail*100)/365), Math.round((jourAbsence*100)/365)];
  const options = {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#ffbc34ea", "#0084ff"],
    labels: ["Jour de travail", "Jour d'absence"],
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      position: "bottom",
      offsetX: 0,
      offsetY: 5,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
  };
  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </>
  );
};

export default RadialBar;
