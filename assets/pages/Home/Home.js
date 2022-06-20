import React, { useEffect, useState } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./home.css";
import { userData } from "../../dummyData";
import BarChart from "../../Components/chart/BarChart";
import axios from "axios";
import { toast } from "react-toastify";


export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    const data = await axios
      .get("http://localhost:8000/api/notifications/join")
      .then((response) => console.log(response.data));
    setNotifications(data);
    // toast.info("Vous avez "+notifications.length+ "notifications")
  };
  useEffect(() => {
    fetchNotifications();
  },[]);
 
  return (
    <div className="home">
      {notifications.length}
      <FeaturedInfo />
      <pre></pre>
      <FeaturedInfo />
    </div>
  );
}
