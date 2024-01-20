import { useState, useEffect } from "react";
import StationID from "./StationID";
import "../assets/scss/SearchArea.scss";

function SearchArea() {

  const lineColours: any = {
    "EW": "#4a9c56",
    "CG": "#4a9c56",
    "NE": "#784383",
    "TE": "#925d2f",
    "DT": "#265ba3",
    "NS": "#d03c31",
    "CC": "#eca143",
    "CE": "#eca143",
    "BP": "#718472",
    "SW": "#718472",
    "SE": "#718472",
    "PW": "#718472",
    "PE": "#718472",
    "ST": "#718472",
    "PT": "#718472",

  }

  const stationsData: any = {"Tuas Link":["EW33"], "Tuas West Road":["EW32"], "Tuas Crescent":["EW31"], "Gul Circle":["EW30"], "Joo Koon":["EW29"], "Pioneer":["EW28"], "Boon Lay":["EW27"], "Lakeside":["EW26"], "Chinese Garden":["EW25"], "Jurong East":["NS1","EW24"], "Clementi":["EW23"], "Dover":["EW22"], "Buona Vista":["CC22","EW21"], "Commonwealth":["EW20"], "Queenstown":["EW19"], "Redhill":["EW18"], "Tiong Bahru":["EW17"], "Outram Park":["EW16","NE3","TE17"], "Tanjong Pagar":["EW15"], "Raffles Place":["NS26","EW14"], "City Hall":["NS25","EW13"], "Bugis":["EW12","DT14"], "Lavender":["EW11"], "Kallang":["EW10"], "Aljunied":["EW9"], "Paya Lebar":["EW8","CC9"], "Eunos":["EW7"], "Kembangan":["EW6"], "Bedok":["EW5"], "Tanah Merah":["EW4","CG"], "Simei":["EW3"], "Tampines":["EW2","DT32"], "Pasir Ris":["EW1"], "Expo":["CG1","DT35"], "Changi Airport":["CG2"], "Bukit Batok":["NS2"], "Bukit Gombak":["NS3"], "Choa Chu Kang":["NS4","BP1"], "Yew Tee":["NS5"], "Kranji":["NS7"], "Marsiling":["NS8"], "Woodlands": ["NS9","TE2"], "Admiralty":["NS10"], "Sembawang":["NS11"], "Canberra":["NS12"], "Yishun":["NS13"], "Khatib":["NS14"], "Yio Chu Kang":["NS15"], "Ang Mo Kio":["NS16"], "Bishan":["NS17","CC15"], "Braddell":["NS18"], "Toa Payoh":["NS19"], "Novena":["NS20"], "Newton":["NS21","DT11"], "Orchard":["TE14","NS22"], "Somerset":["NS23"], "Dhoby Ghaut":["NS24","NE6","CC1"], "Marina Bay":["NS27","TE20","CE2"], "Marina South Pier":["NS28"], "South View":["BP2"], "Keat Hong":["BP3"], "Teck Whye":["BP4"], "Phoenix":["BP5"], "Bukit Panjang":["BP6","DT1"], "Petir":["BP7"], "Pending":["BP8"], "Bangkit":["BP9"], "Fajar":["BP10"], "Segar":["BP11"], "Jelapang":["BP12"], "Senja":["BP13"], "HarbourFront":["CC29","NE1"], "Telok Blangah":["CC28"], "Labrador Park":["CC27"], "Pasir Panjang":["CC26"], "Haw Par Villa":["CC25"], "Kent Ridge":["CC24"], "one-north":["CC23"], "Holland Village":["CC21"], "Farrer Road":["CC20"], "Botanic Gardens":["CC19","DT9"], "Caldecott":["CC17","TE9"], "Marymount":["CC16"], "Lorong Chuan":["CC14"], "Serangoon":["NE12", "CC13"], "Bartley":["CC12"], "Tai Seng":["CC11"], "MacPherson":["DT26","CC10"], "Dakota":["CC8"],"Mountbatten":["CC7"], "Stadium":["CC6"], "Nicoll Highway":["CC5"], "Promenade":["DT15","CC4"], "Esplanade":["CC3"], "Bras Basah":["CC2"], "Chinatown":["NE4","DT19"], "Clarke Quay":["NE5"], "Little India":["NE7","DT12"], "Farrer Park":["NE8"], "Boon Keng":["NE9"], "Potong Pasir":["NE10"], "Woodleigh":["NE11"], "Kovan":["NE13"], "Hougang":["NE14"], "Buangkok":["NE15"], "Sengkang":["NE16","STC"], "Punggol":["NE17","PTC"], "Woodlands North":["TE1"], "Woodlands South":["TE3"], "Springleaf":["TE4"], "Lentor":["TE5"], "Mayflower":["TE6"], "Bright Hill":["TE7"], "Upper Thomson":["TE8"], "Stevens":["TE11"], "Napier":["TE12"], "Orchard Boulevard":["TE13"], "Great World":["TE15"], "Havelock":["TE16"], "Maxwell":["TE17"], "Shenton Way":["TE19"], "Gardens by the Bay":["TE22"], "Cashew":["DT2"], "Hillview":["DT3"], "Beauty World":["DT5"], "King Albert Park":["DT6"], "Sixth Avenue":["DT7"], "Tan Kah Kee":["DT8"], "Rochor":["DT13"], "Downtown":["DT17"], "Telok Ayer":["DT18"], "Fort Canning":["DT20"], "Bencoolen":["DT21"], "Jalan Besar":["DT22"], "Bendemeer":["DT23"], "Geylang Bahru":["DT24"], "Mattar":["DT25"], "Ubi":["DT27"], "Kaki Bukit":["DT28"], "Bedok North":["Bedok Reservoir"], "Tampines West":["DT31"], "Tampines East":["DT33"], "Upper Changi":["DT34"], "Cheng Lim":["SW1"], "Farmway":["SW2"], "Kupang":["SW3"], "Thanggam":["SW4"], "Fernvale":["SW5"], "Layar":["SW6"], "Tongkang":["SW7"], "Renjong":["Sw8"], "Compassvale":["SE1"], "Rumbia":["SE2"], "Bakau":["SE3"], "Kangkar":["SE4"], "Ranggung":["SE5"], "Sam Kee":["PW1"], "Punggol Point":["PW3"], "Samudera":["PW4"], "Nibong":["PW5"], "Sumang":["PW6"], "Soo Teck":["PW7"], "Cove":["PE1"], "Meridian":["PE2"], "Coral Edge":["PE3"], "Riviera":["PE4"], "Kaladoor":["PE5"], "Oasis":["PE6"], "Damai":["PE7"]};

  const stationsSkippedExits: any = {
    "Little India": ["B"],
  };

  const [startPoint, setStartPoint] = useState("Outram Park");
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

  function handleSelectChange(e: any, setter: Function) {
    setter(e.target.value);
    // console.log(startPointExit);
  }

  function getExits(lastExit: String | number, stationName: string) {
    if (Object.keys(stationsData).includes(stationName) === false) {
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
    let stationDataLength: number = stationsData[searchValue].length;
    let stationColours: any = [];
    let stationCodes: any = stationsData[searchValue];
    for (let i = 0; i < stationDataLength; i++) {
      stationColours[i] = lineColours[stationCodes[i].slice(0, 2)];
    }
    return stationColours;
  }

  function handleSearchUpdate(searchValue: string, setSize: Function, setColours: Function, setCodes: Function) {
    if (Object.keys(stationsData).includes(searchValue)) {
      setSize(stationsData[searchValue].length);
      setColours(getColours(searchValue));
      setCodes(stationsData[searchValue]);
    } else {
      setSize(0);
      setColours([]);
      setCodes([]);
    };
  }

  // to be replaced
  function searchForStationName(keyword: string) {
    keyword = keyword.toLowerCase();
    let stationLists = Object.keys(stationsData);
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

  // useEffect(() => {
  //   console.log(startPointExit);
  // }, [startPointExit]);

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
        <input type="text" className="search-field startpoint" value={startPoint} style={{"paddingLeft": String(stationIDStartSize * 40 + 20) + "px",}} 
            onFocus={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults);}} 
            onChange={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults);}} 
            onBlur={(e) => {setTimeout(() => {setSearchStartResults([])}, 100)}}
          >
        </input>
        <select id="startpointexitid" className="exits" value={startPointExit} onChange={(e) => handleSelectChange(e, setStartPointExit)}>
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
                    <StationID size={stationsData[searchStartResults[i]].length} colours={getColours(searchStartResults[i])} stationCodes={stationsData[searchStartResults[i]]} />
                  </div>
                  <p style={{"paddingLeft": String(stationsData[searchStartResults[i]].length * 40 + 15) + "px"}}>{searchStartResults[i]}</p>
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
        <input type="text" className="search-field endpoint" value={endPoint} style={{"paddingLeft": String(stationIDDestSize * 40 + 20) + "px"}} 
          onFocus={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults);}}
          onChange={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults);}}
          onBlur={(e) => {setTimeout(() => {setSearchEndResults([])}, 100)}}
        >
        </input>
        <select id="endpointexitid" className="exits" value={endPointExit} onChange={(e) => handleSelectChange(e, setEndPointExit)}>
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
                    <StationID size={stationsData[searchEndResults[i]].length} colours={getColours(searchEndResults[i])} stationCodes={stationsData[searchEndResults[i]]} />
                  </div>
                  <p style={{"paddingLeft": String(stationsData[searchEndResults[i]].length * 40 + 15) + "px"}}>{searchEndResults[i]}</p>
                </button>
              </>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default SearchArea;