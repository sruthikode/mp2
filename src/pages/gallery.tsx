import { useEffect, useState } from "react";
import { Discover, Genres } from "../api/tmdb";
import { Genre, Summary } from "../types";
import MoviePoster from "../components/movieposter";
import Filters from "../components/filters";
import { useResults } from "../context/results";
import "../App.css";

export default function GalleryView() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selected, setSelected] = useState<{ genres: number[] }>({ genres: [] });
  const [pool, setPool] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setList } = useResults();


  useEffect(() => {
    Genres().then(setGenres);
  }, []);


  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selected.genres.length === 0) {
          setPool([]);
          setList([]);
          return;
        }
        const parts: Summary[][] = [];
        for (const gid of selected.genres) {
          parts.push(await Discover(gid));
        }


        const merged: Record<number, Summary> = {};
        for (const arr of parts) {
          for (const m of arr) merged[m.id] = m;
        }

        const list = Object.values(merged);
        setPool(list);
        setList(list);
      } catch {
        setError("Load Error");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [selected]);

  return (
    <section className="section">
      <h2>Gallery View</h2>

      <Filters
        genres={genres}
        selectedGenres={selected.genres}
        onChange={setSelected}
      />

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading…</p>}

      <div className="grid">
        {pool.map((m) => (
          <MoviePoster key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}

