import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

export type Props = React.ComponentProps<typeof TextInput>;

 function Input({ style, ...props }: Props) {
  const theme = useTheme();
  const {
    primary: color,
    primaryPresets: [lightColor, lightColor2, lightColor3, lightestColor],
  } = theme.colors;

  if (props.mode == 'outlined' || props.mode == undefined)
    return (
      <TextInput
        {...props}
        style={[styles.textInput, style]}
        outlineColor={lightColor3}
        activeOutline={color}
        mode={'outlined'}
        dense={props.dense === undefined ? false : props.dense}
      />
    );
  return (
    <TextInput
      {...props}
      style={[styles.textInput, style, { backgroundColor: lightestColor }]}
      underlineColor={lightColor3}
      activeUnderline={color}
      mode={'flat'}
      dense={props.dense === undefined ? true : props.dense}
    />
  );
}
Input.Icon = TextInput.Icon
export default Input
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginVertical: 5,
  },
});
