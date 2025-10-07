import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Summary } from "../types";

type Results_val = {
  list: Summary[];
  setList: (x: Summary[]) => void;
  getNeighbors: (id: number) => { prev?: Summary; next?: Summary };
};

const cont = createContext<Results_val | null>(null);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [list, setList] = useState<Summary[]>([]);
  const indexMapRef = useRef<Map<number, number>>(new Map());

  const value = useMemo<Results_val>(() => ({
    list,
    setList: (x) => {
      indexMapRef.current = new Map(x.map((m, i) => [m.id, i]));
      setList(x);
    },
    getNeighbors: (id: number) => {
      const idx = indexMapRef.current.get(id);
      if (idx === undefined) return {};
      return {
        prev: idx > 0 ? list[idx - 1] : undefined,
        next: idx < list.length - 1 ? list[idx + 1] : undefined,
      };
    },
  }), [list]);

  return <cont.Provider value={value}>{children}</cont.Provider>;
};

export const useResults = () => {
  const c = useContext(cont);
  if (!c) throw new Error("use outside of bounds");
  return c;
};
export {};
