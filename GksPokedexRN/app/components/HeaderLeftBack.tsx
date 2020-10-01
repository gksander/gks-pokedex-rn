import * as React from "react";
import { colors, fontSizes, spacing } from "../appStyles";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Spacer } from "./Spacer";

/**
 * Custom back button
 */
export const HeaderLeftBack: React.FC<{ textColor?: string }> = ({
  textColor = colors.black,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: spacing.base,
        backgroundColor: "transparent",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center" }}
        hitSlop={{
          left: spacing.base,
          right: spacing.base,
          top: spacing.base,
          bottom: spacing.base,
        }}
      >
        <MaterialCommunityIcons
          name="backburger"
          size={1.2 * fontSizes.base}
          color={textColor}
        />
        <Spacer width={spacing.sm} />
        <Text
          style={{
            fontSize: fontSizes.base,
            color: textColor,
            fontWeight: "600",
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};
