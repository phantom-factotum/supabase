import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput'
import { isValidEmail } from '../../helpers/string';
import { supabase } from '../../initSupabase';
import { StackParamList } from './index';

type Props = NativeStackScreenProps<StackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('kestofespe@gufum.com');
  const [password, setPassword] = useState('MtKAUQn7LsQcSPf');
  const onSubmit = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error ? 'Failed to sign in' : 'success');
  };

  const canSubmit = isValidEmail(email) && password.length > 5;
  return (
    <View style={styles.container}>
      <TextInput
        label={'Email address'}
        defaultValue={email}
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
        keyboardType={'email-address'}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <Button title="Submit" onPress={onSubmit} disabled={!canSubmit} />
      <Text style={styles.text}>
        Dont have an account?
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up{' '}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  textInput: {
    color: 'black',
    padding: 0,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
  },
  textButton: {
    textDecorationLine: 'underline',
  },
});
