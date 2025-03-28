import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";

function App() {
  const [recomendation, setRecomendation] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const [gotSearch, setGotSearch] = useState(undefined);
  const [pickGenre, setPickGenre] = useState(undefined);
  const [genre, setGenre] = useState(undefined);

  const inputHeader = useRef();
  const valueHeader = useRef();
  const headerRef = { inputHeader, valueHeader };

  const modal = useRef();

  const onSearch = useCallback(() => {
    // console.log(inputHeader.current.value);
    if (!search) return;
    (async () => {
      const api = import.meta.env.VITE_API_KEY;

      const resSearch = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${search}`
      );
      // console.log( resSearch.status === 404);

      const jsonSearch = await resSearch.json();
      console.log(jsonSearch.results.length === 0);

      if (jsonSearch.results.length === 0) {
        modal.current.open();
        document.body.style.overflow = "hidden";
        return;
      }

      setGotSearch(() => {
        return { search: jsonSearch.results };
      });
    })();
  }, [search]);

  const onSelectGenre = useCallback(() => {
    (async () => {
      const api = import.meta.env.VITE_API_KEY;
      const type = valueHeader.current.selectedOptions[0];
      const atribute = type ? type.getAttribute("name") : "";

      const reqGenre = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api}&with_genres=${pickGenre}`
      );
      const reqJson = await reqGenre.json();
      setGenre(() => {
        return { [atribute]: reqJson.results };
      });
    })();
  }, [pickGenre]);

  useEffect(() => {
    (async () => {
      const api = import.meta.env.VITE_API_KEY;
      const url = [
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${api}`,
        `https://api.themoviedb.org/3/movie/popular?api_key=${api}`,
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${api}`,
      ];
      const [trending, popular, topRated] = await Promise.all(
        url.map((u) => fetch(u).then((item) => item.json()))
      );

      setRecomendation((prev) => {
        return {
          ...prev,
          trending: trending.results,
          popular: popular.results,
          top_rated: topRated.results,
        };
      });
    })();
  }, []);

  useEffect(() => {
    onSelectGenre();
  }, [onSelectGenre]);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  function handleSearch() {
    if (inputHeader.current.value === "") {
      return inputHeader.current.focus();
    }
    setSearch(inputHeader.current.value);
  }

  return (
    <>
      <Modal ref={modal} inputHeader={inputHeader.current} />
      <Header
        handleSearch={handleSearch}
        ref={headerRef}
        pick={(e) => setPickGenre(e.target.value)}
      />
      {!!pickGenre && <Main data={genre} />}
      {!!gotSearch && <Main data={gotSearch} />}
      {!!recomendation && <Main data={recomendation} />}
    </>
  );
}

export default App;
