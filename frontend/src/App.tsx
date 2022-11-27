import { useState } from "react";
import AddMovies from "./components/AddMovies";
import Header from "./components/Header";

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
    <div className=" flex items-center justify-center">
      <Header switchView={handleSwitchView} view={view} />
      {view === "addMovies" && <AddMovies />}
      {view === "viewCollection" && <div>View Collection</div>}
    </div>
  );
};

export default App;
