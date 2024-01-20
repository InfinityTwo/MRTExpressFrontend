import "../assets/scss/Results.scss";

import StationID from "./StationID";

function Results(props: any) {

  function getColours(searchValue: string) {
    let stationDataLength: number = props.stationsData[searchValue].length;
    let stationColours: any = [];
    let stationCodes: any = props.stationsData[searchValue];
    for (let i = 0; i < stationDataLength; i++) {
      stationColours[i] = props.lineColours[stationCodes[i].slice(0, 2)];
    }
    return stationColours;
  }

  function getResultComponent() {
    return Array.from(Array(props.axiosData["stations"].length).keys()).map(i => (
      <div className={"resultStations " + (i === 0 ? "startStation" : i === props.axiosData["stations"].length - 1 ? "endStation" : "")}>
        <div className="stationIDWrapper stationIDWrapperSearch">
          <StationID size={props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]].length} colours={getColours(props.idToName[props.axiosData["stations"][i]["name"]])} stationCodes={props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]]} />
        </div>
        <p style={{"marginLeft": String(props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]].length * 40 + 40) + "px"}}>
          {props.idToName[props.axiosData["stations"][i]["name"]]}
        </p>
      </div>
    ));
  }

  return(
    <div className="resultsWrapper">

      {getResultComponent()}

    </div>
  );
}

export default Results;