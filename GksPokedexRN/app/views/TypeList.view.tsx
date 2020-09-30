import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DATA_BASE_URL } from "../config";
import { useQuery } from "react-query";
import { FetchTypeListDTO } from "../dto/FetchTypeList.dto";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";
import {
  cardShadow,
  colors,
  fontSizes,
  spacing,
  TypeColors,
} from "../appStyles";
import { Spacer } from "../components/Spacer";
import { FlatGrid } from "react-native-super-grid";
import { TypeChip } from "../components/TypeChip";

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
    () =>
      (data?.data?.allType?.edges || [])
        .map((edge) => edge.node)
        .filter((type) => !["Unknown", "Shadow"].includes(type.name)),
    [data],
  );

  // S TODO: Pretty these up
  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Something went wrong</Text>;

  return (
    <SafeAreaView>
      <FlatGrid
        data={typeList}
        renderItem={({ item }) => (
          <TypeChip
            type={item}
            isTouchable={true}
            style={{ width: "100%", ...cardShadow, padding: spacing.base }}
            textStyle={{ fontWeight: "bold", fontSize: fontSizes.base }}
          />
        )}
        contentContainerStyle={{ height: "100%" }}
      />
    </SafeAreaView>
  );
};
