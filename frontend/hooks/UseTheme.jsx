import { useContext, useEffect, useMemo, useState } from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { PreferencesContext } from "../context/PreferencesContext";
import * as SecureStore from "expo-secure-store";

//Save Preferences to Expo Storage
const savePreferences = async (preferences) => {
  try {
    await SecureStore.setItemAsync("preferences", JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
};

//Get Preferences from expo storage
const getPreferences = async () => {
  try {
    const preferences = await SecureStore.getItemAsync("preferences");
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error("Error getting theme preference:", error);
    return null;
  }
};

//Merging Paper themes with the navigation theme
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const useTheme = () => {
  const [preferences, setPreferences] = useState({
    isThemeDark: false,
  });

  const preferencesContext = useContext(PreferencesContext);

  const [theme, setTheme] = useState(CombinedDefaultTheme);

  useEffect(() => {
    // Load preferences from expo storage on mount
    getPreferences().then((preferences) => {
      if (preferences) {
        //preferences were saved to the storage
        if (preferencesContext.setPreferences) {
          preferencesContext.setPreferences(preferences);
        } else {
          setPreferences(preferences);
        }
      }
    });
  }, []);

  useEffect(() => {
    savePreferences(preferences);
    setTheme(
      preferences.isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme
    );
  }, [preferences]);

  return { preferences, setPreferences, theme, preferencesContext };
};

export default useTheme;
