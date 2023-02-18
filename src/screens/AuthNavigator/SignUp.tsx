import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import { isValidEmail } from "../../helpers/string";
import { supabase } from "../../initSupabase";
import { StackParamList } from "./index";

type Props = NativeStackScreenProps<StackParamList, "SignUp">;
export default function Login({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    const user = data?.user;
    if (user) {
      supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username: name,
        })
        .then(() => {
          console.log("updated user data");
        });
    }
  };
  const canSubmit =
    isValidEmail(email) && password.length > 5 && password == confirmPassword;
  return (
    <View style={styles.container}>
      <TextInput
        label={"Set your name"}
        defaultValue={name}
        onChangeText={setName}
        value={name}
        style={styles.textInput}
      />
      <TextInput
        label={"Email address"}
        defaultValue={email}
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
        keyboardType={"email-address"}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.textInput}
        secureTextEntry
      />
      <Button title="Submit" onPress={onSubmit} disabled={!canSubmit} />
      <Text style={styles.text}>
        Have an account?
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate("Login")}
        >
          Login{" "}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  textInput: {
    color: "black",
    padding: 0,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
  },
  textButton: {
    textDecorationLine: "underline",
  },
});
