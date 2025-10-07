import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MovieId, posterUrl } from "../api/tmdb";
import { Detail } from "../types";
import { useResults } from "../context/results";
import "../App.css";

export default function DetailView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [movie, setMovie] = useState<Detail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getNeighbors } = useResults();

  useEffect(() => {
    if (!id) return;
    const num = Number(id);
    if (Number.isNaN(num)) return;
    setLoading(true);
    setError(null);
    MovieId(num)
      .then(setMovie)
      .catch(() => setError("Load Error"))
      .finally(() => setLoading(false));
  }, [id]);

  const numId = Number(id);
  const { prev, next } = getNeighbors(Number.isNaN(numId) ? -1 : numId);

  if (error) return <p className="error">{error}</p>;
  if (loading || !movie) return <p>Loading…</p>;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "—";
  const genres = movie.genres?.map((g) => g.name).join(", ") || "—";

  return (
    <article className="detail">
      <div className="detail-header">
        <button className="but" onClick={() => nav(-1)}>← Back</button>
        <div className="spacer" />
        <div className="prev-next">
          <button
            className="primary"
            disabled={!prev}
            onClick={() => prev && nav(`/movie/${prev.id}`)}
          >
            ← Prev
          </button>
          <button
            className="primary"
            disabled={!next}
            onClick={() => next && nav(`/movie/${next.id}`)}
          >
            Next →
          </button>
        </div>
      </div>


      <header className="detail-main">
        <img
          src={posterUrl(movie.poster_path)}
          alt={movie.title}
          className="detail-image"
        />
        <div>
          <h2>{movie.title}</h2>
          <p className="info">
            Rating: {movie.vote_average?.toFixed?.(1) ?? "—"} • {year}
          </p>
        </div>
      </header>


      <section>
        <p className="long-text">{movie.overview || "Overview Unavailable"}</p>
      </section>


      <footer className="detail-footer">
        <Link to="/">Back to List</Link> •{" "}
        <Link to="/gallery">Back to Gallery</Link>
      </footer>
    </article>
  );
}
