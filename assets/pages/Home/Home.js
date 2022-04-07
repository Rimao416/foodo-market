import React from 'react'
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./home.css";
import { userData } from "../../dummyData";
import BarChart from '../../Components/chart/BarChart';

export default function Home() {
  return (
    <div className="home">
        <FeaturedInfo/>
        <pre></pre>
        <FeaturedInfo/>
    </div>
  );
}
