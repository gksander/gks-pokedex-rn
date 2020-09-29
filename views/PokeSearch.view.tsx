import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { DATA_BASE_URL } from "../config";
import { useQuery } from "react-query";
import { FetchSearchListDTO } from "../dto/FetchSearchList.dto";
import { spacing } from "../appStyles";
import { Spacer } from "../components/Spacer";

const fetchSearchList = () =>
  fetch(`${DATA_BASE_URL}/search/index.json`).then((res) => res.json());

export const PokeSearchView: React.FC = () => {
  const { isLoading, isError, data } = useQuery<FetchSearchListDTO>(
    "fetch_search_list",
    fetchSearchList,
    {
      cacheTime: Infinity,
    },
  );

  // S TODO: Pretty up
  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Something went wrong</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Search</Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <FlatList
          data={(data?.data?.allPokemon?.edges || []).map((edge) => edge.node)}
          renderItem={({ item }) => (
            <View style={{ padding: spacing.base }}>
              <Text>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: spacing.base }}
          ItemSeparatorComponent={() => <Spacer height={spacing.base} />}
        />
      </View>
    </SafeAreaView>
  );
};
