import { Text, Touchable, View } from "react-native"; 
import { t } from "../../utils/style";
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLocationCont } from "../../contexts/locationCont";

export const Banner = ({name , dis , dur}: any) => { 
    const location = useLocationCont();
    //hm

    return (
        <Animated.View style={t`flex flex-row justify-start items-center w-80 h-16 bg-[#CEC9F2] rounded-lg`} entering={FadeInUp} exiting={FadeOutUp}>
            <View style={t`flex flex-col justify-center items-center w-12 h-12 rounded-full bg-white ml-2`}><Icon name="ios-compass" size={26} color={"#4448AE"}/></View>
            <View style={t`flex flex-col m-3`}>
            <View style={t`flex flex-row w-full items-center justify-start`}>
            <View style={t`flex flex-row w-4/5`}>
            <Text style={t`text-white font-bold`} numberOfLines={name?.length}>To {name}</Text>
            </View>
            <TouchableOpacity onPress={() => location?.setFs(false)} style={[t`flex` , {left: -15}]}>
                <Icon name="ios-close-circle" color={"red"} size={26} style={t`ml-4 mt--2`} />
            </TouchableOpacity>
            </View>
            <View style={t`flex flex-row pt-2 w-full`}>
               <Text style={t`text-white pr-5 font-bold`}>Distance: {dis} km</Text>
               <Text style={t`text-white pr-5 font-bold`}>Duration: {dur} m</Text>
            </View>
            </View>
        </Animated.View>
    );
};