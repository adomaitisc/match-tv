import logo from "../assets/movy-h.svg";
import { FaArrowRight } from "react-icons/fa";

const Header = ({
  switchView,
  view,
}: {
  switchView: () => void;
  view: string;
}) => {
  return (
    <header className="bg-black/20 backdrop-blur-sm px-20 z-10 h-16 fixed top-0 left-0 right-0 flex justify-between items-center">
      <img src={logo} className="h-12" />
      <button
        onClick={switchView}
        className="text-orange-500 flex items-center text-lg font-medium gap-2"
      >
        {view === "addMovies" ? "View Collection" : "Add Movies"}
      </button>
    </header>
  );
};

export default Header;
