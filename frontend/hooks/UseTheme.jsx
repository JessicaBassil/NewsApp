import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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

  const [theme, setTheme] = useState(CombinedDefaultTheme);

  useEffect(() => {
    setTheme(
      preferences.isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme
    );
  }, [preferences]);

  const preferencesContext = useContext(PreferencesContext);

  return { preferences, setPreferences, theme, preferencesContext };
};

export default useTheme;
