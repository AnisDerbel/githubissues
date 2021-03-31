import React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { WrappedFieldProps } from 'redux-form';

interface InputProps {
  label: string;
  errorColor: string;
  maxLength: number;
}
const Input = ({
  meta: { touched, error },
  label,
  errorColor,
  maxLength,
  input: { onChange },
}: WrappedFieldProps & InputProps) => {
  const isError = touched && error;

  return (
    <>
      <TextInput
        autoCapitalize="none"
        error={isError}
        onChangeText={onChange}
        maxLength={maxLength}
        placeholder={label}
      />
      {touched && error && <Text style={{ color: errorColor }}>{error}</Text>}
    </>
  );
};

export default Input;
