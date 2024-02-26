import { Image, View, Text } from "react-native";
import React from "react";
import { LocationProps, NavigationProp } from "../interfaces/interface";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";
import { useNavigation } from "@react-navigation/native";

export const Location: React.FC<LocationProps> = ({ route }) => {
  const { jeep } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const onBack = () => {
    navigation.navigate("Home");
  };

  return (
    <BackgroundColor
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/itrack-logo.png")}
        resizeMode="contain"
        style={{ marginTop: Viewport.height * 0.08 }}
      />
      <View
        style={{
          backgroundColor: "#D9D9D9",
          width: Viewport.width * 0.9,
          height: Viewport.height * 0.13,
          borderRadius: 30,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: Viewport.width * 0.09,
              height: Viewport.height * 0.07,
            }}
            source={require("../../assets/bus-icon.png")}
            resizeMode="contain"
          />
          <Text>{jeep.name}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>ARRIVAL TIME</Text>
          <Text>{jeep.arrival_time}</Text>
        </View>
        <Image
          style={{
            width: Viewport.width * 0.09,
            height: Viewport.height * 0.07,
          }}
          source={require("../../assets/seat-icon.png")}
          resizeMode="contain"
        />
        <Text>{jeep.seats_capacity}</Text>
      </View>
      <Button
        text="Back"
        style={{
          marginTop: Viewport.height * 0.01,
          width: Viewport.width * 0.3,
          height: Viewport.height * 0.06,
          backgroundColor: "#D9D9D9",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
        onPress={onBack}
      />
    </BackgroundColor>
  );
};
