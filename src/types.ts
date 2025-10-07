
export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Summary {
    id: number;
    title: string;
    release_date?: string;
    poster_path?: string;
    vote_average?: number;
    popularity?: number;
  }
  

  export interface Detail extends Summary {
    overview?: string;
    genres?: Genre[];
    homepage?: string;
  }
  

  export type SortKey = "title" | "rating" | "popularity" | "date";
  export type SortDir = "asc" | "desc";
  

  export {};
  