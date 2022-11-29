import { useState } from "react";
import AddMovies from "./components/search";
import Header from "./components/Header";
import YourCollection from "./components/collection";

const App = () => {
  const [view, setView] = useState("viewCollection");
  const [lastState, setLastState] = useState({
    lastSearch: "",
    lastMovies: [],
  });

  const handleSwitchView = () => {
    if (view === "addMovies") {
      setView("viewCollection");
    } else {
      setView("addMovies");
    }
  };

  return (
    <div id="appWrapper" className="w-full flex items-center justify-center">
      <Header switchView={handleSwitchView} view={view} />
      <div id="contentWrapper" className="w-full py-24 px-20">
        {view === "addMovies" && (
          <AddMovies lastState={lastState} updateState={setLastState} />
        )}
        {view === "viewCollection" && <YourCollection />}
      </div>
    </div>
  );
};

export default App;
