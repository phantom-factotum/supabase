import { useState, useCallback } from 'react';
import TextInput, { Props as TextInputProps } from './TextInput';

export default function PasswordInput(props: TextInputProps) {
  const [hidePassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <TextInput
      {...props}
      secureTextEntry={hidePassword}
      right={
        <TextInput.Icon
          icon={hidePassword ? 'eye-off' : 'eye'}
          onPress={togglePasswordVisibility}
        />
      }
    />
  );
}
