import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/Home';
import { NavigationContainer } from '@react-navigation/native'
import { OurTab } from '../tab/Tab';


export const OurStack = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabHome"
        component={OurTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}