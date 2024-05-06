import { Image, View, Text } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { LocationProps, NavigationProp } from "../interfaces/interface";
import { BackgroundColor } from "../components/backgroundcolor/backgroundcolor";
import { Viewport } from "../styles/style";
import { Button } from "../components/buttons/button";
import { useNavigation } from "@react-navigation/native";
import MapView, { UrlTile, Callout, Marker } from "react-native-maps";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

export const Location: React.FC<LocationProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();
  const [numberOfPerson, setNumberOfPerson] = useState<number | string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

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

  useEffect(() => {
    const dataRef = ref(database, "LATITUDE/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data: ", data);
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
    const dataRef = ref(database, "LONGITUDE/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data: ", data);
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
          <Text>Jeep 1</Text>
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
        initialRegion={{
          latitude: 8.486851,
          longitude: 124.65519,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        loadingBackgroundColor="Blue"
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
