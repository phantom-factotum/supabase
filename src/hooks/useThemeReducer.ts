import React, { useReducer } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme } from '../helpers/colors';

export type Theme = ReturnType<typeof getTheme>;
type Actions =
  | {
      type: 'setMainColor';
      payload: string;
    }
  | {
      type: 'overrideTheme';
      payload: Theme;
    }
  | {
      type: 'setIsDark';
      payload: boolean;
    };
const mainColor = '#0D3FF8';
const isDarkMode = false;

const initialState = {
  mainColor,
  isDarkMode,
  theme: getTheme(mainColor, isDarkMode),
};

const reducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case 'setMainColor': {
      let newColor = action.payload;
      return {
        ...state,
        mainColor: newColor,
        theme: getTheme(newColor, state.isDarkMode),
      };
    }
    case 'overrideTheme': {
      let newTheme = action.payload;
      return { ...state, theme: { ...state.theme, ...newTheme } };
    }
    case 'setIsDark': {
      const newDark = action.payload;
      return {
        ...state,
        isDarkMode: newDark,
        theme: getTheme(state.mainColor, newDark),
      };
    }
  }
};

export default function ThemeReducer(stateOverride = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isDarkMode: useColorScheme() == 'dark',
    ...stateOverride,
  });
  return { ...state, dispatch };
}
