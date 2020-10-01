import * as React from "react";
import { Text, ViewStyle, TextStyle, View } from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { colors, spacing, TypeColors } from "../appStyles";

type TypeChipProps = {
  type: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"]["types"][0];
  style?: ViewStyle;
  textStyle?: TextStyle;
};

/**
 * Type Chip for displaying a type
 */
export const TypeChip: React.FC<TypeChipProps> = ({
  type,
  style = {},
  textStyle = {},
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: TypeColors[type.name]?.bg || "lightblue",
          padding: spacing.xs,
          width: 75,
          alignItems: "center",
          borderRadius: 3,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: TypeColors[type.name]?.font || colors.black,
            fontWeight: "600",
          },
          textStyle,
        ]}
      >
        {type.name}
      </Text>
    </View>
  );
};
