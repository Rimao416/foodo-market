import React from 'react'
import "./FeaturedInfo.css";
import { Bar } from 'react-chartjs-2';

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        
        <span className="featuredTitle">Donnée 1</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
        </div>
        <span className="featuredSub">+3.5%</span>
        
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Donnée 2</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
        </div>
        <span className="featuredSub">+6.5%</span>
      </div>
    </div>
  );
}
