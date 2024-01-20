import "../assets/scss/StationID.scss";

function StationID(props: any) {

  function none() {
    return (<></>);
  }

  function single() {
    return (
      <div className="fr">
        <div style={{"backgroundColor": props.colours[0]}} className="station-id single">
          {props.stationCodes[0]}
        </div>
      </div>
    )
  }

  function double() {
    return (
      <div className="fr">
        <div style={{"backgroundColor": props.colours[0]}} className="station-id first">
          {props.stationCodes[0]}
        </div>
        <div style={{"backgroundColor": props.colours[1]}} className="station-id last">
          {props.stationCodes[1]}
        </div>
      </div>
    )
  }

  function triple() {
    return (
      <div className="fr">
        <div style={{"backgroundColor": props.colours[0]}} className="station-id first">
          {props.stationCodes[0]}
        </div>
        <div style={{"backgroundColor": props.colours[1]}} className="station-id">
          {props.stationCodes[1]}
        </div>
        <div style={{"backgroundColor": props.colours[2]}} className="station-id last">
          {props.stationCodes[2]}
        </div>
      </div>
    )
  }

  return(
    <>
      {
        props.size === 1
        ? single()
        : props.size === 2
        ? double()
        : props.size === 3
        ? triple()
        : none()
      }
    </>
  );
}

export default StationID;