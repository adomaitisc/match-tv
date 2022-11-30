import { useEffect, useState } from "react";
import { FaAngleLeft, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { MovieDbType } from ".";

export const MovieDetails = ({
  movie,
  handleClose,
  handleRemove,
}: {
  movie: MovieDbType;
  handleClose: () => void;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(movie.movie_user_rating.toString());
  }, [selected]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-black/60 backdrop-blur-md bg-opacity-50 z-10">
      <main className="w-3/5  flex flex-col items-center gap-y-2">
        <div className="flex justify-end w-full mb-4">
          <button
            id={movie.movie_id.toString()}
            onClick={(e) => handleRemove(e)}
            className="text-red-500 hover:text-red-800 flex items-center gap-x-2 rounded-md text-base font-medium duration-300"
          >
            <FaRegTrashAlt />
            Remove
          </button>
        </div>
        <img className="rounded-lg w-1/3 mb-4" src={movie.movie_poster} />
        <p className="text-white text-3xl font-medium text-center">
          {movie.movie_title}
        </p>
        <p className="text-zinc-400 text-lg">Your rating</p>
        <div className="flex gap-x-2 justify-center items-center">
          <button
            id="1"
            onClick={(e) => setSelected(e.currentTarget.id)}
            className={`${
              selected === "1" && `bg-violet-900/70`
            }   px-2 py-1 border border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
          >
            Awful
          </button>
          <button
            id="2"
            onClick={(e) => setSelected(e.currentTarget.id)}
            className={`${
              selected === "2" && `bg-violet-900/70`
            }   px-2 py-1 border border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
          >
            Bad
          </button>
          <button
            id="3"
            onClick={(e) => setSelected(e.currentTarget.id)}
            className={`${
              selected === "3" && `bg-violet-900/70`
            }   px-2 py-1 border border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
          >
            Mid
          </button>
          <button
            id="4"
            onClick={(e) => setSelected(e.currentTarget.id)}
            className={`${
              selected === "4" && `bg-violet-900/70`
            }   px-2 py-1 border border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
          >
            Good
          </button>
          <button
            id="5"
            onClick={(e) => setSelected(e.currentTarget.id)}
            className={`${
              selected === "5" && `bg-violet-900/70`
            }   px-2 py-1 border border-zinc-300 text-zinc-300 rounded-md hover:text-violet-500 hover:border-violet-500`}
          >
            Great
          </button>
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => handleClose()}
            className="text-orange-400 hover:text-orange-800 flex items-center gap-x-2 rounded-md text-lg font-medium duration-300"
          >
            <FaAngleLeft />
            Go Back
          </button>
          <button
            id={movie.movie_id.toString()}
            className=" disabled:text-zinc-600 text-orange-400 hover:text-orange-800 flex items-center gap-x-2 rounded-md text-lg font-medium duration-300"
          >
            <FaCheck />
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};
