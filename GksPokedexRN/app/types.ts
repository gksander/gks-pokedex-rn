import { FetchPokeListDTO } from "./dto/FetchPokeList.dto";

export type PokemonFromPokeList = FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
export type EvChainSpecies = PokemonFromPokeList["species"]["evolution_chain"]["links"][0]["species"];
