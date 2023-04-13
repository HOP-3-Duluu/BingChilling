import {
  Button,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from '../utils/style';
import {useState} from 'react';

export const Header = ({navigation}: any) => {
  return (
      <View style={[t`w-full h-[48px] mt-[68px]`]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[t`ml-[28.08px]`,{fontSize: 30}]}>{'<'}</Text>
        </TouchableOpacity>
      </View>
  );
};

export default Header;
