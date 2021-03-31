import React from 'react';
import GithubIssuesScreen from '../screens/GithubIssuesScreen';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { ROUTES } from '.';

const RootStack = createStackNavigator();

const Routes = () => (
  <>
    <RootStack.Navigator initialRouteName={ROUTES.WELCOME}>
      <RootStack.Screen name={ROUTES.WELCOME} component={WelcomeScreen} />
      <RootStack.Screen name={ROUTES.GITHUB_ISSUES} component={GithubIssuesScreen} />
    </RootStack.Navigator>
  </>
);

export default Routes;
