import { List, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../hooks/UseTheme";

const SettingsScreen = () => {
  const { preferencesContext } = useTheme();

  return (
    <SafeAreaView>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => {
            return (
              <Switch
                value={preferencesContext.isThemeDark}
                onValueChange={() => {
                  preferencesContext.setPreferences({
                    ...preferencesContext,
                    isThemeDark: !preferencesContext.isThemeDark,
                  });
                }}
              />
            );
          }}
        ></List.Item>
      </List.Section>
    </SafeAreaView>
  );
};

export default SettingsScreen;
