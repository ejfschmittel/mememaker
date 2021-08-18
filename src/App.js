import React, {useRef, useEffect} from "react"


import Canvas from "./components/Canvas";
import CurrentlySelectedElementUI from "./components/UIPanelCurrentElement";
import CreateElementUI from "./components/UIPanelCreatElement";
import UIPanelElementOverview from "./components/UIPanelElementOverview";


import "./styles/main.scss";

function App() {

  
  return (
      <div className="App">
        <Canvas />
        <CurrentlySelectedElementUI />
        <CreateElementUI />
        <UIPanelElementOverview />
      </div>
  );
}

export default App;
