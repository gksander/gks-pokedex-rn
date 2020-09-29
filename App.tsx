import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PokeListView } from "./views/PokeList.view";
import { ROUTES } from "./routes";
import { PokeSearchView } from "./views/PokeSearch.view";
import { TypeListView } from "./views/TypeList.view";
import { HomeView } from "./views/Home.view";
import { PokeListContainer } from "./components/PokeListContainer";
import { PokeDetailsView } from "./views/PokeDetails.view";

const AppStack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <PokeListContainer>
        <StatusBar style="auto" />
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name={ROUTES.HOME} component={HomeView} />
          <AppStack.Screen name={ROUTES.POKE_LIST} component={PokeListView} />
          <AppStack.Screen
            name={ROUTES.POKE_SEARCH}
            component={PokeSearchView}
          />
          <AppStack.Screen
            name={ROUTES.POKE_DETAILS}
            component={PokeDetailsView}
          />
          <AppStack.Screen name={ROUTES.TYPE_LIST} component={TypeListView} />
        </AppStack.Navigator>
      </PokeListContainer>
    </NavigationContainer>
  );
};

export default App;
