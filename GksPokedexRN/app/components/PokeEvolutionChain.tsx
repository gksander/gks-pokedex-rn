import * as React from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { EvChainSpecies, PokemonFromPokeList } from "../types";
import { Spacer } from "./Spacer";
import { spacing } from "../appStyles";
import { IMG_BASE_URL } from "../config";
import { Pokeball } from "./Pokeball";
import { useGetPokemonColor } from "../utils/useGetPokemonColor";
import FastImage from "react-native-fast-image";

const IMAGE_SIZE = 75;
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export const PokeEvolutionChain: React.FC<{ pokemon: PokemonFromPokeList }> = ({
  pokemon,
}) => {
  const buckets = React.useMemo(() => {
    const buckets: EvChainSpecies[][] = [],
      links = pokemon.species.evolution_chain.links;

    // Get first species
    const firstSpecies = links.find((link) => !link?.species?.evolves_from)
      ?.species;
    if (!firstSpecies) return [];
    buckets[0] = [firstSpecies];

    // Loop til we can't find anything more for a bucket
    let areDone = false;
    while (!areDone) {
      const lastBucket = buckets[buckets.length - 1],
        lastBucketIds = lastBucket.map((species) => species.pokemon.id);

      const newBucket = links
        .filter((link) =>
          lastBucketIds.includes(link?.species?.evolves_from?.id || ""),
        )
        .map((link) => link.species);

      if (!newBucket.length) {
        areDone = true;
      } else {
        buckets.push(newBucket);
      }
    }

    return buckets;
  }, [pokemon]);
  const color = useGetPokemonColor(pokemon);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {buckets.map((bucket, i) => (
        <React.Fragment key={i}>
          <View
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              flexShrink: 1,
              justifyContent: "center",
            }}
          >
            <ScrollView
              scrollEnabled={bucket.length > 1}
              contentContainerStyle={{ justifyContent: "center" }}
              snapToInterval={IMAGE_SIZE}
              showsVerticalScrollIndicator={false}
            >
              {bucket.map((species) => (
                <View
                  key={species.pokemon.name}
                  style={{ flex: 1, width: IMAGE_SIZE }}
                >
                  {pokemon.id === species.pokemon.id && (
                    <View style={[StyleSheet.absoluteFill]}>
                      <Pokeball fill={color} opacity={0.4} />
                    </View>
                  )}
                  <AnimatedFastImage
                    source={{
                      uri: `${IMG_BASE_URL}/${species.pokemon.id}.png`,
                    }}
                    style={{
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                    }}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          {i < buckets.length - 1 && (
            <React.Fragment>
              <Spacer width={spacing.sm} />
              <MaterialCommunityIcons name="chevron-right" size={24} />
              <Spacer width={spacing.sm} />
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};
