export interface FetchPokeListDTO {
  hash: string;
  data: Data;
  context: Context;
}

interface Context {}

interface Data {
  allPokemon: AllPokemon;
}

interface AllPokemon {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Edge[];
}

interface Edge {
  node: Node;
}

interface Node {
  id: string;
  name: string;
  types: Type[];
  weight: number;
  height: number;
  stats: Stat[];
  prev_pokemon: null;
  next_pokemon: NextPokemon;
  species: NodeSpecies;
  damage_factors: DamageFactor[];
}

interface DamageFactor {
  damage_type: NextPokemon;
  damage_factor: string;
}

interface NextPokemon {
  slug: string;
  name: string;
}

interface NodeSpecies {
  flavor_text: string;
  color: string;
  colorPalette: ColorPalette;
  evolution_chain: EvolutionChain;
}

interface ColorPalette {
  Vibrant: DarkMuted;
  Muted?: DarkMuted;
  DarkVibrant: DarkMuted;
  LightVibrant: DarkMuted;
  DarkMuted: DarkMuted;
  LightMuted: DarkMuted;
}

interface DarkMuted {
  rgb: number[];
}

interface EvolutionChain {
  links: Link[];
}

interface Link {
  species: LinkSpecies;
}

interface LinkSpecies {
  pokemon: Type;
  evolves_from: EvolvesFrom | null;
}

interface EvolvesFrom {
  id: string;
}

interface Type {
  id: string;
  name: string;
  slug: string;
  species?: TypeSpecies;
}

interface TypeSpecies {
  colorPalette: ColorPalette;
}

interface Stat {
  base: string;
  name: string;
}

interface PageInfo {
  totalPages: number;
  currentPage: number;
}
