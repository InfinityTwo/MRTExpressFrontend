import { useState, useEffect } from "react";
import StationID from "./StationID";
import "../assets/scss/SearchArea.scss";
import SearchButton from './SearchButton';

function SearchArea(props: any) {

  const stationsSkippedExits: any = {
    "Little India": ["B"],
  };

  const [startPoint, setStartPoint] = useState("");
  const [startPointExit, setStartPointExit] = useState("");

  const [endPoint, setEndPoint] = useState("");
  const [endPointExit, setEndPointExit] = useState("");

  const [startPointLastExit, setStartPointLastExit] = useState("F");
  const [destPointLastExit, seDestPointLastExit] = useState("F");

  const [stationIDStartSize, setStationIDStartSize] = useState(0);
  const [stationIDStartColours, setStationIDStartColours] = useState([]);
  const [stationIDStartCodes, setStationIDStartCodes] = useState([]);

  const [stationIDDestSize, setStationIDDestSize] = useState(0);
  const [stationIDDestColours, setStationIDDestColours] = useState([]);
  const [stationIDDestCodes, setStationIDDestCodes] = useState([]);

  const [searchStartResults, setSearchStartResults] = useState([]);
  const [searchEndResults, setSearchEndResults] = useState([]);

  const [errorBorder, setErrorBorder] = useState([false, false, false, false]);

  function handleSelectChange(e: any, setter: Function) {
    setter(e.target.value);
    // console.log(startPointExit);
  }

  function getExits(lastExit: String | number, stationName: string) {
    if (Object.keys(props.stationsData).includes(stationName) === false) {
      return <option>-</option>;
    };
    let specialStation = stationsSkippedExits[stationName];
    if (Number.isInteger(lastExit)) {
      if (specialStation !== undefined) {
        return Array.from(Array(10).keys()).map(i => (specialStation.includes(i + 1) ? <></> : <option>{i + 1}</option>));
      } else {
        return Array.from(Array(10).keys()).map(i => (<option>{i + 1}</option>));
      }
    } else {
      if (specialStation !== undefined) {
        return Array.from(Array(String(lastExit).charCodeAt(0) - 64).keys()).map(i => (
          specialStation.includes(String.fromCharCode(65 + i)) ? <></> : <option>{String.fromCharCode(65 + i)}</option>
        ));
      } else {
        return Array.from(Array(String(lastExit).charCodeAt(0) - 64).keys()).map(i => (
          <option>{String.fromCharCode(65 + i)}</option>
        ));
      }
    }
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

  function handleSearchUpdate(searchValue: string, setSize: Function, setColours: Function, setCodes: Function) {
    if (Object.keys(props.stationsData).includes(searchValue)) {
      setSize(props.stationsData[searchValue].length);
      setColours(getColours(searchValue));
      setCodes(props.stationsData[searchValue]);
    } else {
      setSize(0);
      setColours([]);
      setCodes([]);
    };
  }

  // to be replaced
  function searchForStationName(keyword: string) {
    keyword = keyword.toLowerCase();
    let stationLists = Object.keys(props.stationsData);
    let searchResult = [];
    let index = 0;
    for (let i = 0; i < stationLists.length; i++) {
      if (stationLists[i].toLowerCase().startsWith(keyword)) {
        searchResult[index] = stationLists[i];
        index++;
      }
    }
    return searchResult;
  }

  function limitSearchForStnName(keyword: string) {
    let result = searchForStationName(keyword);
    if (result.length > 5) {
      result = result.slice(0, 5);
    }
    return result;
  }

  function searchKeyUpHandler(keyword: string, setSearchResult: Function) {
    if (keyword !== "") {
      let results = limitSearchForStnName(keyword);
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  }

  function revertErrorBorder(index: number) {
    setErrorBorder((prev) => {
      let newCheck = prev;
      newCheck[index] = false;
      return newCheck;
    });
  }

  useEffect(() => {
    revertErrorBorder(2);
  }, [startPointExit, startPointLastExit]);

  useEffect(() => {
    revertErrorBorder(3);
  }, [endPointExit, destPointLastExit]);

  useEffect(() => {
    handleSearchUpdate(startPoint, setStationIDStartSize, setStationIDStartColours, setStationIDStartCodes);
  }, [startPoint]);

  useEffect(() => {
    handleSearchUpdate(endPoint, setStationIDDestSize, setStationIDDestColours, setStationIDDestCodes);
  }, [endPoint]);

  // useEffect(() => {
    // console.log(searchForStationName("Woodla"));
  // });

  return (
    <>
      <div className="searchArea ">

        <div className="fr">
          <p className="whereto">Where to?</p>
          <p className="exittext">Exit</p>
        </div>

        <div className="fr searchStartWrapper" style={
          {
            "borderBottomLeftRadius": (searchStartResults.length > 0 ? "0px" : "5px"),
            "borderBottomRightRadius": (searchStartResults.length > 0 ? "0px" : "5px"),
          }
        }>
          <div className="stationIDWrapper">
            <StationID size={stationIDStartSize} colours={stationIDStartColours} stationCodes={stationIDStartCodes} />
          </div>
          <input type="text" className="search-field startpoint" placeholder="Starting Point.." value={startPoint} style={{"paddingLeft": String(stationIDStartSize * 40 + 20) + "px", "color": errorBorder[0] ? "red" : "black"}} 
              onFocus={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults); revertErrorBorder(0)}} 
              onChange={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults);}} 
              onBlur={(e) => {setTimeout(() => {setSearchStartResults([])}, 100)}}
            >
          </input>
          <select id="startpointexitid" className="exits" value={startPointExit} onChange={(e) => handleSelectChange(e, setStartPointExit)} style={{"color": errorBorder[2] ? "red" : "black"}}>
            {getExits(startPointLastExit, startPoint)}
          </select>
          <div className="dropdownSearch fc" style={{"height": String(searchStartResults.length * 60) + "px", "zIndex": 10}}>
            {
              Array.from(Array(searchStartResults.length).keys()).map(i => (
                <>
                  <button className="dropdownButtons" style={
                      {
                        "borderBottomLeftRadius": (i !== searchStartResults.length - 1 ? "0px" : "5px"),
                        "borderBottomRightRadius": (i !== searchStartResults.length - 1  ? "0px" : "5px"),
                      }
                    } onMouseUp={(e) => setStartPoint(searchStartResults[i])}>
                    <div className="stationIDWrapper stationIDWrapperSearch">
                      <StationID size={props.stationsData[searchStartResults[i]].length} colours={getColours(searchStartResults[i])} stationCodes={props.stationsData[searchStartResults[i]]} />
                    </div>
                    <p style={{"paddingLeft": String(props.stationsData[searchStartResults[i]].length * 40 + 15) + "px"}}>{searchStartResults[i]}</p>
                  </button>
                </>
              ))
            }
          </div>
        </div>

        <div className="fr searchEndWrapper" style={
          {
            "borderBottomLeftRadius": (searchEndResults.length > 0 ? "0px" : "5px"),
            "borderBottomRightRadius": (searchEndResults.length > 0 ? "0px" : "5px"),
          }
        }>
          <div className="stationIDWrapper">
            <StationID size={stationIDDestSize} colours={stationIDDestColours} stationCodes={stationIDDestCodes} />
          </div>
          <input type="text" className="search-field endpoint" placeholder="Destination.." value={endPoint} style={{"paddingLeft": String(stationIDDestSize * 40 + 20) + "px", "color": errorBorder[1] ? "red" : "black"}} 
            onFocus={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults); revertErrorBorder(1);}}
            onChange={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults);}}
            onBlur={(e) => {setTimeout(() => {setSearchEndResults([])}, 100)}}
          >
          </input>
          <select id="endpointexitid" className="exits" value={endPointExit} onChange={(e) => handleSelectChange(e, setEndPointExit)} style={{"color": errorBorder[3] ? "red" : "black"}}>
            {getExits(destPointLastExit, endPoint)}
          </select>
          <div className="dropdownSearch fc" style={{"height": String(searchEndResults.length * 60) + "px", "zIndex": 10}}>
            {
              Array.from(Array(searchEndResults.length).keys()).map(i => (
                <>
                  <button className="dropdownButtons" style={
                      {
                        "borderBottomLeftRadius": (i !== searchEndResults.length - 1 ? "0px" : "5px"),
                        "borderBottomRightRadius": (i !== searchEndResults.length - 1  ? "0px" : "5px"),
                      }
                    } onMouseUp={(e) => setEndPoint(searchEndResults[i])}>
                    <div className="stationIDWrapper stationIDWrapperSearch">
                      <StationID size={props.stationsData[searchEndResults[i]].length} colours={getColours(searchEndResults[i])} stationCodes={props.stationsData[searchEndResults[i]]} />
                    </div>
                    <p style={{"paddingLeft": String(props.stationsData[searchEndResults[i]].length * 40 + 15) + "px"}}>{searchEndResults[i]}</p>
                  </button>
                </>
              ))
            }
          </div>
        </div>

      </div>
      <SearchButton setFilter={props.setFilter} filterEnabled={props.filterEnabled} searchEnabled={props.searchEnabled} setSearch={props.setSearch} errorBorder={errorBorder} setErrorBorder={setErrorBorder} stationsData={props.stationsData} startPoint={startPoint} endPoint={endPoint} startPointExit={startPointExit} endPointExit={endPointExit} setAxiosData={props.setAxiosData} />
    </>
  )
}

export default SearchArea;