import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { IMG_BASE_URL } from "../config";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";

type PokeListCardProps = {
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
};

export const PokeListCard: React.FC<PokeListCardProps> = ({ pokemon }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
        borderRadius: 8,
        flexDirection: "row",
      }}
      onPress={() => navigation.navigate(ROUTES.POKE_DETAILS)}
    >
      <View>
        <Image
          source={{
            uri: `${IMG_BASE_URL}/${pokemon.id}.png`,
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 18 }}>{pokemon.name}</Text>
        <Text>{pokemon.species.flavor_text}</Text>
      </View>
    </TouchableOpacity>
  );
};
