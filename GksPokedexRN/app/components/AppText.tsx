import * as React from "react";
import { Text, TextProps } from "react-native";
import { colors, fontSizes } from "../appStyles";

export const AppText: React.FC<TextProps> = ({ style, ...rest }) => (
  <Text
    style={[
      {
        color: colors.black,
        fontSize: fontSizes.base,
      },
      style,
    ]}
    {...rest}
  />
);
