import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../../screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export const OurTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({color}) => (<Icon name="home" color={color} size={25} ></Icon>)
                }}
            />
        </Tab.Navigator>
    )
}