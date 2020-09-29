import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PokeListView } from "./views/PokeList.view";
import { ROUTES } from "./routes";
import { PokeSearchView } from "./views/PokeSearch.view";
import { TypeListView } from "./views/TypeList.view";
import { PokeListContainer } from "./components/PokeListContainer";
import { PokeDetailsView } from "./views/PokeDetails.view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TypeDetailView } from "./views/TypeDetail.view";

const AppNavigator = createStackNavigator();

/**
 * Main App
 */
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <PokeListContainer>
        <StatusBar style="auto" />
        <AppNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AppNavigator.Screen name={ROUTES.HOME} component={TabView} />
          <AppNavigator.Screen
            name={ROUTES.POKE_DETAILS}
            component={PokeDetailsView}
          />
          <AppNavigator.Screen
            name={ROUTES.TYPE_DETAIL}
            component={TypeDetailView}
          />
        </AppNavigator.Navigator>
      </PokeListContainer>
    </NavigationContainer>
  );
};

/**
 * Tabs
 */
const TabNavigator = createBottomTabNavigator();
const TabView: React.FC = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            {
              [ROUTES.POKE_LIST]: "pokeball",
              [ROUTES.TYPE_LIST]: "account-badge-alert",
              [ROUTES.POKE_SEARCH]: "cloud-search",
            }[route.name] || "pokeball";
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <TabNavigator.Screen name={ROUTES.HOME} component={PokeListView} />
      <TabNavigator.Screen name={ROUTES.TYPE_LIST} component={TypeListView} />
      <TabNavigator.Screen
        name={ROUTES.POKE_SEARCH}
        component={PokeSearchView}
      />
    </TabNavigator.Navigator>
  );
};

export default App;
