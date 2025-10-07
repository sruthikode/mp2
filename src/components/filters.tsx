import { useEffect, useState } from "react";
import { Genre } from "../types";
import "../App.css";

export default function Filters({
  genres,
  selectedGenres,
  onChange,
}: {
  genres: Genre[];
  selectedGenres: number[];
  onChange: (next: { genres: number[] }) => void;
}) {
  const [sel, setSel] = useState<number[]>(selectedGenres);

  useEffect(() => {
    onChange({ genres: sel });
  }, [sel]);

  const toggle = (id: number) => {
    setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);
  };

  return (
    <div className="filters">
      <fieldset>
        <legend>Genres</legend>
        <div className="chip-container">
          {genres.map((g) => (
            <button
              key={g.id}
              className={`chip ${sel.includes(g.id) ? "chip-active" : ""}`}
              onClick={() => toggle(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

