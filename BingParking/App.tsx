import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreen } from './src/navigations/stack/Stack';
import UserContextProv from './src/contexts/userCont';
import LocationContextProv from './src/contexts/locationCont';

export default function App() {
  return (
    <UserContextProv> 
    <LocationContextProv>
    <NavigationContainer>
       <StackScreen />
    </NavigationContainer>
    </LocationContextProv>
    </UserContextProv>
  );
};