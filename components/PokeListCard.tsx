import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { IMG_BASE_URL } from "../config";

type PokeListCardProps = {
  pokemon: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"];
};

export const PokeListCard: React.FC<PokeListCardProps> = ({ pokemon }) => {
  return (
    <View
      style={{
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
        borderRadius: 8,
        flexDirection: "row",
      }}
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
    </View>
  );
};
