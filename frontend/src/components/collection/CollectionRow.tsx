import { MovieDbType } from ".";
import { MovieItem } from "./MovieItem";

export const CollectionRow = ({
  movies,
  title,
  handleRemove,
}: {
  movies: MovieDbType[];
  title: string;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <p className="text-lg text-zinc-200 mb-4">{title}</p>
      <div className="w-full flex justify-between text-white"></div>
      <ul className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieItem
            key={movie.movie_id}
            id={movie.movie_id}
            movie={movie}
            handleRemove={handleRemove}
            removable={true}
          />
        ))}
      </ul>
    </div>
  );
};
