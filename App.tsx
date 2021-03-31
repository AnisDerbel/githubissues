import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import store from './src/redux/store';
import theme from './src/theme';
import CustomDropdownAlert from './src/components/CustomDropdownAlert';

const App = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Routes />
      </NavigationContainer>
      <CustomDropdownAlert />
    </PaperProvider>
  </Provider>
);

export default App;
