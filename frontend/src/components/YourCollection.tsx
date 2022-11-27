import { useEffect, useState } from "react";

type MovieDbType = {
  movie_id: number;
  movie_title: string;
  movie_year: number;
  movie_link: string;
  movie_watched: boolean;
  movie_rating: number;
  movie_user_rating: number;
  movie_director: string;
  movie_poster: string;
};

const YourCollection = () => {
  // fetch movies from db
  const [dbMovies, setDbMovies] = useState<MovieDbType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/movies").then((res) =>
      res.json().then((data) => {
        setDbMovies(data);
      })
    );
  }, []);

  console.log(dbMovies);

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <main id="pageContent" className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">
          Welcome, Cauã!
        </h1>
        {dbMovies && <CollectionRow movies={dbMovies} title="Your Movies" />}
      </main>
    </div>
  );
};

const CollectionRow = ({
  movies,
  title,
}: {
  movies: MovieDbType[];
  title: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <p className="text-lg text-zinc-200 mb-4">{title}</p>
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.movie_id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

const MovieItem = ({ movie }: { movie: MovieDbType }) => {
  return (
    <li className="flex w-[10rem] flex-col p-1 pb-2 cursor-pointer rounded-lg bg-black hover:bg-zinc-800 hover:backdrop-blur-lg duration-300 group">
      <img className="rounded-lg h-3/4" src={movie.movie_poster} />
      <p className="text-zinc-400 mt-2 mx-2 group-hover:text-white duration-300">
        {movie.movie_title}
      </p>
    </li>
  );
};

export default YourCollection;
