import * as React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";
import { DATA_BASE_URL } from "../config";
import { useInfiniteQuery, useQuery } from "react-query";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { PokeListCard } from "../components/PokeListCard";

const fetchPokeList = (_key: string, page = 1) =>
  fetch(
    `${DATA_BASE_URL}/detailed-list/${page === 1 ? "" : `${page}/`}index.json`,
  ).then((res) => res.json());

export const PokeListView: React.FC = () => {
  const {
    status,
    data,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery<FetchPokeListDTO>("pokelist", fetchPokeList, {
    getFetchMore: (lastGroup, allGroups) => {
      const currentPage =
        lastGroup?.data?.allPokemon?.pageInfo?.currentPage || 0;
      const totalPages = lastGroup?.data?.allPokemon?.pageInfo?.totalPages || 0;

      return currentPage >= totalPages ? false : currentPage + 1;
    },
  });

  const numGroups = data?.length;
  const pokelist = React.useMemo(() => {
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

  if (status === "loading") return <ActivityIndicator />;
  if (status === "error") return <Text>Something went wrong</Text>;

  return (
    <FlatList
      data={pokelist}
      renderItem={({ item }) => <PokeListCard key={item.name} pokemon={item} />}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      onEndReached={() => {
        if (!isFetchingMore) fetchMore();
      }}
    />
  );
};
