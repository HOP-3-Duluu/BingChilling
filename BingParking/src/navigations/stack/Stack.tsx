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
import { useUserCont } from '../../contexts/userCont';
import { EditProfile, Help } from '../../components/prof';
import { ParkAdd } from '../../components/owner';
import { SearchMain } from '../../components/search';

export const StackScreen = () => {

  const Stack = createNativeStackNavigator();
  const user = useUserCont();

  if(user?.isLogged) {
     return (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={TabScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Notif' component={Notification} options={{header: (e: any) => <Header navigation={e.navigation} bg="#F8F7FD" title="Notification"/>}}/>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
          <Stack.Screen name="Help" component={Help} options={{header: (e:any ) => <Header bg="#000000" navigation={e.navigation} />}}/>
          <Stack.Screen name="ParkAdd" component={ParkAdd} options={{header: (e:any ) => <Header title="Add" navigation={e.navigation} />}}/>
          <Stack.Screen name='Search' component={SearchMain} options={{header: (e: any) => <Header navigation={e.navigation} bg="#F8F7FD" title="Search"/>}}/>

        </Stack.Navigator>
     );
  }
  else {
    return (
      <Stack.Navigator initialRouteName='TutorialOne'>
          <Stack.Screen name="TutorialOne" component={BaseOne} options={{ headerShown: false }}/>
          <Stack.Screen name="TutorialTwo" component={BaseTwo} options={{ headerShown: false }}/>
          <Stack.Screen name="TutorialThree" component={BaseThree} options={{ headerShown: false }}/>
          <Stack.Screen name="TutorialFour" component={BaseFour} options={{ headerShown: false }}/>
          <Stack.Screen name="Starter" component={Starter} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
          <Stack.Screen name="Signup" component={Signup} options={{header: (e:any ) => <Header navigation={e.navigation} />}}/>
          <Stack.Screen name="Forgot" component={Forgotpass} options={{header: (e:any ) => <Header title="Forgot Password" navigation={e.navigation} />}} />
          <Stack.Screen name="Verify" component={Verify} options={{header: (e:any ) => <Header title="Forgot Password" navigation={e.navigation} />}} />
          <Stack.Screen name="Create" component={Createnewpass} options={{header: (e:any ) => <Header title="Create new Password" navigation={e.navigation} />}} />
          <Stack.Screen name="ProfileSetUp" component={ProfSetUp} options={{header: (e:any ) => <Header title="Fill Your Profile" navigation={e.navigation} />}}/>
        </Stack.Navigator>
    );
  }
};