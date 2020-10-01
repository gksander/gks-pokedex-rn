import * as React from "react";
import { View } from "react-native";

/**
 * Spacer component
 */
export const Spacer: React.FC<{ width?: number; height?: number }> = ({
  width,
  height,
}) => {
  return <View style={{ width, height }} />;
};
