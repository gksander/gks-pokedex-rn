import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";
import { PokeListCard } from "../components/PokeListCard";
import { PokeListContext } from "../components/PokeListContainer";
import { spacing } from "../appStyles";

const CardWidth = (Dimensions.get("window").width - 3 * spacing.base) / 2;

/**
 * Pokemon list
 */
export const PokeListView: React.FC = () => {
  const {
    list,
    meta: { status, isFetchingMore, fetchMore, canFetchMore },
  } = React.useContext(PokeListContext)!;

  if (status === "loading") return <ActivityIndicator />;
  if (status === "error") return <Text>Something went wrong</Text>;

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 2, maxWidth: CardWidth }}>
          <PokeListCard key={item.name} pokemon={item} />
        </View>
      )}
      contentContainerStyle={{ padding: spacing.base }}
      onEndReached={() => {
        if (!isFetchingMore && canFetchMore) fetchMore();
      }}
      numColumns={2}
      columnWrapperStyle={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      ItemSeparatorComponent={() => <View style={{ height: spacing.base }} />}
    />
  );
};
