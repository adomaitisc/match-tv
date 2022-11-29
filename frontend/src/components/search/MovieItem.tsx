import { useState } from "react";
import { MovieType } from ".";
import { MovieDetails } from "./MovieDetails";

export const MovieItem = ({
  movie,
  handleSelect,
  setUserRating,
}: {
  movie: MovieType;
  handleSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setUserRating: (rating: number) => void;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <li
        onClick={() => setOpened(true)}
        className="flex h-80 w-[10rem] flex-col justify-start items-start p-1 pb-2 gap-y-2 rounded-lg bg-black"
      >
        <img className="rounded-lg h-3/4 w-full" src={movie.i.imageUrl} />
        <p className="text-zinc-300 line-clamp-2 p-1">{movie.l}</p>
      </li>
      {opened && (
        <MovieDetails
          movie={movie}
          handleSelect={handleSelect}
          handleClose={() => setOpened(false)}
          setUserRating={setUserRating}
        />
      )}
    </>
  );
};
