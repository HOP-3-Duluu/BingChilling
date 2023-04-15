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

export const Header = ({navigation}: any) => {
  return (
      <View style={[t`w-full h-[116px] bg-white`]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={[t`ml-[28.08px] mt-[68px]`]} name="arrow-back-outline" color={"black"} size={25}></Icon>
        </TouchableOpacity>
      </View>
  );
};

export default Header;
