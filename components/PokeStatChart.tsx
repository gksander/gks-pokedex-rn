import * as React from "react";
import { Text, View } from "react-native";
import { Circle, Line, Path, Svg, Text as SText, G } from "react-native-svg";
import { PokemonFromPokeList } from "../types";
import { colors, fontSizes } from "../appStyles";
import { useGetPokemonColor } from "../utils/useGetPokemonColor";
import { truncateStatName } from "../utils/truncateStatName";

type Point = [number, number];

const R = 50;
const PADDED_R = 1.02 * R;
const N = 6;
const PI = Math.PI;
const points: Point[] = Array.from({ length: N })
  .map((_, i) => i)
  .map((i) => [
    R * Math.cos((i / N) * 2 * PI),
    -R * Math.sin((i / N) * 2 * PI),
  ]);

const linePairs = [
  [points[0], points[3]],
  [points[1], points[4]],
  [points[2], points[5]],
];
const outerPath = [
  `M ${points[0][0]} ${points[0][1]}`,
  ...points.map((point) => `L ${point[0]} ${point[1]}`),
  `Z`,
].join(",");

export const PokeStatChart: React.FC<{ pokemon: PokemonFromPokeList }> = ({
  pokemon,
}) => {
  // Compute inner path
  const innerPath = React.useMemo(() => {
    const stats = pokemon.stats;
    const points = pokemon.stats.map((stat, i) => {
      // S TODO: Not sure what max is here. I assumed 255, but that's probably wrong.
      const r = R * Math.min(parseInt(stat.base, 10) / 255, 1);
      const x = r * Math.cos((i / N) * 2 * PI);
      const y = -r * Math.sin((i / N) * 2 * PI);
      return [x, y];
    });

    return [
      `M ${points[0][0]} ${points[0][1]}`,
      ...points.map(([x, y]) => `L ${x} ${y}`),
      "Z",
    ].join(",");
  }, [pokemon]);
  const color = useGetPokemonColor(pokemon);

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`-${PADDED_R} -${PADDED_R} ${2 * PADDED_R} ${2 * PADDED_R}`}
    >
      {/* Cross-lines */}
      {linePairs.map(([[x1, y1], [x2, y2]], i) => (
        <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.gray} key={i} />
      ))}
      {/* Outer path */}
      <Path d={outerPath} stroke={colors.gray} fill="transparent" />
      {/* Inner path */}
      <Path d={innerPath} fill={color} fillOpacity={0.7} />
      {/* Labels */}
      {pokemon.stats.map((stat, i) => {
        const x = R * Math.cos((i / N) * 2 * PI);
        const y = -R * Math.sin((i / N) * 2 * PI);

        return (
          <SText
            x={x}
            y={y}
            fontSize={8}
            fill={colors.black}
            textAnchor={i === 0 ? "end" : i === 3 ? "start" : "middle"}
          >
            {truncateStatName(stat.name)}
          </SText>
        );
      })}
    </Svg>
  );
};
