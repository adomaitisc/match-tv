import logo from "../assets/movy-h.svg";
import { FaSearch, FaThLarge } from "react-icons/fa";

const Header = ({
  switchView,
  view,
}: {
  switchView: () => void;
  view: string;
}) => {
  return (
    <header className="bg-black/20 backdrop-blur-sm px-20 z-10 h-16 fixed top-0 left-0 right-0 flex justify-between items-center">
      <button
        onClick={switchView}
        className="text-orange-500 flex items-center text-lg font-medium gap-2"
      >
        {view === "addMovies" ? (
          <>
            <FaThLarge />
            Your Collection
          </>
        ) : (
          <>
            <FaSearch />
            Search Movies
          </>
        )}
      </button>
      <p className="text-orange-500 text-lg font-medium">Your Profile</p>
    </header>
  );
};

export default Header;
