export interface FetchTypeListDTO {
  hash: string;
  data: Data;
  context: Context;
}

interface Context {}

interface Data {
  allType: AllType;
}

interface AllType {
  edges: Edge[];
}

interface Edge {
  node: Node;
}

interface Node {
  id: string;
  name: string;
  slug: string;
}
