import React from "react";
import { Button, ButtonProps,useTheme } from "react-native-paper";

type Props = ButtonProps &{
  color?:'string'
}

export default function Btn({ title, color, children, ...props }:Props) {
  const colors = useTheme().colors;
  return (
    <Button
      {...props}
      style={[{ marginVertical: 5 }, props.style]}
      buttonColor={color || props.buttonColor || colors.primary}
      mode={props.mode === undefined ? "contained" : props.mode}
    >
      {title}
    </Button>
  );
}
