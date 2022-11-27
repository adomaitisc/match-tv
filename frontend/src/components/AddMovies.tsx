import React, { useState } from "react";

const IMDb =
  "https://v3.sg.media-imdb.com/suggestion/titles/x/_.json?includeVideos=1";

const AddMovies = () => {
  // resp is the response from the IMDb url
  const [resp, setResp] = useState([]);

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
        // remove items without image
        const filtered = data.d.filter((item: any) => item.i);
        setResp(filtered);
      })
    );
  };

  // handleSelect is called when a user clicks on a movie
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selected.find((item: any) => item.id === e.currentTarget.id)) {
      return;
    }
    const movie = resp.find((item: any) => item.id === e.currentTarget.id);
    setSelected([...selected, movie]);
  };

  // handleDismiss is called when a user clicks on the dismiss button on a notification
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    const movie = selected.find((item: any) => item.id === e.currentTarget.id);
    const filtered = selected.filter((item: any) => item.id !== movie.id);
    setSelected(filtered);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start py-24 px-20">
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
            className="w-full text-lg px-4 py-1 rounded-lg bg-black text-zinc-200 placeholder:text-zinc-500 outline-none border-none ring-0 focus:ring-0"
            type="text"
            onChange={handleInput}
            placeholder="Search by Movie title"
          />
        </form>
      </main>
      {resp && (
        <div id="searchResults" className="flex flex-wrap gap-4">
          {resp.map((movie: any) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      )}
      <aside
        id="noticationBar"
        className="w-96 fixed bottom-0 right-0 pr-20 pb-10"
      >
        {selected &&
          selected.map((movie: any) => (
            <NotificationItem
              key={movie.id}
              movie={movie}
              handleDismiss={handleDismiss}
            />
          ))}
      </aside>
    </div>
  );
};

const MovieItem = ({
  movie,
  handleSelect,
}: {
  movie: any;
  handleSelect: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      onClick={(e) => handleSelect(e)}
      className="flex w-[10rem] flex-col p-1 cursor-pointer rounded-lg bg-black hover:bg-zinc-800 hover:backdrop-blur-lg duration-300 group"
      id={movie.id}
    >
      <img className="rounded-lg h-3/4" src={movie.i.imageUrl} alt={movie.l} />
      <p className="text-zinc-400 mt-2 mx-2 group-hover:text-white duration-300">
        {movie.l}
      </p>
    </div>
  );
};

const NotificationItem = ({
  movie,
  handleDismiss,
}: {
  movie: any;
  handleDismiss: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="flex text-sm w-full bg-zinc-300 backdrop-blur-sm text-black px-3 py-2 rounded-md items-start justify-between gap-2 mb-2">
      <p className="overflow-ellipsis">Added {movie.l}</p>
      <div className="flex justify-center items-center gap-2">
        <button id={movie.id} onClick={(e) => handleDismiss(e)}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default AddMovies;
