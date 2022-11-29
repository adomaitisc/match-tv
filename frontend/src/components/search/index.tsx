import { useEffect, useState } from "react";
import { MovieItem } from "./MovieItem";
import { NotificationItem } from "./NotificationItem";

const IMDb =
  "https://v3.sg.media-imdb.com/suggestion/titles/x/_.json?includeVideos=1";

export type MovieType = {
  i: {
    height: number;
    imageUrl: string;
    width: number;
  };
  id: string;
  l: string;
  q: string;
  qid: string;
  rank: number;
  s: string;
  y: number;
};

type MovieDbType = {
  movie_title: string;
  movie_year: number;
  movie_link: string;
  movie_watched: boolean;
  movie_director: string;
  movie_poster: string;
};

const AddMovies = ({
  lastState,
  updateState,
}: {
  lastState: { lastSearch: string; lastMovies: MovieType[] };
  updateState: any;
}) => {
  // resp is the response from the IMDb url
  const [resp, setResp] = useState<MovieType[]>([]);

  // selected is the movie that the user has selected
  const [selected, setSelected] = useState<string[]>([]);

  // hanldeInput is called when the user types in the input field
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setResp([]);
      return;
    }
    await fetch(`${IMDb.replace("_", e.target.value)}`).then((res) =>
      res.json().then((data) => {
        // remove movies without image
        const filtered = data.d.filter((movie: MovieType) => movie.i);
        updateState({ lastSearch: e.target.value, lastMovies: filtered });
        setResp(filtered);
      })
    );
  };

  // handleSelect is called when a user clicks on a movie
  // it adds to the selected array and send to the database
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const movie: MovieType | undefined = resp.find(
      (movie: MovieType) => movie.id === e.currentTarget.id
    );
    if (movie === undefined) {
      return;
    }

    const movieDb: MovieDbType = {
      movie_title: movie.l,
      movie_year: movie.y,
      movie_link: "https://www.imdb.com/title/" + movie.id,
      movie_watched: true,
      movie_director: movie.s,
      movie_poster: movie.i.imageUrl,
    };

    // check if the movie is already in the selected array
    const found = selected.find((msg: string) =>
      msg.includes(movieDb.movie_title)
    );
    if (found !== undefined) {
      return;
    }

    //add to db
    const r = fetch("http://localhost:8080/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieDb),
    }).then((res) =>
      res.json().then((data) => {
        setSelected([...selected, data.message]);
      })
    );
  };

  // handleDismiss is called when a user clicks on the dismiss button on a notification
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filtered = selected.filter((movie: any) => movie.id !== movie.id);
    setSelected(filtered);
  };

  useEffect(() => {
    setResp(lastState.lastMovies);
  }, [lastState]);

  return (
    <div className="w-full h-full flex flex-col justify-start movies-start">
      <main id="pageContent" className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">
          Search for movies you watched.
        </h1>
        <p className="text-lg leading-snug text-zinc-200 mb-6">
          Start by adding movies you have watched,
          <br /> and we will{" "}
          <span className="text-orange-400 font-medium">
            recommend you the best.
          </span>
        </p>
        <form className="w-full flex">
          <input
            className="w-full max-w-xl text-lg font-light px-4 py-1 rounded-lg bg-violet-900/40 text-zinc-200 placeholder:text-zinc-300/50 outline-none border-none ring-0 focus:ring-0"
            type="text"
            onChange={handleInput}
            placeholder="Search by Movie title"
            defaultValue={lastState.lastSearch}
          />
        </form>
      </main>
      {resp && (
        <ul id="searchResults" className="flex flex-wrap gap-4">
          {resp.map((movie: any) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              handleSelect={handleSelect}
            />
          ))}
        </ul>
      )}
      <ul
        id="noticationBar"
        className="w-96 z-10 fixed bottom-0 right-0 pr-20 pb-10"
      >
        {selected &&
          selected.map((msg: any) => (
            <NotificationItem
              key={msg}
              message={msg}
              handleDismiss={handleDismiss}
            />
          ))}
      </ul>
    </div>
  );
};

export default AddMovies;
