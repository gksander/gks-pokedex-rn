import * as React from "react";
import { Text, View } from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { colors, spacing, TypeColors } from "../appStyles";

type TypeChipProps = {
  type: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"]["types"][0];
};

export const TypeChip: React.FC<TypeChipProps> = ({ type }) => {
  return (
    <View
      style={{
        backgroundColor: TypeColors[type.name]?.bg || "lightblue",
        paddingVertical: spacing.xs,
        paddingHorizontal: 2 * spacing.xs,
        borderRadius: 3,
      }}
    >
      <Text style={{ color: TypeColors[type.name]?.font || colors.black }}>
        {type.name}
      </Text>
    </View>
  );
};
