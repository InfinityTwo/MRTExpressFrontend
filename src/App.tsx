import React from 'react';
// import logo from './logo.svg';
import './App.scss';

import { useState } from 'react';

import Map from './components/Map';
import SearchArea from './components/SearchArea';
import Filter from './components/Filter';
import Results from './components/Results';

function App() {

  const [filterEnabled, setFilter] = useState(false);
  const [searchEnabled, setSearch] = useState(false);
  const [filterType, setFilterType] = useState(0); // 0 for Escalators, 1 for Stairs, 2 for Lifts

  const [axiosData, setAxiosData] = useState({});

  const [startPointExit, setStartPointExit] = useState("");
  const [endPointExit, setEndPointExit] = useState("");

  const stationsData: any = {
    "Tuas Link":["EW33"], "Tuas West Road":["EW32"], "Tuas Crescent":["EW31"], "Gul Circle":["EW30"], "Joo Koon":["EW29"], "Pioneer":["EW28"], "Boon Lay":["EW27"], "Lakeside":["EW26"], "Chinese Garden":["EW25"], "Jurong East":["NS1","EW24"], "Clementi":["EW23"], "Dover":["EW22"], "Buona Vista":["CC22","EW21"], "Commonwealth":["EW20"], "Queenstown":["EW19"], "Redhill":["EW18"], "Tiong Bahru":["EW17"], "Outram Park":["EW16","NE3","TE17"], "Tanjong Pagar":["EW15"], "Raffles Place":["NS26","EW14"], "City Hall":["NS25","EW13"], "Bugis":["EW12","DT14"], "Lavender":["EW11"], "Kallang":["EW10"], "Aljunied":["EW9"], "Paya Lebar":["EW8","CC9"], "Eunos":["EW7"], "Kembangan":["EW6"], "Bedok":["EW5"], "Tanah Merah":["EW4","CG"], "Simei":["EW3"], "Tampines":["EW2","DT32"], "Pasir Ris":["EW1"], "Expo":["CG1","DT35"], "Changi Airport":["CG2"], "Bukit Batok":["NS2"], "Bukit Gombak":["NS3"], "Choa Chu Kang":["NS4","BP1"], "Yew Tee":["NS5"], "Kranji":["NS7"], "Marsiling":["NS8"], "Woodlands": ["NS9","TE2"], "Admiralty":["NS10"], "Sembawang":["NS11"], "Canberra":["NS12"], "Yishun":["NS13"], "Khatib":["NS14"], "Yio Chu Kang":["NS15"], "Ang Mo Kio":["NS16"], "Bishan":["NS17","CC15"], "Braddell":["NS18"], "Toa Payoh":["NS19"], "Novena":["NS20"], "Newton":["NS21","DT11"], "Orchard":["TE14","NS22"], "Somerset":["NS23"], "Dhoby Ghaut":["NS24","NE6","CC1"], "Marina Bay":["NS27","TE20","CE2"], "Marina South Pier":["NS28"], "South View":["BP2"], "Keat Hong":["BP3"], "Teck Whye":["BP4"], "Phoenix":["BP5"], "Bukit Panjang":["BP6","DT1"], "Petir":["BP7"], "Pending":["BP8"], "Bangkit":["BP9"], "Fajar":["BP10"], "Segar":["BP11"], "Jelapang":["BP12"], "Senja":["BP13"], "HarbourFront":["CC29","NE1"], "Telok Blangah":["CC28"], "Labrador Park":["CC27"], "Pasir Panjang":["CC26"], "Haw Par Villa":["CC25"], "Kent Ridge":["CC24"], "one-north":["CC23"], "Holland Village":["CC21"], "Farrer Road":["CC20"], "Botanic Gardens":["CC19","DT9"], "Caldecott":["CC17","TE9"], "Marymount":["CC16"], "Lorong Chuan":["CC14"], "Serangoon":["NE12", "CC13"], "Bartley":["CC12"], "Tai Seng":["CC11"], "MacPherson":["DT26","CC10"], "Dakota":["CC8"],"Mountbatten":["CC7"], "Stadium":["CC6"], "Nicoll Highway":["CC5"], "Promenade":["DT15","CC4"], "Esplanade":["CC3"], "Bras Basah":["CC2"], "Chinatown":["NE4","DT19"], "Clarke Quay":["NE5"], "Little India":["NE7","DT12"], "Farrer Park":["NE8"], "Boon Keng":["NE9"], "Potong Pasir":["NE10"], "Woodleigh":["NE11"], "Kovan":["NE13"], "Hougang":["NE14"], "Buangkok":["NE15"], "Sengkang":["NE16","STC"], "Punggol":["NE17","PTC"], "Woodlands North":["TE1"], "Woodlands South":["TE3"], "Springleaf":["TE4"], "Lentor":["TE5"], "Mayflower":["TE6"], "Bright Hill":["TE7"], "Upper Thomson":["TE8"], "Stevens":["DT10", "TE11"], "Napier":["TE12"], "Orchard Boulevard":["TE13"], "Great World":["TE15"], "Havelock":["TE16"], "Maxwell":["TE18"], "Shenton Way":["TE19"], "Gardens by the Bay":["TE22"], "Cashew":["DT2"], "Hillview":["DT3"], "Beauty World":["DT5"], "King Albert Park":["DT6"], "Sixth Avenue":["DT7"], "Tan Kah Kee":["DT8"], "Rochor":["DT13"], "Downtown":["DT17"], "Telok Ayer":["DT18"], "Fort Canning":["DT20"], "Bencoolen":["DT21"], "Jalan Besar":["DT22"], "Bendemeer":["DT23"], "Geylang Bahru":["DT24"], "Mattar":["DT25"], "Ubi":["DT27"], "Kaki Bukit":["DT28"], "Bedok North": ["DT29"], "Bedok Reservoir": ["DT30"], "Tampines West":["DT31"], "Tampines East":["DT33"], "Upper Changi":["DT34"], "Cheng Lim":["SW1"], "Farmway":["SW2"], "Kupang":["SW3"], "Thanggam":["SW4"], "Fernvale":["SW5"], "Layar":["SW6"], "Tongkang":["SW7"], "Renjong":["SW8"], "Compassvale":["SE1"], "Rumbia":["SE2"], "Bakau":["SE3"], "Kangkar":["SE4"], "Ranggung":["SE5"], "Sam Kee":["PW1"], "Punggol Point":["PW3"], "Samudera":["PW4"], "Nibong":["PW5"], "Sumang":["PW6"], "Soo Teck":["PW7"], "Cove":["PE1"], "Meridian":["PE2"], "Coral Edge":["PE3"], "Riviera":["PE4"], "Kaladoor":["PE5"], "Oasis":["PE6"], "Damai":["PE7"], "Bayfront": ["DT16", "CE1"]
  };

  const idToName: any = {
    'EW33': 'Tuas Link', 'EW32': 'Tuas West Road', 'EW31': 'Tuas Crescent', 'EW30': 'Gul Circle', 'EW29': 'Joo Koon', 'EW28': 'Pioneer', 'EW27': 'Boon Lay', 'EW26': 'Lakeside', 'EW25': 'Chinese Garden', 'NS1': 'Jurong East', 'EW24': 'Jurong East', 'EW23': 'Clementi', 'EW22': 'Dover', 'CC22': 'Buona Vista', 'EW21': 'Buona Vista', 'EW20': 'Commonwealth', 'EW19': 'Queenstown', 'EW18': 'Redhill', 'EW17': 'Tiong Bahru', 'EW16': 'Outram Park', 'NE3': 'Outram Park', 'TE17': 'Maxwell', 'EW15': 'Tanjong Pagar', 'NS26': 'Raffles Place', 'EW14': 'Raffles Place', 'NS25': 'City Hall', 'EW13': 'City Hall', 'EW12': 'Bugis', 'DT14': 'Bugis', 'EW11': 'Lavender', 'EW10': 'Kallang', 'EW9': 'Aljunied', 'EW8': 'Paya Lebar', 'CC9': 'Paya Lebar', 'EW7': 'Eunos', 'EW6': 'Kembangan', 'EW5': 'Bedok', 'EW4': 'Tanah Merah', 'CG': 'Tanah Merah', 'EW3': 'Simei', 'EW2': 'Tampines', 'DT32': 'Tampines', 'EW1': 'Pasir Ris', 'CG1': 'Expo', 'DT35': 'Expo', 'CG2': 'Changi Airport', 'NS2': 'Bukit Batok', 'NS3': 'Bukit Gombak', 'NS4': 'Choa Chu Kang', 'BP1': 'Choa Chu Kang', 'NS5': 'Yew Tee', 'NS7': 'Kranji', 'NS8': 'Marsiling', 'NS9': 'Woodlands', 'TE2': 'Woodlands', 'NS10': 'Admiralty', 'NS11': 'Sembawang', 'NS12': 'Canberra', 'NS13': 'Yishun', 'NS14': 'Khatib', 'NS15': 'Yio Chu Kang', 'NS16': 'Ang Mo Kio', 'NS17': 'Bishan', 'CC15': 'Bishan', 'NS18': 'Braddell', 'NS19': 'Toa Payoh', 'NS20': 'Novena', 'NS21': 'Newton', 'DT11': 'Newton', 'TE14': 'Orchard', 'NS22': 'Orchard', 'NS23': 'Somerset', 'NS24': 'Dhoby Ghaut', 'NE6': 'Dhoby Ghaut', 'CC1': 'Dhoby Ghaut', 'NS27': 'Marina Bay', 'TE20': 'Marina Bay', 'CE2': 'Marina Bay', 'NS28': 'Marina South Pier', 'BP2': 'South View', 'BP3': 'Keat Hong', 'BP4': 'Teck Whye', 'BP5': 'Phoenix', 'BP6': 'Bukit Panjang', 'DT1': 'Bukit Panjang', 'BP7': 'Petir', 'BP8': 'Pending', 'BP9': 'Bangkit', 'BP10': 'Fajar', 'BP11': 'Segar', 'BP12': 'Jelapang', 'BP13': 'Senja', 'CC29': 'HarbourFront', 'NE1': 'HarbourFront', 'CC28': 'Telok Blangah', 'CC27': 'Labrador Park', 'CC26': 'Pasir Panjang', 'CC25': 'Haw Par Villa', 'CC24': 'Kent Ridge', 'CC23': 'one-north', 'CC21': 'Holland Village', 'CC20': 'Farrer Road', 'CC19': 'Botanic Gardens', 'DT9': 'Botanic Gardens', 'CC17': 'Caldecott', 'TE9': 'Caldecott', 'CC16': 'Marymount', 'CC14': 'Lorong Chuan', 'NE12': 'Serangoon', 'CC13': 'Serangoon', 'CC12': 'Bartley', 'CC11': 'Tai Seng', 'DT26': 'MacPherson', 'CC10': 'MacPherson', 'CC8': 'Dakota', 'CC7': 'Mountbatten', 'CC6': 'Stadium', 'CC5': 'Nicoll Highway', 'DT15': 'Promenade', 'CC4': 'Promenade', 'CC3': 'Esplanade', 'CC2': 'Bras Basah', 'NE4': 'Chinatown', 'DT19': 'Chinatown', 'NE5': 'Clarke Quay', 'NE7': 'Little India', 'DT12': 'Little India', 'NE8': 'Farrer Park', 'NE9': 'Boon Keng', 'NE10': 'Potong Pasir', 'NE11': 'Woodleigh', 'NE13': 'Kovan', 'NE14': 'Hougang', 'NE15': 'Buangkok', 'NE16': 'Sengkang', 'STC': 'Sengkang', 'NE17': 'Punggol', 'PTC': 'Punggol', 'TE1': 'Woodlands North', 'TE3': 'Woodlands South', 'TE4': 'Springleaf', 'TE5': 'Lentor', 'TE6': 'Mayflower', 'TE7': 'Bright Hill', 'TE8': 'Upper Thomson', 'TE11': 'Stevens', 'TE12': 'Napier', 'TE13': 'Orchard Boulevard', 'TE15': 'Great World', 'TE16': 'Havelock', 'TE19': 'Shenton Way', 'TE22': 'Gardens by the Bay', 'DT2': 'Cashew', 'DT3': 'Hillview', 'DT5': 'Beauty World', 'DT6': 'King Albert Park', 'DT7': 'Sixth Avenue', 'DT8': 'Tan Kah Kee', 'DT10': 'Stevens', 'DT13': 'Rochor', 'DT17': 'Downtown', 'DT18': 'Telok Ayer', 'DT20': 'Fort Canning', 'DT21': 'Bencoolen', 'DT22': 'Jalan Besar', 'DT23': 'Bendemeer', 'DT24': 'Geylang Bahru', 'DT25': 'Mattar', 'DT27': 'Ubi', 'DT28': 'Kaki Bukit', 'DT30':'Bedok Reservoir', 'DT29': 'Bedok North', 'DT31': 'Tampines West', 'DT33': 'Tampines East', 'DT34': 'Upper Changi', 'SW1': 'Cheng Lim', 'SW2': 'Farmway', 'SW3': 'Kupang', 'SW4': 'Thanggam', 'SW5': 'Fernvale', 'SW6': 'Layar', 'SW7': 'Tongkang', 'Sw8': 'Renjong', 'SE1': 'Compassvale', 'SE2': 'Rumbia', 'SE3': 'Bakau', 'SE4': 'Kangkar', 'SE5': 'Ranggung', 'PW1': 'Sam Kee', 'PW3': 'Punggol Point', 'PW4': 'Samudera', 'PW5': 'Nibong', 'PW6': 'Sumang', 'PW7': 'Soo Teck', 'PE1': 'Cove', 'PE2': 'Meridian', 'PE3': 'Coral Edge', 'PE4':'Riviera', 'PE5': 'Kaladoor', 'PE6': 'Oasis', 'PE7': 'Damai', "DT16": "Bayfront", "CE1": "Bayfront", "TE18": "Maxwell"
  }

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

  return (
    <div className="App">
      <Map />
      <div className="sidePanel">
        <SearchArea setFilter={setFilter} filterEnabled={filterEnabled} searchEnabled={searchEnabled} setSearch={setSearch} setAxiosData={setAxiosData} stationsData={stationsData} lineColours={lineColours} startPointExit={startPointExit} setStartPointExit={setStartPointExit} endPointExit={endPointExit} setEndPointExit={setEndPointExit} />
        {
          filterEnabled
          ? <Filter filterType={filterType} setFilterType={setFilterType} setFilter={setFilter} />
          : <></>
        }
        {
          Object.keys(axiosData).length !== 0
          ? <Results axiosData={axiosData} stationsData={stationsData} idToName={idToName} lineColours={lineColours} filterType={filterType} startPointExit={startPointExit} endPointExit={endPointExit} />
          : <></>
        }
      </div>
    </div>
  );
}

export default App;
