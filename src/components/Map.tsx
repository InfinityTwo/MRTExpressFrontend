import { useState, useEffect } from "react";
import "../assets/scss/Map.scss";
import MRTImg from "../assets/images/mrtmap.png";
import MRTImgDark from "../assets/images/mrtmapdark.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Map(props: any) {
  return (
    
    <div className={"mrtmapWrapper " + (props.mobileMode && props.mobileSwipeStatus === "mobileUp" ? "mapLower" : "")} onMouseDown={(e) => props.setMobileSwipeStatus("mobileDown")}>
      <TransformWrapper>
        <TransformComponent>
        <img src={props.darkMode ? MRTImgDark : MRTImg} className="mrtmap"></img>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Map;