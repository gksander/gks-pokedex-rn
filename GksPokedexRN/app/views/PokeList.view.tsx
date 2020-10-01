import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
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
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <PokeListCard key={item.name} pokemon={item} />
        )}
        contentContainerStyle={{
          padding: spacing.base,
          paddingTop: 2 * spacing.base,
        }}
        onEndReached={() => {
          if (!isFetchingMore && canFetchMore) fetchMore();
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 2 * spacing.base }} />
        )}
        ListFooterComponent={
          isFetchingMore ? (
            <View style={{ padding: spacing.base }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};
