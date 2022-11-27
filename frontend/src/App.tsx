import { useState } from "react";
import AddMovies from "./components/AddMovies";
import Header from "./components/Header";
import YourCollection from "./components/YourCollection";

const App = () => {
  const [view, setView] = useState("addMovies");

  const handleSwitchView = () => {
    if (view === "addMovies") {
      setView("viewCollection");
    } else {
      setView("addMovies");
    }
  };

  return (
    <div id="appWrapper" className=" flex items-center justify-center">
      <Header switchView={handleSwitchView} view={view} />
      <div id="contentWrapper" className="w-full py-24 px-20">
        {view === "addMovies" && <AddMovies />}
        {view === "viewCollection" && <YourCollection />}
      </div>
    </div>
  );
};

export default App;
