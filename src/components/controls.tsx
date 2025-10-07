import { SortDir, SortKey } from "../types";
import "../App.css";

export default function Controls({
  keyValue,
  dir,
  onKey,
  onDir,
}: {
  keyValue: "title" | "date";
  dir: "asc" | "desc";
  onKey: (k: "title" | "date") => void;
  onDir: (d: "asc" | "desc") => void;
}) {
  return (
    <div className="row-sort">
      <label>
        Sort by:
        <select
          value={keyValue}
          onChange={(e) => onKey(e.target.value as "title" | "date")}
        >
          <option value="title">Title</option>
          <option value="date">Release Date</option>
        </select>
      </label>

      <button
        className="primary"
        onClick={() => onDir(dir === "asc" ? "desc" : "asc")}
      >
        {dir === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
}
