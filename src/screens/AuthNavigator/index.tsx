import {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Login';
import SignUpScreen from './SignUp'


export type StackParamList = {
  Login: undefined;
  SignUp:undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AuthStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
