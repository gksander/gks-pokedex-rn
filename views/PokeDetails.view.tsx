import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokeListContext } from "../components/PokeListContainer";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { IMG_BASE_URL } from "../config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { spacing } from "../appStyles";

const { width } = Dimensions.get("window");

/**
 * Detail slider view
 */
export const PokeDetailsView: React.FC = () => {
  // Data
  const {
    list,
    meta: { status, canFetchMore, fetchMore, isFetchingMore },
  } = React.useContext(PokeListContext)!;

  // Local animation state
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = React.useRef<FlatList>(null);

  // When route param for pokemon ID changes, we go to that route
  const navigation = useNavigation();
  const route = useRoute();
  const pokemonId = (route?.params as any)?.["id"];

  React.useEffect(() => {
    const theIndex = list.findIndex((poke) => poke.id === pokemonId);
    if (theIndex > -1) {
      scrollX.setValue(theIndex * width);
      flatlistRef?.current?.scrollToIndex({ index: theIndex, animated: false });
    }
  }, [pokemonId]);

  // S TODO: Pretty up
  if (status === "loading") return <ActivityIndicator />;

  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <SafeAreaView>
        <View style={{ padding: spacing.base }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Animated.FlatList
        ref={flatlistRef}
        data={list}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        getItemLayout={(_, index) => ({
          length: width,
          offset: index * width,
          index,
        })}
        scrollEventThrottle={16}
        decelerationRate={-1}
        snapToInterval={width}
        renderItem={({ item, index }) => (
          <PokeItem pokemon={item} scrollX={scrollX} itemIndex={index} />
        )}
      />
    </View>
  );
};

/**
 * Item in the main carousel
 */
const PokeItem: React.FC<{
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
  scrollX: Animated.Value;
  itemIndex: number;
}> = ({ pokemon, scrollX, itemIndex }) => {
  const inputRange = [
    (itemIndex - 1) * width,
    itemIndex * width,
    (itemIndex + 1) * width,
  ];

  // Transforms
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const opacity = scrollX.interpolate({
    inputRange: [
      (itemIndex - 0.5) * width,
      itemIndex * width,
      (itemIndex + 0.5) * width,
    ],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={{ width }}>
      <View style={{ alignItems: "center" }}>
        <Animated.Image
          source={{ uri: `${IMG_BASE_URL}/${pokemon.id}.png` }}
          style={[
            styles.imageStyle,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        />
        <Text>{pokemon.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: width / 1.8,
    height: width / 1.8,
    resizeMode: "contain",
  },
});
