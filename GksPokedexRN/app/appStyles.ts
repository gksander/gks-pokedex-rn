import { ViewStyle } from "react-native";

export const spacing = {
  xs: 5,
  sm: 8,
  base: 12,
  lg: 18,
  xl: 27,
  xxl: 40,
};

export const colors = {
  black: "rgba(50,50,50,1)",
  gray: "rgb(130, 130, 130)",
  white: "white",
};

export const fontSizes = {
  sm: 14,
  base: 16,
  lg: 24,
  xl: 36,
};

// See: https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
export const TypeColors: { [key: string]: { font: string; bg: string } } = {
  Bug: { font: colors.white, bg: "#6D7815" },
  Dark: { font: colors.white, bg: "#49392F" },
  Dragon: { font: colors.white, bg: "#7038F8" },
  Electric: { font: colors.white, bg: "#F8D030" },
  Fairy: { font: colors.white, bg: "#EE99AC" },
  Fighting: { font: colors.white, bg: "#7D1F1A" },
  Fire: { font: colors.white, bg: "#F08030" },
  Flying: { font: colors.white, bg: "#A890F0" },
  Ghost: { font: colors.white, bg: "#493963" },
  Grass: { font: colors.white, bg: "#78C850" },
  Ground: { font: colors.white, bg: "#927D44" },
  Ice: { font: colors.white, bg: "#98D8D8" },
  Normal: { font: colors.white, bg: "#A8A878" },
  Poison: { font: colors.white, bg: "#A040A0" },
  Psychic: { font: colors.white, bg: "#F85888" },
  Rock: { font: colors.white, bg: "#B8A038" },
  Steel: { font: colors.white, bg: "#787887" },
  Water: { font: colors.white, bg: "#6890F0" },
};

export const cardShadow: Partial<ViewStyle> = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 4,
  elevation: 9,
};
