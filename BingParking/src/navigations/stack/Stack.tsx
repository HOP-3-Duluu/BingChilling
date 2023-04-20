import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../../components/Header';
import Login from '../../components/auth/login';
import { ProfSetUp, Signup, Starter } from '../../components/auth';
import { TabScreen } from '../tab/Tab';


export const StackScreen = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={TabScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
        <Stack.Screen name="Signup" component={Signup} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
        <Stack.Screen name="Starter" component={Starter} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
        <Stack.Screen name="ProfileSetUp" component={ProfSetUp} options={{header: (e:any ) => <Header title="Fill Your Profile" navigation={e.navigation} />}}/>
      </Stack.Navigator>
  )
}