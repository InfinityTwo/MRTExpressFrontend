import "../assets/scss/SearchButton.scss";
import axios from "axios";

function SearchButton(props: any) {

  let exits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  function handleInputCheck() {
    let error = [false, false, false, false];
    if (!Object.keys(props.stationsData).includes(props.startPoint)) {
      error[0] = true;
    }
    if (!Object.keys(props.stationsData).includes(props.endPoint)) {
      error[1] = true;
    }
    if (!exits.includes(props.startPointExit)) {
      error[2] = true;
    }
    if (!exits.includes(props.endPointExit)) {
      error[3] = true;
    }
    props.setErrorBorder(error);
    console.log(error);
    return !error.includes(true);
  };

  async function axiosRequest() {
    let result = await axios({
      method: 'post',
      baseURL: "https://mrt-kyhg.onrender.com",
      url: '/get_path',
      timeout: 5000,
      data: {
        "start": 'NE1',
        "end": 'DT13',
        "exit": "A"
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  };

  function handleSearch() {
    if (handleInputCheck()) {
      console.log("axios now");
      axiosRequest();
    }
  };

  return (
    <>
      <div className="fr">
        <button type="button" className={"filterbutton " + (props.filterEnabled ? " active-filter" : "")} onMouseUp={(e) => {props.setFilter((prev: any) => !prev)}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
        </button>
        <button type="button" className={"fr searchbutton "} onMouseUp={(e) => {props.setSearch((prev: any) => !prev); props.setFilter(false); handleSearch();}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          <p>Search</p>
        </button>
      </div>
    </>
  );
}

export default SearchButton;