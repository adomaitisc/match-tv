import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const IMDb =
  "https://v3.sg.media-imdb.com/suggestion/titles/x/_.json?includeVideos=1";

const AddMovies = () => {
  const [resp, setResp] = useState([]);

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

  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-10 px-20">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-zinc-200 mb-4">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">
            Your Movies
          </span>
        </h1>
        <form className="w-full flex">
          <input
            className="w-full text-lg px-4 py-2 rounded-lg bg-zinc-300 text-zinc-900 placeholder:text-zinc-500 placeholder:font-normal font-medium outline-none border-none ring-0 focus:ring-0"
            type="text"
            onChange={handleInput}
            placeholder="Search by Movie title"
          />
        </form>
      </div>
      {resp && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {resp.map((movie: any) => (
            <div
              className="flex w-[10rem] flex-col p-1 cursor-pointer rounded-lg hover:z-10 bg-zinc-900 hover:bg-zinc-800 hover:backdrop-blur-lg duration-200"
              key={movie.id}
            >
              <img
                className="rounded-lg h-3/4"
                src={movie.i.imageUrl}
                alt={movie.l}
              />
              <p className="text-white font-medium mt-2 mx-2">{movie.l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMovies;
