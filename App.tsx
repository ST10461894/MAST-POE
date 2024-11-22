
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';


import Welcome from './Welcomescreen'; // Adjusts path
import Coursemenu from './Coursemenu'; 
import Homescreen from './Homescreen';
import Filter from './Filter';

// this defines a type for the stack navigator
type RootStackParamList = {
  Welcome: undefined; // No parameters for Welcome
  Coursemenu: { menuItems: any[] }; 
  Homescreen: undefined; 
  Filter: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Coursemenu" component={Coursemenu} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
         <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
