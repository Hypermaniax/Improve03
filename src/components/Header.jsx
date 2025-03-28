import { forwardRef, useEffect, useState } from "react";
import movie from "../assets/movie.svg";
import search from "../assets/search.svg";

const Header = forwardRef(function Header({ handleSearch, pick } ,ref) {
  const [genre, setGenre] = useState(undefined);

  useEffect(() => {
    (async () => {
      const api = import.meta.env.VITE_API_KEY;
      const resGenre = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`
      );
      const json = await resGenre.json();

      setGenre(json.genres.map((item) => item));
    })();
  }, []);

  return (
    <header className=" bg-slate-500 p-5  flex  flex-col-reverse sm:flex-row sm:items-center mx-auto justify-between">
      <div className="flex gap-3 mt-3 sm:mt-0 justify-end">
        <img src={movie} className="h-9" alt="" />
        <select
          id="Genre"
          onClick={pick}
          ref={ref.valueHeader}
          className="outline-none rounded-lg "
        >
          {!!genre &&
            genre.map((item, index) => (
              <option key={index} value={item.id} name={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="wrrapperSearch flex h-10 ">
        <input
          type="text"
          placeholder="Search"
          ref={ref.inputHeader}
          className="p-1  rounded-l-xl outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="p-0 m-0 bg-orange-300 outline-none"
        >
          <img src={search} className="h-9" alt="" />
        </button>
      </div>
    </header>
  );
});
export default Header