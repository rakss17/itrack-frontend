import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Home from "./src/screens/home";
import { LocationForBusOne } from "./src/screens/locationForBusOne";
import { LocationForBusTwo } from "./src/screens/locationForBusTwo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LocationForBusOne" component={LocationForBusOne} />
        <Stack.Screen name="LocationForBusTwo" component={LocationForBusTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
