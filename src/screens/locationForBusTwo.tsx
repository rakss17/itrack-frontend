import { Image, View, Text, BackHandler, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { LocationProps, NavigationProp } from "../interfaces/interface";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import NetInfo from "@react-native-community/netinfo";

export const LocationForBusTwo: React.FC<LocationProps> = () => {
  const navigation = useNavigation<NavigationProp>();
  const [internetStatus, setInternetStatus] = useState("Checking...");
  const [numberOfPerson, setNumberOfPerson] = useState<number | string>("0");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

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
    const dataRef = ref(database, "bus2_count/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Count Bus Two: ", data);
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

  useEffect(() => {
    const dataRef = ref(database, "bus2_LATITUDE/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Latitude Bus Two: ", data);
      if (data) {
        const latitudeFromDb = Object.values(data)[0];
        console.log("latitude", latitudeFromDb);

        if (typeof latitudeFromDb === "string") {
          const parsedLatitude = parseFloat(latitudeFromDb);
          setLatitude(parsedLatitude);
        } else {
          console.error("Unexpected data type:", latitudeFromDb);
        }
      }
    });
  }, []);

  useEffect(() => {
    const dataRef = ref(database, "bus2_LONGITUDE/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Longitude Bus Two: ", data);
      if (data) {
        const longitudeFromDb = Object.values(data)[0];
        console.log("longitudeFromDb", longitudeFromDb);
        if (typeof longitudeFromDb === "string") {
          const parsedLongitude = parseFloat(longitudeFromDb);
          setLongitude(parsedLongitude);
        } else {
          console.error("Unexpected data type:", longitudeFromDb);
        }
      }
    });
  }, []);

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
          <Text>BUS 2</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
        <Image
          style={{
            width: Viewport.width * 0.09,
            height: Viewport.height * 0.07,
          }}
          source={require("../../assets/seat-icon.png")}
          resizeMode="contain"
        />
        <Text>
          {numberOfPerson == 25 ? <>Full</> : <>{numberOfPerson}/25</>}
        </Text>
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

      <MapView
        style={{
          height: Viewport.height * 0.5,
          width: Viewport.width * 0.8,

          alignSelf: "center",
        }}
        customMapStyle={[
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
        ]}
        mapType="none"
        scrollEnabled={true}
        zoomEnabled={true}
        toolbarEnabled={false}
        rotateEnabled={false}
        minZoomLevel={15}
        region={{
          latitude: latitude === 0 || latitude === null ? 8.486851 : latitude,
          longitude:
            longitude === 0 || longitude === null ? 124.65519 : longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="https://openstreetmap.keannu1.duckdns.org/tile/{z}/{x}/{y}.png?"
          shouldReplaceMapContent={true}
          maximumZ={19}
          flipY={false}
          zIndex={1}
        />
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          pinColor="red"
        ></Marker>
      </MapView>
    </BackgroundColor>
  );
};
