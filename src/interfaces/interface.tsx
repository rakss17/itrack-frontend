import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface BackgroundColorProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type RootStackParamList = {
  Home: any;
  Location: any;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export interface LocationProps {
  route: any;
}
