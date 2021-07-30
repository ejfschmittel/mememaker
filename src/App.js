import React, {useRef, useEffect} from "react"


import Canvas from "./components/Canvas";
import CurrentlySelectedElementUI from "./components/UIPanelCurrentElement";
import CreateElementUI from "./components/UIPanelCreatElement";
import UIPanelElementOverview from "./components/UIPanelElementOverview";
import {CanvasOjbectContextProvider} from "./contexts/CanvasObjectContext"

import "./styles/main.scss";

function App() {

  
  return (
    <CanvasOjbectContextProvider>
      <div className="App">
        <Canvas />
        <CurrentlySelectedElementUI />
        <CreateElementUI />
        <UIPanelElementOverview />
      </div>
    </CanvasOjbectContextProvider>
  );
}

export default App;
