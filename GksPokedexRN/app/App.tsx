import * as React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PokeListView } from "./views/PokeList.view";
import { ROUTES } from "./routes";
import { PokeSearchView } from "./views/PokeSearch.view";
import { TypeListView } from "./views/TypeList.view";
import { PokeListContainer } from "./components/PokeListContainer";
import { PokeDetailsView } from "./views/PokeDetails.view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TypeDetailView } from "./views/TypeDetail.view";
import { ActivityIndicator, Text, View } from "react-native";
import { colors, fontSizes, spacing, TypeColors } from "./appStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Spacer } from "./components/Spacer";

const AppNavigator = createStackNavigator();

const HeaderLeftBack: React.FC<{ textColor?: string }> = ({
  textColor = colors.black,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: spacing.base,
        backgroundColor: "transparent",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "center" }}
        hitSlop={{
          left: spacing.base,
          right: spacing.base,
          top: spacing.base,
          bottom: spacing.base,
        }}
      >
        <MaterialCommunityIcons
          name="backburger"
          size={1.2 * fontSizes.base}
          color={textColor}
        />
        <Spacer width={spacing.sm} />
        <Text
          style={{
            fontSize: fontSizes.base,
            color: textColor,
            fontWeight: "600",
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
            component={TabView}
            options={{ headerShown: false }}
          />
          <AppNavigator.Screen
            name={ROUTES.POKE_DETAILS}
            component={PokeDetailsView}
            options={{ headerLeft: () => <HeaderLeftBack /> }}
          />
          <AppNavigator.Screen
            name={ROUTES.TYPE_DETAIL}
            component={TypeDetailView}
            options={({ route }) => {
              const typeName = (route?.params as any)?.name;

              return {
                headerStyle: {
                  backgroundColor: TypeColors?.[typeName]?.bg || colors.white,
                },
                headerLeft: () => (
                  <HeaderLeftBack
                    textColor={TypeColors?.[typeName]?.font || colors.black}
                  />
                ),
              };
            }}
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
              [ROUTES.TYPE_LIST]: "diamond-stone",
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
