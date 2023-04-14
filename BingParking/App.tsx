import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreen } from './src/navigations/stack/Stack';
import UserContextProv from './src/contexts/userCont';

export default function App() {
  return (
    <UserContextProv> 
    <NavigationContainer>
       <StackScreen />
    </NavigationContainer>
    </UserContextProv>
  );
};