import React, { useState, useEffect } from "react";
import { View, Image, Text, BackHandler, Alert } from "react-native";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NavigationProp } from "../interfaces/interface";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import NetInfo from "@react-native-community/netinfo";

export default function Home() {
  const [internetStatus, setInternetStatus] = useState("Checking...");
  const [numberOfPersonForBusOne, setNumberOfPersonForBusOne] = useState<
    number | string
  >("0");

  // -------------------------------- BUS 2 removed for the mean time ------------------------------------
  // const [numberOfPersonForBusTwo, setNumberOfPersonForBusTwo] = useState<
  //   number | string
  // >("0");

  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      const checkInternetConnection = async () => {
        try {
          const state = await NetInfo.fetch();
          setInternetStatus(state.isInternetReachable ? "Online" : "Offline");
        } catch (error) {
          console.error(error);
          setInternetStatus("Error checking internet connection");
        }
      };

      checkInternetConnection();
      const unsubscribe = NetInfo.addEventListener((state) => {
        setInternetStatus(state.isInternetReachable ? "Online" : "Offline");
      });

      return () => unsubscribe();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (internetStatus === "Offline") {
        Alert.alert(
          "No Internet Connection",
          "Please check your network and try again.",
          [{ text: "Close", onPress: () => BackHandler.exitApp() }],
          { cancelable: false }
        );
      }
    }, [internetStatus === "Offline"])
  );

  useEffect(() => {
    // --------------------------- CHANGED PATH FROM 1 TO 2 FOR THE MEAN TIME ----------------------------------- >
    const dataRef = ref(database, "bus2_count/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Count Bus One: ", data);
      if (data) {
        const firstNumber = Object.values(data)[0];

        if (typeof firstNumber === "number") {
          if (firstNumber >= 25) {
            setNumberOfPersonForBusOne(25);
          } else if (firstNumber < 25) {
            setNumberOfPersonForBusOne(firstNumber);
          }
        } else {
          console.error("Unexpected data type:", firstNumber);
        }
      }
    });
  }, []);

  // -------------------------------- BUS 2 removed for the mean time ------------------------------------
  // useEffect(() => {
  //   const dataRef = ref(database, "bus2_count/");
  //   onValue(dataRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("Count Bus Two: ", data);
  //     if (data) {
  //       const firstNumber = Object.values(data)[0];

  //       if (typeof firstNumber === "number") {
  //         if (firstNumber >= 25) {
  //           setNumberOfPersonForBusTwo(25);
  //         } else if (firstNumber < 25) {
  //           setNumberOfPersonForBusTwo(firstNumber);
  //         }
  //       } else {
  //         console.error("Unexpected data type:", firstNumber);
  //       }
  //     }
  //   });
  // }, []);

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
          NUMBER OF PASSENGERS
        </Text>
        <View
          style={{
            backgroundColor: "#D9D9D9",
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.15,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <View
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
            <Text style={{ color: "black", fontWeight: "bold" }}>BUS</Text>
            <Image
              style={{
                width: Viewport.width * 0.09,
                height: Viewport.height * 0.07,
              }}
              source={require("../../assets/seat-icon.png")}
              resizeMode="contain"
            />
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {numberOfPersonForBusOne == 25 ? (
                <>Full</>
              ) : (
                <>{numberOfPersonForBusOne}/25</>
              )}
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
              onPress={() => navigation.navigate("LocationForBusOne")}
            />
          </View>
        </View>

        {/* -------------------------------- BUS 2 removed for the mean time ------------------------------------ */}
        {/* <View
          style={{
            backgroundColor: "#D9D9D9",
            width: Viewport.width * 0.9,
            height: Viewport.height * 0.15,
            borderRadius: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <View
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
            <Text style={{ color: "black", fontWeight: "bold" }}>BUS 2</Text>
            <Image
              style={{
                width: Viewport.width * 0.09,
                height: Viewport.height * 0.07,
              }}
              source={require("../../assets/seat-icon.png")}
              resizeMode="contain"
            />
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {numberOfPersonForBusTwo == 25 ? (
                <>Full</>
              ) : (
                <>{numberOfPersonForBusTwo}/25</>
              )}
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
              onPress={() => navigation.navigate("LocationForBusTwo")}
            />
          </View>
        </View> */}
      </View>
    </BackgroundColor>
  );
}
