import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../../components/Header';
import Login from '../../components/auth/login';
import { ProfSetUp, Signup, Starter } from '../../components/auth';
import { TabScreen } from '../tab/Tab';
import { BaseOne, BaseTwo, BaseThree, BaseFour } from '../../components/baseScreen';
import { Notification } from '../../components/notif/Notif';
import { Forgotpass } from '../../components/forgotpass';
import Verify from '../../components/forgotpass/verify';
import Createnewpass from '../../components/forgotpass/cnp';



export const StackScreen = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
      <Stack.Screen name="Signup" component={Signup} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
      <Stack.Screen name="Starter" component={Starter} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
      <Stack.Screen name="ProfileSetUp" component={ProfSetUp} options={{header: (e:any ) => <Header title="Fill Your Profile" navigation={e.navigation} />}}/>
      <Stack.Screen name="Forgot" component={Forgotpass} options={{header: (e:any ) => <Header title="Forgot Password" navigation={e.navigation} />}} />
      <Stack.Screen name="Verify" component={Verify} options={{header: (e:any ) => <Header title="Forgot Password" navigation={e.navigation} />}} />
      <Stack.Screen name="Create" component={Createnewpass} options={{header: (e:any ) => <Header title="Create new Password" navigation={e.navigation} />}} />
      <Stack.Screen name='Notif' component={Notification} options={{header: (e: any) => <Header navigation={e.navigation} bg="#F8F7FD" title="Notification"/>}}/>
      <Stack.Screen name="TutorialOne" component={BaseOne} options={{ headerShown: false }}/>
      <Stack.Screen name="TutorialTwo" component={BaseTwo} options={{ headerShown: false }}/>
      <Stack.Screen name="TutorialThree" component={BaseThree} options={{ headerShown: false }}/>
      <Stack.Screen name="TutorialFour" component={BaseFour} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};