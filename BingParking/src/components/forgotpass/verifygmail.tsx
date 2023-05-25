import React, { useState, useRef, useEffect } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
import { cognitoClient } from "../../utils/aws"
import Icon from "react-native-vector-icons/Fontisto"
import Ion from 'react-native-vector-icons/Ionicons'
import { client_id } from '../../../env';

const Verifygmail = ({ navigation }: any) => {
    const [tap, setTap] = useState<any>(0);
    const [mail , setMail] = useState<string>('');
    const [pwd , setPwd] = useState<string>('');
    const [ch, setCh] = useState<boolean>(false);
    const [chk , setChk] = useState<boolean>(false); 
    const [code , setCode] = useState<string>('');

    const isValidEmail = (email: string) => { return /\S+@\S+\.\S+/.test(email) };

    const handleForgot = async() => {
         try {
            if(mail != '') {
                await cognitoClient.forgotPassword({Username: mail, ClientId: client_id}).then((res) => {
                    if(res) {
                      setChk(true); 
                      return Alert.alert(`Confirmation code has been sent to your ${mail}!`); 
                    }
                });
            }
            else {
               if(!isValidEmail(mail)) {
                  Alert.alert(`${mail} is invalid.`); 
               }
               Alert.alert(`Email must be provided!`);
            }
        } catch(e) {
            console.log(e);
            setChk(false); 
        };
    };

    const handleConfirm = async () => {
         try {
            return await cognitoClient.confirmForgotPassword({ClientId: client_id, Username: mail, Password: pwd, ConfirmationCode: code}).then((res) => {
                console.log(res);
                Alert.alert(`Successfully updated your password! , Have a nice day ^^`); 
                navigation.navigate('Login');
            });
         } catch(e) {
            console.log(e);
            setChk(false); 
         };
    };

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <Text style={t`my-7 text-[#212121] font-bold`}>Verification code will be sent to your email.</Text>
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
            <View style={t`${chk ? 'flex' : 'hidden'} flex-col w-full p-4`}>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <Icon name="locked" size={20} style={t`mr-4`} />
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} secureTextEntry={!ch} onChangeText={pass => setPwd(pass)} placeholder="New Password"/>
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} placeholder="Verification Code" onChangeText={code => setCode(code)}/>
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
            </View>
            <TouchableOpacity onPress={handleForgot} style={[t`${chk ? 'hidden' : 'flex'}`,{ paddingTop: 10 }]}>
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
            <TouchableOpacity onPress={handleConfirm} style={[t`${chk ? 'flex' : 'hidden'}`,{ paddingTop: 10 }]}>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={{
                        width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={t`text-white text-[16px] leading-[22.4px]`}>Confirm Password</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
export default Verifygmail