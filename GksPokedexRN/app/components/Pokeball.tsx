import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

/**
 * Colored pokeball for a spritz of design
 */
export const Pokeball: React.FC<{ fill?: string; opacity?: number }> = ({
  fill = "#F3F3F3",
  opacity = 0.5,
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 326 327" fill="none">
      <Path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M223.569 178H325.732C318.393 261.507 248.278 327 162.866 327C77.4536 327 7.33826 261.507 0 178H101.163C107.892 205.552 132.741 226 162.366 226C191.991 226 216.84 205.552 223.569 178ZM223.569 148H325.641C317.833 64.9712 247.937 0 162.866 0C77.7949 0 7.89874 64.9712 0.0909576 148H101.163C107.892 120.448 132.741 100 162.366 100C191.991 100 216.84 120.448 223.569 148Z"
        fill={fill}
        opacity={opacity}
      />
      <Circle cx="162.366" cy="163" r="38" fill={fill} opacity={opacity} />
    </Svg>
  );
};
