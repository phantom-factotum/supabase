import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

export const CombinedDefaultTheme = merge(
  PaperDefaultTheme,
  NavigationDefaultTheme
);
export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

import { colorManipulators, colorSchemes } from "@phantom-factotum/colorutils";
const { alterHSVByRatio, lightenColor, darkenColor, setColorOpacity } =
  colorManipulators;

export const getTheme = (color: string, isDarkMode: boolean) => {
  const [primary, accent, ...otherColors]: string[] =
    colorSchemes.getNeutralScheme(color);
  const colorPresets = isDarkMode ? darkenColorPresets : lightenColorPresets;
  const primaryPresets = colorPresets(primary);
  const accentPresets = colorPresets(accent);
  const DefaultTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const background: string = isDarkMode
    ? colorManipulators.blend(primary, "#000", 0.8)
    : DefaultTheme.colors.background;
  const text: string = isDarkMode
    ? colorManipulators.blend(background, "#fff", 0.6)
    : DefaultTheme.colors.text;
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary,
      accent,
      primaryPresets,
      accentPresets,
      otherColors,
      background,
      text,
    },
  };

  return theme;
};

export const lightenColorPresets = (color: string) => {
  return [
    alterHSVByRatio(color, { h: -0.01, s: -0.04, v: -0.1 }),
    lightenColor(alterHSVByRatio(color, { h: -0.01, s: 0.6, v: 0.6 }), 0.15),
    lightenColor(color, 0.25),
    lightenColor(color, 0.5),
  ];
};
export const darkenColorPresets = (color: string) => {
  return [
    alterHSVByRatio(color, { h: -0.01, s: 0.4, v: -0.4 }),
    darkenColor(alterHSVByRatio(color, { h: -0.01, s: 0.6, v: 0.6 }), 0.15),
    darkenColor(color, 0.25),
    darkenColor(color, 0.5),
  ];
};
