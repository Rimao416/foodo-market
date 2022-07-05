import React, { useEffect, useState } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <pre></pre>
      <FeaturedInfo />
    </div>
  );
}
