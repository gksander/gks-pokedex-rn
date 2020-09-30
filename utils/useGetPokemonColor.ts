import * as React from "react";
import { PokemonFromPokeList } from "../types";

export const useGetPokemonColor = (pokemon: PokemonFromPokeList) => {
  return React.useMemo(() => {
    const [r, g, b] = pokemon?.species?.colorPalette?.DarkVibrant?.rgb ||
      pokemon?.species?.colorPalette?.Vibrant?.rgb ||
      pokemon?.species?.colorPalette?.DarkMuted?.rgb || [0, 0, 0];
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }, [pokemon]);
};
