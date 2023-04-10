import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { OurStack } from './src/navigations/stack/Stack';

export default function App() {
  
  return (
    <NavigationContainer>
       <OurStack />
    </NavigationContainer>
  );
};