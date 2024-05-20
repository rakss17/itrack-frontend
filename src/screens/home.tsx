import { useState, useEffect } from "react";
import { View, Image, Text, BackHandler, Alert } from "react-native";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../interfaces/interface";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import NetInfo from "@react-native-community/netinfo";

export default function Home() {
  const [jeepData, setJeepData] = useState([
    { id: 1, name: "Jeep 1", seats_capacity: "10/25", arrival_time: "15mins" },
  ]);
  const [internetStatus, setInternetStatus] = useState("Checking...");
  const [numberOfPerson, setNumberOfPerson] = useState<number | string>("");

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (internetStatus === "Offline") {
      Alert.alert(
        "No Internet Connection",
        "Please check your network and try again.",
        [{ text: "Close", onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
      );
    }
  }, [internetStatus === "Offline"]);

  useEffect(() => {
    const dataRef = ref(database, "person/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data: ", data);
      if (data) {
        const firstNumber = Object.values(data)[0];
        console.log("firstNumber", firstNumber);

        if (typeof firstNumber === "number") {
          if (firstNumber >= 25) {
            setNumberOfPerson(25);
          } else if (firstNumber < 25) {
            setNumberOfPerson(firstNumber);
          }
        } else {
          console.error("Unexpected data type:", firstNumber);
        }
      }
    });
  }, []);

  const onTrack = (numberOfPerson: any) => {
    navigation.navigate("Location", { numberOfPerson });
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
            display: "flex",
            justifyContent: "center",
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
                {numberOfPerson == 25 ? <>Full</> : <>{numberOfPerson}/25</>}
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
                onPress={() => onTrack(numberOfPerson)}
              />
            </View>
          ))}
        </View>
      </View>
    </BackgroundColor>
  );
}
