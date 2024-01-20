import { useState, useEffect } from "react";
import "../assets/scss/Map.scss";
import MRTImg from "../assets/images/mrtmap.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Map() {
  return (
    
    <div className="mrtmapWrapper">
      <TransformWrapper>
        <TransformComponent>
        <img src={MRTImg} className="mrtmap"></img>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Map;