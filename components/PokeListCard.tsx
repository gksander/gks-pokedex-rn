import * as React from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { IMG_BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";
import { colors, fontSizes, spacing } from "../appStyles";
import { TypeChip } from "./TypeChip";
import { Spacer } from "./Spacer";
import { Pokeball } from "./Pokeball";

const IMAGE_SHIFT = 30;

type PokeListCardProps = {
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
};

/**
 * Card for showing pokemon on list page
 */
export const PokeListCard: React.FC<PokeListCardProps> = ({ pokemon }) => {
  // Util
  const navigation = useNavigation();

  // Border color
  const color = React.useMemo(() => {
    const [r, g, b] = pokemon?.species?.colorPalette?.DarkVibrant?.rgb ||
      pokemon?.species?.colorPalette?.Vibrant?.rgb ||
      pokemon?.species?.colorPalette?.DarkMuted?.rgb || [0, 0, 0];
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }, [pokemon]);

  // Local state
  const animValue = React.useRef(new Animated.Value(0)).current;
  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });
  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const imageTranslateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-IMAGE_SHIFT, -IMAGE_SHIFT / 2],
  });

  const onPressIn = () => {
    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 125,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(animValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 125,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() =>
        navigation.navigate(ROUTES.POKE_DETAILS, { id: pokemon.id })
      }
    >
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: spacing.base,
          borderColor: "lightgray",
          borderRadius: 8,
          borderBottomColor: color,
          borderBottomWidth: 4,
          backgroundColor: "white",
          // Shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 4,
          elevation: 9,
          paddingBottom: -IMAGE_SHIFT,
          opacity,
          transform: [{ scale }],
        }}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              overflow: "hidden",
            },
          ]}
        >
          <View
            style={{
              width: 150,
              height: 150,
              position: "absolute",
              bottom: -45,
              right: -30,
            }}
          >
            <Pokeball fill={color} opacity={0.2} />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: colors.black,
              fontSize: fontSizes.base,
            }}
          >
            #{pokemon.id}
          </Text>
          <Text style={{ fontSize: fontSizes.lg, color, fontWeight: "bold" }}>
            {pokemon.name}
          </Text>
          <Spacer height={spacing.xs} />
          <View style={{ flexDirection: "row" }}>
            {pokemon.types.map((type) => (
              <React.Fragment key={type.name}>
                <TypeChip type={type} />
                <Spacer width={spacing.sm} />
              </React.Fragment>
            ))}
          </View>
        </View>
        <Animated.Image
          source={{
            uri: `${IMG_BASE_URL}/${pokemon.id}.png`,
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            transform: [{ translateY: imageTranslateY }],
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
