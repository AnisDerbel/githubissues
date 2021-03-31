import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { RootStackParamList, ROUTES } from '../routes';
import InputForm from '../components/InputForm';
import { StackNavigationProp } from '@react-navigation/stack';

type TWelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface IWelcomeScreenProps {
  navigation: TWelcomeScreenNavigationProp;
}
const WelcomeScreen = ({ navigation }: IWelcomeScreenProps) => {
  const theme = useTheme();

  const onSuccess = () => {
    navigation.navigate(ROUTES.GITHUB_ISSUES);
  };
  return (
    <View style={{ margin: theme.spacing.s }}>
      <Text style={[{ marginVertical: theme.spacing.m }, theme.variants.title]}>
        Welcome to GibHub issues
      </Text>
      <InputForm onSuccess={onSuccess} />
    </View>
  );
};
export default WelcomeScreen;
