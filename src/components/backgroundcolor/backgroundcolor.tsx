import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundColorProps } from "../../interfaces/interface";

export const BackgroundColor: React.FC<BackgroundColorProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={["#03779C", "#4CAEBC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
