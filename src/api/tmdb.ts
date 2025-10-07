import axios from "axios";
import {Genre, Detail, Summary} from "../types";

const V3 = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";


const bearer = process.env.REACT_APP_TMDB_BEARER;
const apiKey = process.env.REACT_APP_TMDB_KEY;

const api = axios.create({
  baseURL: V3,
  headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
  params: !bearer && apiKey ? { api_key: apiKey } : undefined,
});


const cache = new Map<string, unknown>();
const memo = async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
  if (cache.has(key)) return cache.get(key) as T;
  const val = await fn();
  cache.set(key, val);
  return val;
};


export const posterUrl = (path: string | null | undefined) =>
  path ? `${IMAGE_BASE}${path}` :
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'>
       <rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#888' font-family='sans-serif'>No Image</text>
     </svg>`
  );

export async function MovieSearch(query: string): Promise<Summary[]> {
  const key = `search:${query}`;
  return memo(key, async () => {
    if (!query) return [];
    const { data } = await api.get("/search/movie", { params: { query } });
    return (data?.results || []) as Summary[];
  });
}

export async function Genres(): Promise<Genre[]> {
  return memo("genres", async () => {
    const { data } = await api.get("/genre/movie/list");
    return (data?.genres || []) as Genre[];
  });
}


export async function Discover(genreId: number): Promise<Summary[]> {
  const key = `discover:${genreId}`;
  return memo(key, async () => {
    const { data } = await api.get("/discover/movie", { params: { with_genres: genreId } });
    return (data?.results || []) as Summary[];
  });
}

export async function MovieId(id: number): Promise<Detail | null> {
  const key = `detail:${id}`;
  return memo(key, async () => {
    const { data } = await api.get(`/movie/${id}`);
    return (data || null) as Detail | null;
  });
}
