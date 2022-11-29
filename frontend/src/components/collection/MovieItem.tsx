import { MovieDbType } from ".";

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
  return (
    <li className="flex h-80 w-[10rem] flex-col justify-between items-start p-1 pb-2 rounded-lg bg-black">
      <div className="w-full h-5/6 flex flex-col gap-y-2">
        <img className="rounded-lg h-3/4 w-full" src={movie.movie_poster} />
        <p className="text-zinc-300 line-clamp-2 p-1">{movie.movie_title}</p>
      </div>
      {removable && (
        <button
          id={id.toString()}
          onClick={(e) => handleRemove(e)}
          className="text-orange-400/80 text-sm mt-2 mx-2 pb-1"
        >
          remove
        </button>
      )}
    </li>
  );
};
