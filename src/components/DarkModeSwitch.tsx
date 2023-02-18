import {useContext} from 'react'
import LabeledSwitch from "./LabeledSwitch";
import {ThemeContext} from '../Context'
export default function DarkModeSwitch() {
  const { isDarkMode, dispatch: themeDispatch } =
    useContext(ThemeContext);
  return (
    <LabeledSwitch
      onValueChange={(val:boolean) =>
        themeDispatch({ type: "setIsDark", payload: val })
      }
      value={isDarkMode}
      label={"Color Mode"}
      currentValueMessage={
        "Using " + (isDarkMode ? "dark" : "light") + " mode"
      }
      style={{ padding: 5, marginBottom: 5 }}
    />
  );
}
