import moment from "moment";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const LineCharts = ({ pointage }) => {
  const [heureSupp,setHeureSupp]=useState([])
  const [heureRetard,setHeureRetard]=useState([])
  const [mois,setMois]=useState([])
  useEffect(() => {
    pointage.map((p) => {
      setHeureSupp([...heureSupp],heureSupp.push(p.heureSupp))
      setHeureRetard([...heureRetard],heureRetard.push(p.heureRetard))
      setMois([...mois],mois.push(moment(p.sentAt,'MM-YYYY').lang('fr').format('MMM')))
    });
  }, [pointage]);
  const series = [
    {
      name: "HS - 2022",
      data: heureSupp,
    },
    {
      name: "HR - 2022",
      data: heureRetard,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Heure Supp/ Heure Retard",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: mois,
      title: {
        text: "Mois",
      },
    },
    yaxis: {
      title: {
        text: "Heures",
      },
      min: 5,
      max: 100,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };
  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </>
  );
};

export default LineCharts;
