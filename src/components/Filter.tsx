import "../assets/scss/Filter.scss";

function Filter(props: any) {
  
  const activeClass = "active-filter";
  const inactiveClass = "";

  return(
    <div className="fc filterWrapper">
      <div className="fr">
        <p className="filterWord">Filter</p>
        <button className="filterClose" onMouseUp={(e) => {props.setFilter(false)}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>
      </div>
      <div className="filterdivider"></div>
      <button className={props.filterType === 0 ? activeClass : inactiveClass} onMouseUp={(e) => props.setFilterType(0)}>Escalators</button>
      <button className={props.filterType === 1 ? activeClass : inactiveClass} onMouseUp={(e) => props.setFilterType(1)}>Stairs</button>
      <button className={props.filterType === 2 ? activeClass : inactiveClass} onMouseUp={(e) => props.setFilterType(2)}>Lift</button>
      <div className="filterdivider2"></div>
      <p className="filterWord">Theme</p>
      <button className={"darkModeButton " + (props.darkMode ? activeClass : inactiveClass)} onMouseUp={(e) => {
        props.setDarkMode((prev: boolean) => !prev);
        localStorage.removeItem("MRTExpressTheme");
        localStorage.setItem("MRTExpressTheme", String(!props.darkMode));
      }}>{props.darkMode ? "Dark" : "Light"}</button>
    </div>
  );
};

export default Filter;