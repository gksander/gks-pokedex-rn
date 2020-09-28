import * as React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { PokeListCard } from "../components/PokeListCard";
import { PokeListContext } from "../components/PokeListContainer";

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
      renderItem={({ item }) => <PokeListCard key={item.name} pokemon={item} />}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      onEndReached={() => {
        if (!isFetchingMore && canFetchMore) fetchMore();
      }}
    />
  );
};
