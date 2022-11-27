import React, { useState } from "react";

const IMDb =
  "https://v3.sg.media-imdb.com/suggestion/titles/x/_.json?includeVideos=1";

type MovieType = {
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

const AddMovies = () => {
  // resp is the response from the IMDb url
  const [resp, setResp] = useState<MovieType[]>([]);

  // selected is the movie that the user has selected
  const [selected, setSelected] = useState<any>([]);

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
        setResp(filtered);
      })
    );
  };

  // handleSelect is called when a user clicks on a movie
  // it adds to the selected array and send to the database
  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    if (selected.find((movie: any) => movie.id === e.currentTarget.id)) {
      return;
    }
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

    //add to db
    const r = fetch("http://localhost:8080/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieDb),
    }).then((res) => {
      console.log(res);
    });

    setSelected([...selected, movie]);
  };

  // handleDismiss is called when a user clicks on the dismiss button on a notification
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    const movie = selected.find(
      (movie: any) => movie.id === e.currentTarget.id
    );
    const filtered = selected.filter((movie: any) => movie.id !== movie.id);
    setSelected(filtered);
  };

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
          />
        </form>
      </main>
      {resp && (
        <ul id="searchResults" className="flex flex-wrap gap-4">
          {resp.map((movie: any) => (
            <Moviemovie
              key={movie.id}
              movie={movie}
              handleSelect={handleSelect}
            />
          ))}
        </ul>
      )}
      <ul
        id="noticationBar"
        className="w-96 fixed bottom-0 right-0 pr-20 pb-10"
      >
        {selected &&
          selected.map((movie: any) => (
            <Notificationmovie
              key={movie.id}
              movie={movie}
              handleDismiss={handleDismiss}
            />
          ))}
      </ul>
    </div>
  );
};

const Moviemovie = ({
  movie,
  handleSelect,
}: {
  movie: any;
  handleSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  return (
    <li
      onClick={(e) => handleSelect(e)}
      className="flex w-[10rem] flex-col p-1 pb-2 cursor-pointer rounded-lg bg-black hover:bg-zinc-800 hover:backdrop-blur-lg duration-300 group"
      id={movie.id}
    >
      <img className="rounded-lg h-3/4" src={movie.i.imageUrl} alt={movie.l} />
      <p className="text-zinc-400 mt-2 mx-2 group-hover:text-white duration-300">
        {movie.l}
      </p>
    </li>
  );
};

const Notificationmovie = ({
  movie,
  handleDismiss,
}: {
  movie: any;
  handleDismiss: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <li className="flex text-sm w-full bg-zinc-300 backdrop-blur-sm text-black px-3 py-2 rounded-md movies-start justify-between gap-2 mb-2">
      <p className="overflow-ellipsis">Added {movie.l}</p>
      <div className="flex justify-center movies-center gap-2">
        <button id={movie.id} onClick={(e) => handleDismiss(e)}>
          Dismiss
        </button>
      </div>
    </li>
  );
};

export default AddMovies;
