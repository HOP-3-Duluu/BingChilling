import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from '../../utils/style';
import {useState} from 'react';

export const Starter = ({navigation}: any) => {
  return (
    <View style={[t`w-full h-full flex bg-white items-center`]}>
      <Text style={[t`text-[48px] font-bold mt-[98px]`]}>Lets you in</Text>
      <View style={[t`mt-[78px]`]}>
        <TouchableOpacity>
          <Text
            style={[
              {lineHeight: 60},
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] text-center`,
            ]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              {lineHeight: 60},
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] text-center mt-[16px]`,
            ]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              {lineHeight: 60},
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] text-center mt-[16px]`,
            ]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          t`mt-[30px] w-[360px] h-[45px] flex flex-row justify-between items-center`,
        ]}>
        <View style={[t`border-[1px] h-[0px] w-[165px] border-[#EEEEEE]`]} />
        <Text>or</Text>
        <View style={[t`border-[1px] h-[0px] w-[165px] border-[#EEEEEE]`]} />
      </View>
      <TouchableOpacity
        style={[
          t`bg-[#9C9FF0] mt-[20px] w-[360px] h-[58px] rounded-[10px] flex items-center justify-center`,
        ]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[t`text-white`]}>Sign in with password</Text>
      </TouchableOpacity>
      <View style={[t`flex flex-row mt-[70px]`]}>
        <Text style={[t`mr-[8px]`]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[t`text-[#4448AE] font-semibold`]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Starter;
