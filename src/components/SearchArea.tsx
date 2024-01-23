import { useState, useEffect } from "react";
import StationID from "./StationID";
import "../assets/scss/SearchArea.scss";
import SearchButton from './SearchButton';

function SearchArea(props: any) {

  const stationsSkippedExits: any = {
    "Little India": ["B"],
    "Tanjong Pagar": ["I"],
    "Clarke Quay": ["D"]
  };

  const stationLargestExits: any = {'CC24': 'B', 'CC23': 'D', 'CC22': 'D', 'DT1': 'D', 'CC25': 'A', 'CC26': 'A', 'CC27': 'A', 'CC28': 'A', 'CC29': 'E', 'NE1': 'E', 'NE5': 'G', 'NE7': 'F', 'NE8': 'I', 'NE9': 'C', 'NE10': 'C', 'NE11': 'E', 'NE12': 'H', 'CC13': 'H', 'CC14': 'A', 'CC16': 'B', 'CC17': 4, 'TE9': 4, 'CC19': 'B', 'DT9': 'B', 'TE22': 3, 'EW24': 'D', 'NS1': 'D', 'TE18': 3, 'TE19': 6, 'NS28': 'B', 'EW14': 'M', 'NS26': 'M', 'NS25': 'D', 'EW13': 'D', 'NS24': 'G', 'CC1': 'G', 'NE6': 'G', 'NS23': 'D', 'DT2': 'A', 'DT3': 'B', 'DT5': 'C', 'DT6': 'B', 'DT7': 'B', 'DT8': 'B', 'DT12': 'F', 'DT13': 'B', 'NS11': 'D', 'NS12': 'E', 'DT14': 'F', 'NS13': 'E', 'NS14': 'D', 'EW12': 'F', 'NS15': 'C', 'NS16': 'D', 'NS17': 'E', 'DT15': 'C', 'CC15': 'E', 'CC4': 'C', 'DT16': 'E', 'NS18': 'C', 'NS19': 'D', 'CE1': 'E', 'NS20': 'B', 'NS21': 'C', 'DT11': 'C', 'NS22': 13, 'DT17': 'F', 'DT18': 'C', 'NE3': 8, 'DT19': 'F', 'NE4': 'F', 'DT20': 'B', 'DT21': 'C', 'DT22': 'B', 'DT23': 'B', 'DT24': 'B', 'DT25': 'B', 'DT26': 'E', 'TE14': 13, 'TE16': 5, 'TE15': 6, 'TE13': 2, 'TE12': 2, 'TE11': 5, 'DT10': 5, 'NS3': 'D', 'NS27': 5, 'EW23': 'D', 'EW22': 'B', 'NS2': 'D', 'NS4': 'E', 'BP1': 'E', 'NS5': 'D', 'NS7': 'D', 'NS8': 'D', 'NS9': 7, 'TE20': 5, 'TE2': 7, 'TE1': 2, 'CE2': 5, 'CC3': 'G', 'CC2': 'E', 'CC5': 'A', 'CC6': 'B', 'CC7': 'B', 'CC8': 'B', 'CC11': 'C', 'CC12': 'B', 'NE13': 'C', 'NE14': 'C', 'NE15': 'B', 'NE16': 'D', 'TE8': 5, 'TE7': 4, 'TE6': 7, 'TE5': 5, 'TE4': 3, 'TE3': 5, 'NS10': 'D', 'NE17': 'D', 'CC20': 'B', 'CC21': 'C', 'EW21': 'D', 'CC10': 'E', 'DT27': 'B', 'DT28': 'B', 'DT29': 'C', 'DT30': 'B', 'DT31': 'B', 'DT32': 'G', 'EW2': 'G', 'DT33': 'D', 'DT34': 'E', 'DT35': 'G', 'CG1': 'G', 'EW1': 'B', 'EW3': 'A', 'EW4': 'B', 'EW5': 'C', 'EW6': 'B', 'EW7': 'C', 'EW8': 'F', 'CC9': 'F', 'EW9': 'B', 'EW10': 'B', 'EW11': 'B', 'EW15': 'J', 'EW16': 8, 'TE17': 8, 'EW17': 'B', 'EW18': 'B', 'EW19': 'B', 'EW20': 'D', 'EW25': 'C', 'EW26': 'C', 'EW27': 'F', 'EW28': 'B', 'EW29': 'C', 'EW30': 'B', 'EW31': 'B', 'EW32': 'B', 'EW33': 'B', "CG2": "E", "BP2": "A", "BP3": "A", "BP4": "A", "BP5": "A", "BP6": "D", "BP7": "A", "BP8": "A", "BP9": "A", "BP10": "A", "BP11": "A", "BP12": "A", "BP13": "A", "SE1": "B", "SE2": "B", "SE3": "B", "SE4": "B", "SE5": "B", "STC": "D", "SW1": "B", "SW2": "B", "SW3": "B", "SW4": "B", "SW5": "B", "SW6": "B", "SW7": "B", "SW8": "B", "PTC": "D", "PE1": "B", "PE2": "B", "PE3": "B", "PE4": "B", "PE5": "B", "PE6": "B", "PE7": "B", "PW1": "B", "PW3": "B", "PW4": "B", "PW5": "B", "PW6": "B", "PW7": "B"}

  const [startPoint, setStartPoint] = useState("");
  // const [props.startPointExit, props.setStartPointExit] = useState("");

  const [endPoint, setEndPoint] = useState("");
  // const [props.endPointExit, props.setEndPointExit] = useState("");

  const [startPointLastExit, setStartPointLastExit] = useState("");
  const [destPointLastExit, setDestPointLastExit] = useState("");

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
    if (Object.keys(props.stationsData).includes(stationName) === false || lastExit === "") {
      return <option>-</option>;
    };
    let specialStation = stationsSkippedExits[stationName];
    if (Number.isInteger(lastExit)) {
      if (specialStation !== undefined) {
        return Array.from(Array(lastExit).keys()).map(i => (specialStation.includes(i + 1) ? <></> : <option>{i + 1}</option>));
      } else {
        return Array.from(Array(lastExit).keys()).map(i => (<option>{i + 1}</option>));
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
  function search(val: string) {
    let output = [];
    let set = new Set();
    let i = 0;
    val = val.toLowerCase()
    const data = {"Tuas Link":["EW33"], "Tuas West Road":["EW32"], "Tuas Crescent":["EW31"], "Gul Circle":["EW30"], "Joo Koon":["EW29"], "Pioneer":["EW28"], "Boon Lay":["EW27"], "Lakeside":["EW26"], "Chinese Garden":["EW25"], "Jurong East":["NS1","EW24"], "Clementi":["EW23"], "Dover":["EW22"], "Buona Vista":["CC22","EW21"], "Commonwealth":["EW20"], "Queenstown":["EW19"], "Redhill":["EW18"], "Tiong Bahru":["EW17"], "Outram Park":["EW16","NE3","TE17"], "Tanjong Pagar":["EW15"], "Raffles Place":["NS26","EW14"], "City Hall":["NS25","EW13"], "Bugis":["EW12","DT14"], "Lavender":["EW11"], "Kallang":["EW10"], "Aljunied":["EW9"], "Paya Lebar":["EW8","CC9"], "Eunos":["EW7"], "Kembangan":["EW6"], "Bedok":["EW5"], "Tanah Merah":["EW4"], "Simei":["EW3"], "Tampines":["EW2","DT32"], "Pasir Ris":["EW1"], "Expo":["CG1","DT35"], "Changi Airport":["CG2"], "Bukit Batok":["NS2"], "Bukit Gombak":["NS3"], "Choa Chu Kang":["NS4","BP1"], "Yew Tee":["NS5"], "Kranji":["NS7"], "Marsiling":["NS8"], "Woodlands":["NS9","TE2"], "Admiralty":["NS10"], "Sembawang":["NS11"], "Canberra":["NS12"], "Yishun":["NS13"], "Khatib":["NS14"], "Yio Chu Kang":["NS15"], "Ang Mo Kio":["NS16"], "Bishan":["NS17","CC15"], "Braddell":["NS18"], "Toa Payoh":["NS19"], "Novena":["NS20"], "Newton":["NS21","DT11"], "Orchard":["TE14","NS22"], "Somerset":["NS23"], "Dhoby Ghaut":["NS24","NE6","CC1"], "Marina Bay":["NS27","TE20","CE2"], "Marina South Pier":["NS28"], "South View":["BP2"], "Keat Hong":["BP3"], "Teck Whye":["BP4"], "Phoenix":["BP5"], "Bukit Panjang":["BP6","DT1"], "Petir":["BP7"], "Pending":["BP8"], "Bangkit":["BP9"], "Fajar":["BP10"], "Segar":["BP11"], "Jelapang":["BP12"], "Senja":["BP13"], "HarbourFront":["CC29","NE1"], "Telok Blangah":["CC28"], "Labrador Park":["CC27"], "Pasir Panjang":["CC26"], "Haw Par Villa":["CC25"], "Kent Ridge":["CC24"], "one-north":["CC23"], "Holland Village":["CC21"], "Farrer Road":["CC20"], "Botanic Gardens":["CC19","DT9"], "Caldecott":["CC17","TE9"], "Marymount":["CC16"], "Lorong Chuan":["CC14"], "Serangoon":["NE12", "CC13"], "Bartley":["CC12"], "Tai Seng":["CC11"], "MacPherson":["DT26","CC10"], "Dakota":["CC8"],"Mountbatten":["CC7"], "Stadium":["CC6"], "Nicoll Highway":["CC5"], "Promenade":["DT15","CC4"], "Esplanade":["CC3"], "Bras Basah":["CC2"], "Bayfront": ["DT16", "CE1"], "Chinatown":["NE4","DT19"], "Clarke Quay":["NE5"], "Little India":["NE7","DT12"], "Farrer Park":["NE8"], "Boon Keng":["NE9"], "Potong Pasir":["NE10"], "Woodleigh":["NE11"], "Kovan":["NE13"], "Hougang":["NE14"], "Buangkok":["NE15"], "Sengkang":["NE16","STC"], "Punggol":["NE17","PTC"], "Woodlands North":["TE1"], "Woodlands South":["TE3"], "Springleaf":["TE4"], "Lentor":["TE5"], "Mayflower":["TE6"], "Bright Hill":["TE7"], "Upper Thomson":["TE8"], "Stevens":["TE11", "DT10"], "Napier":["TE12"], "Orchard Boulevard":["TE13"], "Great World":["TE15"], "Havelock":["TE16"], "Maxwell":["TE18"], "Shenton Way":["TE19"], "Gardens by the Bay":["TE22"], "Cashew":["DT2"], "Hillview":["DT3"], "Beauty World":["DT5"], "King Albert Park":["DT6"], "Sixth Avenue":["DT7"], "Tan Kah Kee":["DT8"], "Rochor":["DT13"], "Downtown":["DT17"], "Telok Ayer":["DT18"], "Fort Canning":["DT20"], "Bencoolen":["DT21"], "Jalan Besar":["DT22"], "Bendemeer":["DT23"], "Geylang Bahru":["DT24"], "Mattar":["DT25"], "Ubi":["DT27"], "Kaki Bukit":["DT28"], "Bedok North":["DT29"], "Bedok Reservoir":["DT30"], "Tampines West":["DT31"], "Tampines East":["DT33"], "Upper Changi":["DT34"], "Cheng Lim":["SW1"], "Farmway":["SW2"], "Kupang":["SW3"], "Thanggam":["SW4"], "Fernvale":["SW5"], "Layar":["SW6"], "Tongkang":["SW7"], "Renjong":["SW8"], "Compassvale":["SE1"], "Rumbia":["SE2"], "Bakau":["SE3"], "Kangkar":["SE4"], "Ranggung":["SE5"], "Sam Kee":["PW1"], "Punggol Point":["PW3"], "Samudera":["PW4"], "Nibong":["PW5"], "Sumang":["PW6"], "Soo Teck":["PW7"], "Cove":["PE1"], "Meridian":["PE2"], "Coral Edge":["PE3"], "Riviera":["PE4"], "Kaladoor":["PE5"], "Oasis":["PE6"], "Damai":["PE7"]};
    for (let j = 0; j < 20; j += 1) {
        for (let searched in data) {
            let new_searched = searched.slice(j)
            if (new_searched.toLowerCase().startsWith(val) && !set.has(searched)) {
                output[i] = searched;
                set.add(searched)
                i += 1;
            }
        }
        if (j == 0) {
            output.sort()
        }
    }
    return output;
  }

  function searchForStationName(keyword: string) {
    keyword = keyword.toLowerCase();
    return search(keyword);
    // let stationLists = Object.keys(props.stationsData);
    // let searchResult = [];
    // let index = 0;
    // for (let i = 0; i < stationLists.length; i++) {
    //   if (stationLists[i].toLowerCase().startsWith(keyword)) {
    //     searchResult[index] = stationLists[i];
    //     index++;
    //   }
    // }
    // return searchResult;
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
  }, [props.startPointExit, startPointLastExit]);

  useEffect(() => {
    revertErrorBorder(3);
  }, [props.endPointExit, destPointLastExit]);

  useEffect(() => {
    // console.log(startPoint);
    handleSearchUpdate(startPoint, setStationIDStartSize, setStationIDStartColours, setStationIDStartCodes);
    if (Object.keys(props.stationsData).includes(startPoint)) {
      // console.log(startPoint);
      // console.log(stationLargestExits[props.stationsData[startPoint][0]]);
      setStartPointLastExit(stationLargestExits[props.stationsData[startPoint][0]]);
      props.setStartPointExit(Number.isInteger(stationLargestExits[props.stationsData[startPoint][0]]) ? "1" : "A")
    } else {
      setStartPointLastExit("");
    }
  }, [startPoint]);

  useEffect(() => {
    handleSearchUpdate(endPoint, setStationIDDestSize, setStationIDDestColours, setStationIDDestCodes);
    if (Object.keys(props.stationsData).includes(endPoint)) {
      // console.log(startPoint);
      // console.log(stationLargestExits[props.stationsData[startPoint][0]]);
      setDestPointLastExit(stationLargestExits[props.stationsData[endPoint][0]]);
      props.setEndPointExit(Number.isInteger(stationLargestExits[props.stationsData[endPoint][0]]) ? "1" : "A")
    } else {
      setDestPointLastExit("");
    }
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

        <div className="fc searchStartWrapper" style={
          {
            "borderBottomLeftRadius": (searchStartResults.length > 0 ? "0px" : "5px"),
            "borderBottomRightRadius": (searchStartResults.length > 0 ? "0px" : "5px"),
          }
        }>
          <div className="fr">
            <div className="stationIDWrapper">
              <StationID size={stationIDStartSize} colours={stationIDStartColours} stationCodes={stationIDStartCodes} />
            </div>
            <input type="text" className="search-field startpoint" placeholder="Starting Point.." value={startPoint} style={{"paddingLeft": String(stationIDStartSize * 0 + 10) + "px", "color": errorBorder[0] ? "red" : "black"}} 
                onFocus={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults); revertErrorBorder(0)}} 
                onChange={(e) => {setStartPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchStartResults);}} 
                onBlur={(e) => {setTimeout(() => {setSearchStartResults([])}, 100)}}
              >
            </input>
            <select id="startpointexitid" className="exits" value={props.startPointExit} onChange={(e) => handleSelectChange(e, props.setStartPointExit)} style={{"color": errorBorder[2] ? "red" : "black"}}>
              {getExits(startPointLastExit, startPoint)}
            </select>
          </div>
          <div style={{height: "0px"}}>
            <div className="dropdownSearch fc" style={{"height": String(searchStartResults.length * 60) + "px", "zIndex": 10, "marginTop": "10px", "border": (searchStartResults.length > 0 ?"1px solid #00000022" : "")}}>
              {
                Array.from(Array(searchStartResults.length).keys()).map(i => (
                  <>
                    <button className="dropdownButtons fr" style={
                        {
                          "borderBottomLeftRadius": (i !== searchStartResults.length - 1 ? "0px" : "5px"),
                          "borderBottomRightRadius": (i !== searchStartResults.length - 1  ? "0px" : "5px"),
                        }
                      } onMouseDown={(e) => {setStartPoint(searchStartResults[i]); console.log(searchStartResults[i])}}>
                      <div className="stationIDWrapper stationIDWrapperSearch" style={{margin: "auto 0"}}>
                        <StationID size={props.stationsData[searchStartResults[i]].length} colours={getColours(searchStartResults[i])} stationCodes={props.stationsData[searchStartResults[i]]} />
                      </div>
                      <p style={{"paddingLeft": String(props.stationsData[searchStartResults[i]].length * 0 + 15) + "px", "margin": "auto 0"}}>{searchStartResults[i]}</p>
                    </button>
                  </>
                ))
              }
            </div>
          </div>
        </div>

        <div className="fc searchEndWrapper" style={
          {
            "borderBottomLeftRadius": (searchEndResults.length > 0 ? "0px" : "5px"),
            "borderBottomRightRadius": (searchEndResults.length > 0 ? "0px" : "5px"),
          }
        }>
          <div className="fr">
            <div className="stationIDWrapper">
              <StationID size={stationIDDestSize} colours={stationIDDestColours} stationCodes={stationIDDestCodes} />
            </div>
            <input type="text" className="search-field endpoint" placeholder="Destination.." value={endPoint} style={{"paddingLeft": String(stationIDDestSize * 0 + 10) + "px", "color": errorBorder[1] ? "red" : "black"}} 
              onFocus={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults); revertErrorBorder(1);}}
              onChange={(e) => {setEndPoint(e.target.value); searchKeyUpHandler(e.target.value, setSearchEndResults);}}
              onBlur={(e) => {setTimeout(() => {setSearchEndResults([])}, 100)}}
            >
            </input>
            <select id="endpointexitid" className="exits" value={props.endPointExit} onChange={(e) => handleSelectChange(e, props.setEndPointExit)} style={{"color": errorBorder[3] ? "red" : "black"}}>
              {getExits(destPointLastExit, endPoint)}
            </select>
          </div>
          <div style={{height: "0px"}}>
            <div className="dropdownSearch fc" style={{"height": String(searchEndResults.length * 60) + "px", "zIndex": 10, "border": (searchEndResults.length > 0 ?"1px solid #00000022" : "")}}>
              {
                Array.from(Array(searchEndResults.length).keys()).map(i => (
                  <>
                    <button className="dropdownButtons fr" style={
                        {
                          "borderBottomLeftRadius": (i !== searchEndResults.length - 1 ? "0px" : "5px"),
                          "borderBottomRightRadius": (i !== searchEndResults.length - 1  ? "0px" : "5px"),
                        }
                      } onMouseDown={(e) => setEndPoint(searchEndResults[i])}>
                      <div className="stationIDWrapper stationIDWrapperSearch" style={{margin: "auto 0"}}>
                        <StationID size={props.stationsData[searchEndResults[i]].length} colours={getColours(searchEndResults[i])} stationCodes={props.stationsData[searchEndResults[i]]} />
                      </div>
                      <p style={{"paddingLeft": String(props.stationsData[searchEndResults[i]].length * 0 + 15) + "px", "margin": "auto 0"}}>{searchEndResults[i]}</p>
                    </button>
                  </>
                ))
              }
            </div>
          </div>
        </div>

      </div>
      <SearchButton setFilter={props.setFilter} filterEnabled={props.filterEnabled} searchEnabled={props.searchEnabled} setSearch={props.setSearch} errorBorder={errorBorder} setErrorBorder={setErrorBorder} stationsData={props.stationsData} startPoint={startPoint} endPoint={endPoint} startPointExit={props.startPointExit} endPointExit={props.endPointExit} setAxiosData={props.setAxiosData} setMobileSwipeStatus={props.setMobileSwipeStatus} mobileSwipeStatus={props.mobileSwipeStatus} />
    </>
  )
}

export default SearchArea;