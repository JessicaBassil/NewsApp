import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PreferencesContext } from "./context/PreferencesContext";
import NavTabs from "./nav/NavTabs";
import useTheme from "./hooks/UseTheme";

const Stack = createStackNavigator();

export default function App() {
  const { preferences, setPreferences, theme } = useTheme();

  return (
    <PreferencesContext.Provider value={{ ...preferences, setPreferences }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="News" options={{ headerShown: true }}>
              {(props) => <NavTabs {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
