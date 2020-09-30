export interface FetchSearchListDTO {
  hash: string;
  data: Data;
  context: Context;
}

interface Context {}

interface Data {
  allPokemon: AllPokemon;
}

interface AllPokemon {
  edges: Edge[];
}

interface Edge {
  node: Node;
}

interface Node {
  id: string;
  name: string;
  slug: string;
  types: Node[];
}
