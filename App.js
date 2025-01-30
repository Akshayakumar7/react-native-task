import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import DetailsScreen from "./src/screens/HistoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import CompletedTimerScreen from "./src/screens/CompletedTimerScreen";
import ThemeSelection from "./src/screens/ThemeSelectionScreen";
import ExportFile from "./src/screens/ExportFile";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Theme"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Theme" component={ThemeSelection} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Complete" component={CompletedTimerScreen} />
        <Stack.Screen name="ExportFile" component={ExportFile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
