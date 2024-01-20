import { useState, useEffect } from "react";
import "../assets/scss/Map.scss";
import MRTImg from "../assets/images/mrtmap.png";

function Map() {
  return (
    <div className="mrtmapWrapper">
      <img src={MRTImg} className="mrtmap"></img>
    </div>
  )
}

export default Map;