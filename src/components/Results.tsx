import "../assets/scss/Results.scss";

import StationID from "./StationID";

function Results(props: any) {

  const codeToLine: any = {
    "DT": "Downtown Line",
    "NE": "North East Line",
    "EW": "East-West Line",
    "NS": "North-South Line",
    "CC": "Circle Line",
    "TE": "Thomson-East Coast Line",
    "BP": "Bukit Panjang LRT",
    "SK": "Sengkang LRT",
    "ST": "Sengkang LRT",
    "SE": "Sengkang LRT",
    "SW": "Sengkang LRT",
    "PG": "Punggol LRT",
    "PT": "Punggol LRT",
    "PE": "Punggol LRT",
    "PW": "Punggol LRT",
    "CG": "Changi Airport Branch Line"
  }

  function getColours(searchValue: string) {
    let stationDataLength: number = props.stationsData[searchValue].length;
    let stationColours: any = [];
    let stationCodes: any = props.stationsData[searchValue];
    for (let i = 0; i < stationDataLength; i++) {
      stationColours[i] = props.lineColours[stationCodes[i].slice(0, 2)];
    }
    return stationColours;
  }

  function getResultSubComponent(instructions: Array<any>, index: number, dataLength: number) {
    return(
      instructions.length > 0 ?
        Array.from(Array(instructions.length).keys()).map(each => (
          instructions[each]["type"] === "board" ?

            <div className={"fr searchDetails " + (each === 0 ? "searchDetailsFirst" : "")}>
              <div className="fc lineDecoration">
                <div className={"lineDecorationVertical " + (each === 0 ? "lineDecorationVerticalFirst" : "")}></div>
                <div className="lineDecorationDot"></div>
              </div>
              <div className="searchDetailsDesc">
                <p className="fr">
                  <span>
                    <i>Board at </i>
                    <strong>{instructions[each]["details"] + ", Door " + instructions[each]["door"][props.filterType]}</strong>
                  </span>
                  <span>
                    <i>towards</i>
                    <strong style={{
                      "padding": "4px 8px",
                      "margin": "0px 3px 0px 5px",
                      "borderRadius": "7.5px",
                      "backgroundColor": props.lineColours[instructions[each]["towards"].slice(0, 2)],
                      "color": "white",
                      "fontWeight": 600,
                      "fontSize": "9px",
                    }}>{" " + instructions[each]["towards"]}</strong>
                    <strong>{" " + props.idToName[instructions[each]["towards"]]}</strong>
                  </span>
                </p>
              </div>
            </div>

          : instructions[each]["type"] === "transfer" ?

            <div className={"fr searchDetails " + (each === 0 ? "searchDetailsFirst" : "")}>
              <div className="fc lineDecoration">
                <div className={"lineDecorationVertical " + (each === 0 ? "lineDecorationVerticalFirst" : "")}></div>
                <div className="lineDecorationDot"></div>
              </div>
              <div className="searchDetailsDesc">
                <p>
                  <span>
                    <i>Transfer to the </i>
                    <strong style={{
                      "padding": "7.5px 12.5px",
                      "marginLeft": "5px",
                      "borderRadius": "10px",
                      "backgroundColor": props.lineColours[instructions[each]["description"].slice(0, 2)],
                      "color": "white",
                      "fontWeight": 700,
                      "fontSize": "12px",
                    }}>{codeToLine[instructions[each]["description"].slice(0, 2)]}</strong>
                  </span>
                </p>
              </div>
            </div>

          : <></>
        ))
      : <></>
    );
  }

  function getResultComponent() {
    // console.log(props.axiosData);
    // console.log(props.axiosData["stations"]);
    // console.log(props.axiosData["stations"].length);
    // console.log(props.axiosData["stations"][2]["name"]);
    console.log(props.axiosData["stations"]);
    return Array.from(Array(props.axiosData["stations"].length).keys()).map(i => (
      <div className={"fc resultStations " + (i === 0 ? "startStation" : i === props.axiosData["stations"].length - 1 ? "endStation" : "")} style={{"marginTop": String(10 + 64 * (i === 0 ? 0.5 : props.axiosData["stations"][i - 1]["instructions"].length)) + "px"}}>
        <div className="fr" style={{marginTop: "10px", "height": "75px!important"}}>
          <div className="stationIDWrapper stationIDWrapperSearch fr">
            <StationID size={props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]].length} colours={getColours(props.idToName[props.axiosData["stations"][i]["name"]])} stationCodes={props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]]} />
          </div>
          <p style={{"marginLeft": String(props.stationsData[props.idToName[props.axiosData["stations"][i]["name"]]].length * 0 + 10) + "px"}}>
            {props.idToName[props.axiosData["stations"][i]["name"]]}
          </p>
        </div>
        {getResultSubComponent(props.axiosData["stations"][i]["instructions"], i, props.axiosData["stations"].length)}
      </div>
    ));
  }

  return(
    <div className="resultsWrapper">

      <div className="eta">
        <span>
          <p style={{"fontSize": "18px", "fontWeight": "700"}}>Start</p>
          <p style={{"fontSize": "10px", "fontWeight": "500", "lineHeight": "24px"}}>Est. Travel Time: ~{props.axiosData["time"]} minute(s)</p>
        </span>
        <div className="startBall"></div>
        <div className="startLine"></div>
      </div>

      {getResultComponent()}

      <div className="arr">
        <span>
          <p style={{"fontSize": "11px", "fontWeight": "500"}}>Alight and head to <strong>Exit {props.endPointExit}</strong></p>
          <p style={{"fontSize": "18px", "fontWeight": "700", "lineHeight": "20px"}}>Arrived</p>
        </span>
        <div className="endLine"></div>
        <div className="endBall"></div>
      </div>

    </div>
  );
}

export default Results;