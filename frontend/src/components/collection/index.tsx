import { useEffect, useState } from "react";
import { CollectionRow } from "./CollectionRow";

export type MovieDbType = {
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

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.id);
    fetch(`http://localhost:8080/api/movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      setDbMovies(dbMovies.filter((movie) => movie.movie_id !== id));
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/movies").then((res) =>
      res.json().then((data) => {
        setDbMovies(data);
      })
    );
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden justify-start items-start">
      <main id="pageContent" className="w-full flex flex-col mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">
          Welcome, Cauã!
        </h1>
        {dbMovies && (
          <CollectionRow
            movies={dbMovies}
            handleRemove={handleRemove}
            title="Your Movie Collection"
          />
        )}
      </main>
    </div>
  );
};

export default YourCollection;
