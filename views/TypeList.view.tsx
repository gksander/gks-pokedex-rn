import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { DATA_BASE_URL } from "../config";
import { useQuery } from "react-query";
import { FetchTypeListDTO } from "../dto/FetchTypeList.dto";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";

/**
 * Fetch type list
 */
const fetchTypeList = () =>
  fetch(`${DATA_BASE_URL}/types/index.json`).then((res) => res.json());

/**
 * View for displaying types
 */
export const TypeListView: React.FC = () => {
  const navigation = useNavigation();

  const { isLoading, isError, data } = useQuery<FetchTypeListDTO>(
    "type_list",
    fetchTypeList,
    {
      cacheTime: Infinity,
    },
  );
  const typeList = React.useMemo(
    () => (data?.data?.allType?.edges || []).map((edge) => edge.node),
    [data],
  );

  // S TODO: Pretty these up
  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Something went wrong</Text>;

  return (
    <SafeAreaView>
      {typeList.map((type) => (
        <TouchableOpacity
          key={type.name}
          onPress={() =>
            navigation.navigate(ROUTES.TYPE_DETAIL, { slug: type.slug })
          }
        >
          <Text>{type.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};
