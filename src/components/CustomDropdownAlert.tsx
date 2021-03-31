import React, { createRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { useTheme } from 'react-native-paper';

export const alertRef = createRef<DropdownAlert>();

const CustomDropdownAlert = () => {
  const theme = useTheme();
  return <DropdownAlert errorColor={theme.colors.error} ref={alertRef} />;
};

export default CustomDropdownAlert;
