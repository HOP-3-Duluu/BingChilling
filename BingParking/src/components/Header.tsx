import {
  Button,
  FlatList,
  Image,
  Text,
  Touchable,
  View,
} from 'react-native';
import {t} from '../utils/style';
import {useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Header = ({navigation , title}: any) => {
  return (
      <View style={[t`w-full h-[116px] bg-white flex flex-row`]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={[t`ml-[28.08px] mt-[68px]`]} name="arrow-back-outline" color={"black"} size={25}></Icon>
        </TouchableOpacity>
          <Text style={[t`ml-[16px] mt-[68px]`, {fontSize:24}]}>{title}</Text>
      </View>
  );
};

export default Header;
