import React, { useState, useRef, useEffect } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
import { cognitoClient } from "../../utils/aws"
import Icon from "react-native-vector-icons/Fontisto"
import Ion from 'react-native-vector-icons/Ionicons'
const Verifygmail = ({ navigation }: any) => {
    const [tap, setTap] = useState<any>(0);
    const [mail , setMail] = useState<string>('');
    const [pwd , setPwd] = useState<string>('');
    const [ch, setCh] = useState<boolean>(false);
    const handleForgot = async() => {
         try {
            if(mail != '') {
                await cognitoClient.forgotPassword({Username: mail, ClientId: '4sbfr8h2ifhneb0lsj9kh6pee8'}).then((res) => {
                    console.log(res);
                       if(res) {
                         cognitoClient.confirmForgotPassword({ClientId: '' , Username: mail, Password: pwd, ConfirmationCode: ''}).then((res) => {
                         })
                       }
                })
            }
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <Text style={t`my-7 text-[#212121] font-bold`}>Verification code will be sent to your email. </Text>
            <View style={[
                t`${tap == 0
                    ? 'border-[#EEEEEE]'
                    : `${tap == 1 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
                    } w-[360px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
            ]}>
                <Image style={[t`h-[20px] w-[20px] ml-[20px]`]} resizeMode="contain" source={{ uri: "https://i.ibb.co/2Zy3MGd/Screen-Shot-2023-04-15-at-13-22-37.png" }} />
                <TextInput
                    style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
                    onFocus={() => {
                        setTap(1);
                    }}
                    onBlur={() => {
                        setTap(0);
                    }}
                    onChangeText={(text) => setMail(text)}
                    autoCapitalize='none'
                    placeholder="Email"
                />
            </View>
            <View style={t`flex flex-col w-full p-4`}>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <Icon name="locked" size={20} style={t`mr-4`} />
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} secureTextEntry={!ch} />
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <Icon name="locked" size={20} style={t`mr-4`} />
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} secureTextEntry={!ch} />
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
            </View>
            <TouchableOpacity onPress={handleForgot} style={{ paddingTop: 10 }}>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={{
                        width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={t`text-white text-[16px] leading-[22.4px]`}>Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
export default Verifygmail