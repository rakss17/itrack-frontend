import { useState } from "react";
import { View, Image, Text } from "react-native";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";

export default function Home() {
  const [jeepData, setJeepData] = useState([
    { id: 1, name: "Jeep 1", seats_capacity: "10/25" },
    { id: 2, name: "Jeep 2", seats_capacity: "15/25" },
  ]);
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
        style={{
          marginTop: Viewport.height * 0.05,
          width: Viewport.width * 0.5,
          height: Viewport.height * 0.3,
        }}
        source={require("../../assets/in-app-logo.png")}
        resizeMode="contain"
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          width: Viewport.width * 1,
          height: Viewport.height * 0.3,
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          NUMBER OF SEATS AVAILABLE
        </Text>
        <View
          style={{
            backgroundColor: "#D9D9D9",
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.15,
            borderRadius: 30,
          }}
        >
          {jeepData.map((jeep: any) => (
            <View
              key={jeep.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
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
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {jeep.name}
              </Text>
              <Image
                style={{
                  width: Viewport.width * 0.09,
                  height: Viewport.height * 0.07,
                }}
                source={require("../../assets/seat-icon.png")}
                resizeMode="contain"
              />
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {jeep.seats_capacity}
              </Text>
              <Button
                style={{
                  width: Viewport.width * 0.15,
                  height: Viewport.height * 0.05,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                text="Track"
              />
            </View>
          ))}
        </View>
      </View>
    </BackgroundColor>
  );
}
