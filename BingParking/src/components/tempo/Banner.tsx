import { Text, View } from "react-native"; 
import { t } from "../../utils/style";
import Icon from 'react-native-vector-icons/Ionicons';

export const Banner = ({name , dis , dur}: any) => {
    return (
        <View style={t`flex flex-row justify-start items-center w-80 h-16 bg-[#CEC9F2] rounded-lg`}>
            <View style={t`flex flex-col justify-center items-center w-12 h-12 rounded-full bg-white ml-2`}><Icon name="ios-compass" size={26} color={"#4448AE"}/></View>
            <View style={t`flex flex-col m-3`}>
            <View style={t`flex flex-row items-center`}>
            <Text style={t`text-white font-bold`}>To {name}</Text>
            <Icon name="ios-close-circle" color={"red"} size={26} style={t`ml-4`}/>
            </View>
            <View style={t`flex flex-row pt-2 w-full`}>
               <Text style={t`text-white pr-5 font-bold`}>Distance: {dis} km</Text>
               <Text style={t`text-white pr-5 font-bold`}>Duration: {dur} m</Text>
            </View>
            </View>
        </View>
    );
};