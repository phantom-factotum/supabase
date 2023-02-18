import { ComponentProps, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import TextInput, { Props as TextInputProps } from "./TextInput";
type TextProps = ComponentProps<typeof Text>;
type Props = {
  initialIsEditable: boolean;
  initialText: string;
  inputStyle: ViewStyle;
  textStyle: TextProps["style"];
  containerStyle: ViewStyle;
} & TextInputProps;

export default function EditableText({
  initialIsEditable,
  textStyle,
  ...props
}: Props) {
  const [isEditable, setIsEditable] = useState(
    initialIsEditable && Boolean(props.value)
  );
  const toggle = useCallback(() => setIsEditable((prev) => !prev), []);

  return isEditable ? (
    <TextInput
      {...props}
      onBlur={(e) => {
        props.onBlur?.(e);
        toggle();
      }}
      // onPressOut={() => {
      //   props.onPressOut?.();
      //   toggle();
      // }}
      onSubmitEditing={(e) => {
        props.onSubmitEditing?.(e);
        toggle();
      }}
      style={[styles.inputStyle, props.style]}
      dense
    />
  ) : (
    <TouchableOpacity
      style={[styles.pressableContainer, props.style]}
      onPress={toggle}
    >
      <Text style={[styles.text, textStyle]}>
        {props.value?.toString() || ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  pressableContainer: {
    borderBottomWidth: 1,
    margin: 5,
    padding: 5,
  },
  inputStyle: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    // width: "auto",
    // height: "auto",
  },
  text: {
    fontSize: 16,
  },
});
