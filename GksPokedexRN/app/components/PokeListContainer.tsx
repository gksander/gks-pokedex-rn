import * as React from "react";
import { DATA_BASE_URL } from "../config";
import { useInfiniteQuery } from "react-query";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";

/**
 * Create context to use
 */
export const PokeListContext = React.createContext<
  | {
      list: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"][];
      meta: Omit<ReturnType<typeof useInfiniteQuery>, "data">;
    }
  | undefined
>(undefined);

/**
 * Fetching pokemont list
 */
const fetchPokeList = (_key: string, page = 1) =>
  fetch(
    `${DATA_BASE_URL}/detailed-list/${page === 1 ? "" : `${page}/`}index.json`,
  ).then((res) => res.json());

/**
 * Create actual container for fetching pokemon and providing data/utilities
 */
export const PokeListContainer: React.FC = ({ children }) => {
  const { data, ...meta } = useInfiniteQuery<FetchPokeListDTO>(
    "pokelist",
    fetchPokeList,
    {
      getFetchMore: (lastGroup, allGroups) => {
        const currentPage =
          lastGroup?.data?.allPokemon?.pageInfo?.currentPage || 0;
        const totalPages =
          lastGroup?.data?.allPokemon?.pageInfo?.totalPages || 0;

        return currentPage >= totalPages ? false : currentPage + 1;
      },
      cacheTime: Infinity,
    },
  );

  const list = React.useMemo(() => {
    return (data || [])
      .filter(Boolean)
      .reduce(
        (list, currentGroup) =>
          list.concat(
            currentGroup.data.allPokemon.edges.map((edge) => edge.node),
          ),
        [] as FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"][],
      );
  }, [data]);

  return (
    <PokeListContext.Provider value={{ list, meta }}>
      {children}
    </PokeListContext.Provider>
  );
};
