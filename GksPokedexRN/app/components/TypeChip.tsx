import * as React from "react";
import { Text, TouchableOpacity, ViewStyle, Animated } from "react-native";
import { FetchPokeListDTO } from "../dto/FetchPokeList.dto";
import { colors, spacing, TypeColors } from "../appStyles";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";

type TypeChipProps = {
  type: FetchPokeListDTO["data"]["allPokemon"]["edges"][0]["node"]["types"][0];
  isTouchable?: boolean;
  style?: ViewStyle;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export const TypeChip: React.FC<TypeChipProps> = ({
  type,
  isTouchable = false,
  style = {},
}) => {
  const navigation = useNavigation();

  const text = (
    <Text
      style={{
        color: TypeColors[type.name]?.font || colors.black,
        fontWeight: "600",
      }}
    >
      {type.name}
    </Text>
  );

  const baseStyle: ViewStyle = {
    backgroundColor: TypeColors[type.name]?.bg || "lightblue",
    paddingVertical: spacing.xs,
    width: 75,
    alignItems: "center",
    borderRadius: 3,
  };

  if (isTouchable) {
    return (
      <AnimatedTouchableOpacity
        style={[baseStyle, style]}
        onPress={() =>
          navigation.navigate(ROUTES.TYPE_DETAIL, { slug: type.slug })
        }
      >
        {text}
      </AnimatedTouchableOpacity>
    );
  }

  return <Animated.View style={[baseStyle, style]}>{text}</Animated.View>;
};
