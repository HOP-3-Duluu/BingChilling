import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../../components/Header';
import Login from '../../components/auth/login';
import { HomeScreen } from '../../screens/Home';
import { NavigationContainer } from '@react-navigation/native'
import { OurTab } from '../tab/Tab';
import { Signup, Starter } from '../../components/auth';


export const OurStack = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={OurTab} />
        <Stack.Screen name="Login" component={Login} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
        <Stack.Screen name="Signup" component={Signup} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
        <Stack.Screen name="Starter" component={Starter} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
      </Stack.Navigator>
  )
}