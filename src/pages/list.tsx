import { useEffect, useMemo, useState } from "react";
import { MovieSearch } from "../api/tmdb";
import { Summary} from "../types";
import Search from "../components/search";
import Controls from "../components/controls";
import MoviePoster from "../components/movieposter";
import { useResults } from "../context/results";
import "../App.css";

export default function ListView() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raw, setRaw] = useState<Summary[]>([]);
  const [sortKey, setSortKey] = useState<"title" | "date">("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const { setList } = useResults();


  useEffect(() => {
    if (!q) {
      setRaw([]);
      setList([]);
      return;
    }
    setLoading(true);
    setError(null);
    MovieSearch(q)
      .then((res) => {
        setRaw(res);
        setList(res);
      })
      .catch(() => setError("Load Error"))
      .finally(() => setLoading(false));
  }, [q]);


  const list = useMemo(() => {
    const score = (m: Summary) => {
      switch (sortKey) {
        case "title":
          return (m.title || "").toLowerCase();
        case "date":
          return m.release_date ? new Date(m.release_date).getTime() : -Infinity;
      }
    };
    const sorted = [...raw].sort((a, b) => {
      const A = score(a) as any;
      const B = score(b) as any;
      if (typeof A === "string" && typeof B === "string") {
        return A.localeCompare(B) * (sortDir === "asc" ? 1 : -1);
      }
      return ((A as number) - (B as number)) * (sortDir === "asc" ? 1 : -1);
    });
    return sorted;
  }, [raw, sortKey, sortDir]);

  return (
    <section className="section">
      <h2>List View</h2>

      <Search value={q} onChange={setQ} placeholder="Search movies..." />

      <div className="row-between">
        <Controls
          keyValue={sortKey}
          dir={sortDir}
          onKey={setSortKey as (k: any) => void}
          onDir={setSortDir}
        />
        <p className="info">{raw.length} results</p>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading…</p>}

      <div className="grid">
        {list.map((m) => (
          <MoviePoster key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}

