import { Dimensions, StyleSheet } from "react-native";

export const Viewport = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const FontSizes = {
  tiny: Viewport.width * 0.03,
  small: Viewport.width * 0.04,
  normal: Viewport.width * 0.05,
  medium: Viewport.width * 0.06,
  large: Viewport.width * 0.08,
  extraLarge: Viewport.width * 0.1,
};
