import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { DATA_BASE_URL } from "../config";
import { useInfiniteQuery, useQuery } from "react-query";
import { FetchTypeDetailsDTO } from "../dto/FetchTypeDetails.dto";
import { PokemonFromTypeDetailList } from "../types";
import { spacing } from "../appStyles";
import { Spacer } from "../components/Spacer";

/**
 * Fetching type details
 */
const fetchTypeDetails = (typeSlug: string, page = 1) =>
  fetch(
    `${DATA_BASE_URL}/types/${typeSlug}/${
      page === 1 ? "" : `${page}/`
    }index.json`,
  ).then((res) => res.json());

/**
 * Type details
 */
export const TypeDetailView: React.FC = () => {
  const route = useRoute();
  const slug = (route?.params as any)?.["slug"] || "water";

  const {
    status,
    data,
    isFetchingMore,
    canFetchMore,
    fetchMore,
  } = useInfiniteQuery<FetchTypeDetailsDTO>(slug, fetchTypeDetails, {
    getFetchMore: (lastGroup, allGroups) => {
      const currentPage =
        lastGroup?.data?.type?.belongsTo?.pageInfo?.currentPage || 0;
      const totalPages =
        lastGroup?.data?.type?.belongsTo?.pageInfo?.totalPages || 0;

      return currentPage >= totalPages ? false : currentPage + 1;
    },
  });

  // Get type details
  const type = data?.[0]?.data?.type;

  // Aggregate the pokemon
  const pokeList = React.useMemo(
    () =>
      (data || [])
        .filter(Boolean)
        .reduce(
          (list, currentGroup) =>
            list.concat(
              (currentGroup?.data?.type?.belongsTo?.edges || []).map(
                (edge) => edge.node,
              ),
            ),
          [] as PokemonFromTypeDetailList[],
        ),
    [data],
  );

  console.log(pokeList);

  // S TODO: Pretty up
  if (status === "loading") return <ActivityIndicator />;
  if (status === "error") return <Text>Something went wrong</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: spacing.base }}>
        <Text style={{ fontSize: 24 }}>{type?.name || ""}</Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <FlatList
          data={pokeList}
          contentContainerStyle={{ padding: spacing.base }}
          ItemSeparatorComponent={() => <Spacer height={spacing.base} />}
          renderItem={({ item }) => (
            <View
              style={{
                padding: spacing.base,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          )}
          onEndReached={() =>
            canFetchMore && !isFetchingMore ? fetchMore() : null
          }
        />
      </View>
    </SafeAreaView>
  );
};
