import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { HomeScreen, SearchScreen, SettingsScreen } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

//Add Screens here
const Screens = {
  Home: { title: "Home", icon: "home", component: HomeScreen },
  Search: { title: "Search", icon: "search", component: SearchScreen },
  Settings: { title: "Settings", icon: "settings", component: SettingsScreen },
};

const getIconName = (focused, ScreenKey) => {
  if (focused) {
    return Screens[ScreenKey].icon;
  }

  return Screens[ScreenKey].icon + "-outline";
};

const NavTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          return (
            <Ionicons
              name={getIconName(focused, route.name)}
              size={18}
              color={color}
            />
          );
        },
      })}
    >
      {Object.keys(Screens).map((key) => (
        <Tab.Screen
          key={key}
          name={Screens[key].title}
          component={Screens[key].component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default NavTabs;
