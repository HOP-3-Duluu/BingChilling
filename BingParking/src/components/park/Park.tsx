import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { t } from "../../utils/style";
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useLocationCont } from "../../contexts/locationCont";


export const Park = ({navigation , route} : any) => {

    const { name , address , cost , phone , photos , time , lat , lon } = route?.params;
    const location = useLocationCont();

    return(
            <View style={[t`w-full h-full bg-white rounded-[30px] flex items-center`]}>
            <Image source={{uri: photos}} style={[t`h-[200px] w-full mt-[100px] flex items-center`]}/>
        <View style={t`w-[320px] mt-[50px] flex flex-col h-[260px] justify-between items-start text-center`}>
            <View style={t`flex flex-row items-center`}><Icon name="car" size={35} color='#4448AE'/><Text style={[t`font-medium text-[25px]`]}>{name}</Text></View>
            <View style={t`flex flex-row items-center`}><AntIcon name="book" size={35} color='#4448AE'/><Text style={t`text-[25px] font-medium`}>Address: {address}</Text></View>
            <View style={t`flex flex-row items-center`}><Icon name="wallet-outline" size={35} color='#4448AE'/><Text style={t`text-[25px] font-medium`}>Cost per hour: {cost}₮</Text></View>
            <View style={t`flex flex-row items-center`}><Icon name="phone-portrait-outline" size={35} color='#4448AE'/><Text style={t`text-[25px] font-medium`}>Phone: {phone}</Text></View>
            <View style={t`flex flex-row items-center`}><AntIcon name="clockcircleo" size={35} color='#4448AE'/><Text style={t`text-[25px] font-medium`}> {time?.open?.S} - {time?.closed?.S}</Text></View>
          </View>
          <View style={[t`w-full h-full z-1 flex items-center justify-end absolute`]}>
            <TouchableOpacity
              style={[
                t`bg-[#9C9FF0] w-[320px] h-[58px] rounded-[10px] flex items-center mb-[20px] justify-center`,
              ]}
              onPress={() => {
                if(location?.err == false) {
                  location?.setDes({latitude: Number(lat) , longitude: Number(lon)});
                  location?.setFs(true);
                  location?.setName(name);
                  return navigation.navigate('Home');
                }
                else {
                   if(location?.err == true) {
                      location?.setFs(false); 
                      Alert.alert(`${name} is too far away`); 
                      return navigation.navigate('Home');
                   }
                }
              }}>
              <Text style={[t`text-white`]}>Reserve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                t`bg-[#EDEFFF] w-[320px] h-[58px] rounded-[10px] flex items-center mb-[30px] justify-center`,
              ]}
              onPress={() => {
                navigation.navigate('Home')
                location?.setFs(false);
                location?.setHasErr(true); 
              }}>
              <Text style={[t`text-[#4448AE]`]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

export default Park;