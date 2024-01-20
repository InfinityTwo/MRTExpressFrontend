import React from 'react';
// import logo from './logo.svg';
import './App.scss';

import { useState } from 'react';

import Map from './components/Map';
import SearchArea from './components/SearchArea';
import SearchButton from './components/SearchButton';
import Filter from './components/Filter';

function App() {

  const [filterEnabled, setFilter] = useState(false);
  const [searchEnabled, setSearch] = useState(false);
  const [filterType, setFilterType] = useState(0); // 0 for Escalators, 1 for Stairs, 2 for Lifts

  return (
    <div className="App">
      <Map />
      <div className="sidePanel">
        <SearchArea setFilter={setFilter} filterEnabled={filterEnabled} searchEnabled={searchEnabled} setSearch={setSearch} />
        {
          filterEnabled
          ? <Filter filterType={filterType} setFilterType={setFilterType} setFilter={setFilter} />
          : <></>
        }
      </div>
    </div>
  );
}

export default App;
