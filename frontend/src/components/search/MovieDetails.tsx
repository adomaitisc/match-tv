import { MovieType } from ".";
import { FaAngleLeft, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

export const MovieDetails = ({
  movie,
  handleClose,
  handleSelect,
  setUserRating,
}: {
  movie: MovieType;
  handleClose: () => void;
  handleSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setUserRating: (rating: number) => void;
}) => {
  const [selected, setSelected] = useState("");
  // on every select change, update the userrating
  useEffect(() => {
    setUserRating(Number(selected));
  }, [selected]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-black/50 backdrop-blur-md bg-opacity-50 z-10">
      <main className="w-3/5  flex flex-col items-center gap-y-2">
        <img className="rounded-lg w-1/3 mb-4" src={movie.i.imageUrl} />
        <p className="text-white text-3xl font-medium">{movie.l}</p>
        <p className="text-zinc-400 text-lg">
          Select your thoughts on the movie
        </p>
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="flex gap-x-2">
            <button
              id="1"
              onClick={(e) => setSelected(e.currentTarget.id)}
              className={`${
                selected === "1" && `bg-violet-900/70`
              }   px-2 py-2 border-2 border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
            >
              Awful
            </button>
            <button
              id="2"
              onClick={(e) => setSelected(e.currentTarget.id)}
              className={`${
                selected === "2" && `bg-violet-900/70`
              }   px-2 py-2 border-2 border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
            >
              Bad
            </button>
            <button
              id="3"
              onClick={(e) => setSelected(e.currentTarget.id)}
              className={`${
                selected === "3" && `bg-violet-900/70`
              }   px-2 py-2 border-2 border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
            >
              Mid
            </button>
            <button
              id="4"
              onClick={(e) => setSelected(e.currentTarget.id)}
              className={`${
                selected === "4" && `bg-violet-900/70`
              }   px-2 py-2 border-2 border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
            >
              Good
            </button>
            <button
              id="5"
              onClick={(e) => setSelected(e.currentTarget.id)}
              className={`${
                selected === "5" && `bg-violet-900/70`
              }   px-2 py-2 border-2 border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
            >
              Great
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => handleClose()}
            className="text-orange-400 hover:text-orange-800 flex items-center gap-x-2 rounded-md text-lg font-medium duration-300"
          >
            <FaAngleLeft />
            Back to Search
          </button>
          <button
            onClick={(e) => handleSelect(e)}
            id={movie.id}
            disabled={selected === ""}
            className=" disabled:text-zinc-600 text-orange-400 hover:text-orange-800 flex items-center gap-x-2 rounded-md text-lg font-medium duration-300"
          >
            <FaCheck />
            Add to Collection
          </button>
        </div>
      </main>
    </div>
  );
};
