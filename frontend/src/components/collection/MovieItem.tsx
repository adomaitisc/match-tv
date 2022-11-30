import { useState } from "react";
import { MovieDbType } from ".";
import { MovieDetails } from "./MovieDetails";

export const MovieItem = ({
  movie,
  id,
  removable,
  handleRemove,
}: {
  movie: MovieDbType;
  id: number;
  removable: boolean;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <li
        onClick={() => setOpened(true)}
        className="flex h-80 w-[10rem] flex-col justify-between items-start p-1 pb-2 rounded-lg cursor-pointer bg-black text-zinc-300 hover:bg-zinc-300 hover:text-zinc-900 duration-300"
      >
        <div className="w-full h-5/6 flex flex-col gap-y-2">
          <img className="rounded-lg h-3/4 w-full" src={movie.movie_poster} />
          <p className="line-clamp-2 p-1">{movie.movie_title}</p>
        </div>
      </li>
      {opened && (
        <MovieDetails
          movie={movie}
          handleClose={() => setOpened(false)}
          handleRemove={handleRemove}
        />
      )}
    </>
  );
};
