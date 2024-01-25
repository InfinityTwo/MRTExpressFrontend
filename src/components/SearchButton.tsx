import "../assets/scss/SearchButton.scss";
import axios from "axios";

function SearchButton(props: any) {

  let exits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  function handleInputCheck() {
    let error = [false, false, false, false];

    if (!Object.keys(props.stationsData).includes(props.startPoint)) {
      error[0] = true;
    }

    if (!Object.keys(props.stationsData).includes(props.endPoint)) {
      error[1] = true;
    }

    if (!Object.keys(props.specialStationExitNamesReversed).includes(props.startPoint)) {
      if (!Object.keys(props.specialStationExitNamesReversed).includes(props.startPoint) && !exits.includes(props.startPointExit)) {
        error[2] = true;
      }
    } else {
      if (!Object.keys(props.specialStationExitNamesReversed[props.startPoint]).includes(props.startPointExit)) {
        error[2] = true;
      }
    }

    if (!Object.keys(props.specialStationExitNamesReversed).includes(props.endPoint)) {
      if (!Object.keys(props.specialStationExitNamesReversed).includes(props.endPoint) && !exits.includes(props.endPointExit)) {
        error[3] = true;
      }
    } else {
      if (!Object.keys(props.specialStationExitNamesReversed[props.endPoint]).includes(props.endPointExit)) {
        error[3] = true;
      }
    }

    props.setErrorBorder(error);
    // console.log(error);
    // console.log(props.startPointExit);
    // console.log(props.endPointExit);
    return !error.includes(true);
  };

  async function axiosRequest() {

    // const sampleOutput = {
    //   "stations": [
    //       {
    //           "name": "NE1",
    //           "instructions": [
    //               {
    //                   "type": "board",
    //                   "station": "NE1",
    //                   "details": "Platform B",
    //                   "door": ["12", "12", "12"],
    //                   "towards": "NE17"
    //               }
    //           ]
    //       },
    //       {
    //           "name": "NE7",
    //           "instructions": [
    //               {
    //                   "type": "transfer",
    //                   "description": "DTL"
    //               },
    //               {
    //                   "type": "board",
    //                   "station": "DT12",
    //                   "details": "Platform A",
    //                   "door": ["8", "11", "9"],
    //                   "towards": "DT35"
    //               }
    //           ]
    //       },
    //       {
    //           "name": "DT13",
    //           "instructions": []
    //       }
    //   ],
    //   "time": 17
    // };

    // props.setAxiosData(sampleOutput);
    // return;
    // console.log(String(props.endPointExit));

    let result = await axios({
      method: 'post',
      baseURL: "https://mrt-kyhg.onrender.com",
      url: '/get_path',
      timeout: 5000,
      data: {
        "start": props.stationsData[props.startPoint][0],
        "end": props.stationsData[props.endPoint][0],
        "exit": (
          Object.keys(props.specialStationExitNamesReversed).includes(props.endPoint) 
          ? String(props.specialStationExitNamesReversed[props.endPoint][props.endPointExit]) 
          : String(props.endPointExit)
        )
      }
    }).then((response) => {
      // console.log(response);
      props.setAxiosData(response["data"]);
      props.setMobileSwipeStatus("mobileUp");
    }, (error) => {
      // console.log(error);
    });
  };

  function handleSearch() {
    if (handleInputCheck()) {
      // console.log("axios now");
      axiosRequest();
    }
  };

  return (
    <>
      <div className="fr">
        <button type="button" className={"filterbutton " + (props.filterEnabled ? " active-filter" : "")} onMouseDown={(e) => {
            props.setFilter((prev: any) => !prev);
            if (!props.filterEnabled) { // reversed as react component hasnt updated
              props.setMobileSwipeStatus("mobileUp");
            };
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
        </button>
        <button type="button" className={"fr searchbutton "} onMouseDown={(e) => {props.setSearch((prev: any) => !prev); props.setFilter(false); handleSearch();}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          <p>Search</p>
        </button>
      </div>
    </>
  );
}

export default SearchButton;