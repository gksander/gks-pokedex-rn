import * as React from "react";
import { Button, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../routes";

export const HomeView: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button
        title="Pokedex"
        onPress={() => navigation.navigate(ROUTES.POKE_LIST)}
      />
      <Button
        title="Poke Search"
        onPress={() => navigation.navigate(ROUTES.POKE_SEARCH)}
      />
      <Button
        title="Types"
        onPress={() => navigation.navigate(ROUTES.TYPE_LIST)}
      />
    </SafeAreaView>
  );
};
