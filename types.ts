import { FetchTypeDetailsDTO } from "./dto/FetchTypeDetails.dto";

export type PokemonFromTypeDetailList = FetchTypeDetailsDTO["data"]["type"]["belongsTo"]["edges"][0]["node"];
