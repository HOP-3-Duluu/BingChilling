import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../../screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export const TabScreen = () => {
    return (
        <Tab.Navigator initialRouteName='HomeTab'>
            <Tab.Screen name="HomeTab" component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({color}) => (<Icon name="home" color={color} size={25} ></Icon>),
                    headerShown: false
                }}/>
            <Tab.Screen options={{
                tabBarLabel: "Booking",
                tabBarActiveTintColor: '#4448AE',
                tabBarIcon: ({color}) => (<Icon name="book" color={color} size={25} ></Icon>),
                headerShown: false
                }} name="Booking" component={HomeScreen}/>
            <Tab.Screen options={{
                tabBarLabel: "Profile",
                tabBarActiveTintColor: '#4448AE',
                tabBarIcon: ({color}) => (<Icon name="person-outline" color={color} size={25} ></Icon>),
                headerShown: false
                }} name="Profile" component={HomeScreen}/>
        </Tab.Navigator>
    );
};