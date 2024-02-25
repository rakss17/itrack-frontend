import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Viewport, FontSizes } from "../styles/style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Home from "./home";

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#616161",
        tabBarStyle: {
          height: Viewport.height * 0.08,
          borderTopWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.small,
          fontWeight: "bold",
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginBottom: -10,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Home}
        options={{
          tabBarLabel: "Location",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faLocationDot} color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
