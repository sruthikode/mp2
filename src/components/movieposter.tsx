import React from 'react';
import { Link } from "react-router-dom";
import { posterUrl } from "../api/tmdb";
import { Summary as Summary } from "../types";
import "../App.css";

export default function MoviePoster({ m }: { m: Summary }) {
    const year = m.release_date ? new Date(m.release_date).getFullYear() : "—";
  
    return (
      <Link to={`/movie/${m.id}`} className="card" aria-label={`Open ${m.title}`}>
        <img
          src={posterUrl(m.poster_path)}
          alt={m.title}
          loading="lazy"
        />
        <div className="card-body">
          <h3 className="card-title">{m.title}</h3>
          <p className="card-meta">
            ⭐ {m.vote_average?.toFixed?.(1) ?? "—"} • {year}
          </p>
        </div>
      </Link>
    );
}

