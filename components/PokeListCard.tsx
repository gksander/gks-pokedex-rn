import * as React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { IMG_BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";
import { colors, spacing } from "../appStyles";
import { TypeChip } from "./TypeChip";
import { Spacer } from "./Spacer";

const IMAGE_SHIFT = 30;

type PokeListCardProps = {
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
};

export const PokeListCard: React.FC<PokeListCardProps> = ({ pokemon }) => {
  const navigation = useNavigation();
  const [r, g, b] = pokemon?.species?.colorPalette?.DarkVibrant?.rgb ||
    pokemon?.species?.colorPalette?.LightMuted?.rgb || [255, 255, 255];
  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <TouchableOpacity
      style={{
        padding: spacing.base,
        borderColor: "lightgray",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
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
      }}
      onPress={() =>
        navigation.navigate(ROUTES.POKE_DETAILS, { id: pokemon.id })
      }
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            overflow: "hidden",
          },
        ]}
      >
        <Image
          source={require("../assets/pokeball.png")}
          style={{
            width: 150,
            height: 150,
            position: "absolute",
            bottom: -40,
            right: -30,
          }}
        />
      </View>
      <View>
        <Text style={{ fontWeight: "bold", color: colors.black }}>
          #{pokemon.id}
        </Text>
        <Text style={{ fontSize: 24, color, fontWeight: "bold" }}>
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
      <Image
        source={{
          uri: `${IMG_BASE_URL}/${pokemon.id}.png`,
        }}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          transform: [{ translateY: -IMAGE_SHIFT }],
        }}
      />
    </TouchableOpacity>
  );
};
