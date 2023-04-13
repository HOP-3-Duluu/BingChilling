import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import { useState } from "react";

export const Login = ({navigation}:any) => {
    return(
        <View style={[t`w-full h-full bg-white flex justify-center items-center`]}>
            <View style={[t`w-[360px] h-full`]}>
            <Text style={[t`text-[48px] font-bold mt-[68px]`]}>Login to your</Text>
            <Text style={[t`text-[48px] font-bold text-[#999CF0]`]}>Account</Text>
      <View style={[t`mt-[78px]`]}>
        <TextInput style={[t`w-[360px] h-[60px] bg-[#F8F7FD] border-[1px] border-[#EEEEEE] rounded-[10px]`]} placeholder="Email"/>
        <TextInput style={[t`w-[360px] h-[60px] bg-[#F8F7FD] border-[1px] border-[#EEEEEE] mt-[24px] rounded-[10px]`]}  placeholder="Password"/>
        <View style={[t`flex flex-row items-center mt-[26px] justify-center`]}><TouchableOpacity style={[t`h-[24px] w-[24px] border-[#4448AE] rounded-[4px] border-[1px] mr-[10px]`]}></TouchableOpacity><Text>Remember me</Text></View>
      </View>
      <View style={[t`flex justify-center w-full`]}>
      <TouchableOpacity><Text style={[t`text-[#4D5DFA]`]}>Forgot the password?</Text></TouchableOpacity></View>
      <TouchableOpacity
        style={[
          t`bg-[#9C9FF0] mt-[20px] w-[360px] h-[58px] rounded-[10px] flex items-center justify-center`,
        ]}
        onPress={() => ""}>
        <Text style={[t`text-white`]}>Sign in</Text>
      </TouchableOpacity>
      <View
        style={[
          t`mt-[30px] w-[360px] h-[45px] flex flex-row justify-between items-center`,
        ]}>
        <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
        <Text>or continue with</Text>
        <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
      </View>
      <View style={[t`flex flex-row mt-[70px] justify-center`]}>
        <Text style={[t`mr-[8px]`]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[t`text-[#4448AE] font-semibold`]}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
        </View>
    )
}


export default Login;