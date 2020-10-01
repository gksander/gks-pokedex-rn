import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PokeListView } from "./views/PokeList.view";
import { ROUTES } from "./routes";
import { PokeListContainer } from "./components/PokeListContainer";
import { PokeDetailsView } from "./views/PokeDetails.view";
import { HeaderLeftBack } from "./components/HeaderLeftBack";

const AppNavigator = createStackNavigator();

/**
 * Main App
 */
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <PokeListContainer>
        <AppNavigator.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: {
              borderBottomWidth: 0,
            },
            headerLeft: () => <HeaderLeftBack />,
            headerTitle: () => null,
          })}
        >
          <AppNavigator.Screen
            name={ROUTES.HOME}
            component={PokeListView}
            options={{ headerShown: false }}
          />
          <AppNavigator.Screen
            name={ROUTES.POKE_DETAILS}
            component={PokeDetailsView}
            options={{ headerLeft: () => <HeaderLeftBack /> }}
          />
        </AppNavigator.Navigator>
      </PokeListContainer>
    </NavigationContainer>
  );
};

export default App;
