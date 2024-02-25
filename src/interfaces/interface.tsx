import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";

export interface BackgroundColorProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
