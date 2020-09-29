export interface FetchTypeDetailsDTO {
  hash: string;
  data: Data;
  context: Context;
}

interface Context {}

interface Data {
  type: Type;
  allDamageFactor: AllDamageFactor;
}

interface AllDamageFactor {
  edges: AllDamageFactorEdge[];
}

interface AllDamageFactorEdge {
  node: Node;
}

interface Node {
  target_type: Type;
  damage_factor: string;
}

interface BelongsToEdge {
  node: Type;
}

interface BelongsTo {
  pageInfo: PageInfo;
  edges: BelongsToEdge[];
}

interface Type {
  id: string;
  name: string;
  slug: string;
  belongsTo: BelongsTo;
  species: Species;
}

interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  currentPage: number;
}

interface Species {
  colorPalette: ColorPalette;
}

interface ColorPalette {
  Vibrant: DarkMuted | null;
  DarkMuted: DarkMuted | null;
  DarkVibrant: DarkMuted | null;
  LightMuted: DarkMuted | null;
  LightVibrant: DarkMuted | null;
}

interface DarkMuted {
  rgb: number[];
}
