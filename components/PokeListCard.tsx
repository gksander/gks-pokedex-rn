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
import { spacing } from "../appStyles";
import { Spacer } from "./Spacer";

type PokeListCardProps = {
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
};

export const PokeListCard: React.FC<PokeListCardProps> = ({ pokemon }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        padding: spacing.base,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
        borderRadius: 8,
      }}
      onPress={() =>
        navigation.navigate(ROUTES.POKE_DETAILS, { id: pokemon.id })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>{pokemon.name}</Text>
        <Text>#{pokemon.id}</Text>
      </View>
      <Spacer height={spacing.base} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          {pokemon.types.map((type) => (
            <Text key={type.slug}>{type.name}</Text>
          ))}
        </View>
        <Spacer width={spacing.base} />
        <Image
          source={{
            uri: `${IMG_BASE_URL}/${pokemon.id}.png`,
          }}
          style={{
            width: 60,
            height: 60,
            resizeMode: "contain",
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
