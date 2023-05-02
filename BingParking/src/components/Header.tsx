import {Text, View} from 'react-native';
import {t} from '../utils/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Header = ({navigation , bg ,title}: any) => {
  return (
      <View style={[t`w-full h-[116px] ${bg == null ? 'bg-white' : `bg-[${bg}]`} flex items-center`]}>
        <View style={[t`w-[340px] mt-[30px] h-[86px] flex flex-row justify-between items-center`]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={[t``]} name="arrow-back-outline" color={"black"} size={25}></Icon>
        </TouchableOpacity>
        <View style={[t`w-[300px]`]}>
          <Text style={[t`font-bold`, {fontSize:24}]}>{title}</Text></View>
          </View>
      </View>
  );
};

export default Header;
