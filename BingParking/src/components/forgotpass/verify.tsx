import React, { useState, useRef, useEffect } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
import Ion from 'react-native-vector-icons/Ionicons'
import Icon from "react-native-vector-icons/Fontisto"
import { cognitoClient } from "../../utils/aws"
import { client_id } from "../../../env"; 
import Modal from "react-native-modal/dist/modal"

const Verify = ({ navigation , route }: any) => {

    const { phone } = route.params;
    const [ch , setCh] = useState<boolean>(false);
    const [code , setCode] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [res , setRes] = useState<boolean>(false); 
    const [chk , setChk] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [timerCount, setTimer] = useState<number>(30);

    const handleConfirm = async () => {
        try {
           return await cognitoClient.confirmForgotPassword({ClientId: client_id, Username: `+976${phone}`, Password: pwd, ConfirmationCode: code}).then((res) => {
               if(res) {
                setModalVisible(!isModalVisible);    
               }
               else {
                  Alert.alert(`Confirmation code might be wrong.`);
               }
           });
        } catch(e) {
           console.log(e);
           Alert.alert(`Confirmation code might be wrong.`);
        };
   };

   const handleReset = async () => {
       try {
        if(res) {
            await cognitoClient.forgotPassword({Username: `+976${phone}`, ClientId: client_id}).then((res) => {
                if(res) {
                  setChk(true);
                  Alert.alert(`Confirmation code has been sent to your phone-number: ${phone}!`); 
                }
                else {
                   Alert.alert(`Something went wrong.`);
                   setChk(false);
                }
            });
        }
       } catch(e) {
          console.log(e);
          setChk(false);
       }
   }

    useEffect(() => {
        let interval = setInterval(() => {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval);
                    return lastTimerCount - 1;
                })
            }, 1000);

        if(timerCount == 0) {
           setRes(true);  
           return clearInterval(interval);
        };

    }, [code , res]);

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
                <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')}/>
                <Text style={t`my-7 text-[#212121] font-bold`}> Code has been sent to +976 {phone}</Text>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} placeholder="Verification Code" onChangeText={code => setCode(code)}/>
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
                <View style={t`flex flex-row justify-center w-[360px] h-[60px] items-center bg-[#F8F7FD] rounded-lg mb-5`}>
                    <Icon name="locked" size={20} style={t`mr-4`} />
                    <TextInput style={[t`flex w-[240px] h-[20px] font-bold`, { fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '400', color: '#212121', }]} secureTextEntry={!ch} onChangeText={pass => setPwd(pass)} placeholder="New Password"/>
                    <Ion onPress={() => setCh(!ch)} name={`${ch ? 'eye' : 'eye-off'}`} size={20} style={t`ml-4`} />
                </View>
                <Text style={[t`${chk ? 'hidden' : 'flex'}`, {paddingTop:40}]} onPress={() => timerCount == 0 ? handleReset() : ''}>resend code {timerCount == 0 ? '' : `in ${timerCount}`}</Text>
            <TouchableOpacity onPress={handleConfirm} style={{ paddingTop: 50 }}>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={{
                        width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={t`text-white text-[16px] leading-[22.4px]`}>Reset Password</Text>
                </LinearGradient>
            </TouchableOpacity>
               <Modal isVisible={isModalVisible} animationIn={"fadeInUp"} animationOut={"fadeOut"}>
                    <View style={[t`bg-[#FFFFFF] flex justify-center items-center  rounded-[24px] h-[441px] w-[340px]`, { justifyContent:"space-around"}]}>
                        <View style={t`flex justify-center items-center`}>
                            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
                            <Text style={t`text-[#4448AE] text-[24px] leading-[22.4px] font-bold`}>Congratulations!</Text>
                        </View>
                        <Text style={t`text-[#212121] text-[16px]`}>Your account is ready to use</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={t`pb-[15px]`}>
                            <LinearGradient
                                colors={['#CEC9F2', '#9C9FF0']}
                                style={{
                                    width: 266, height: 58, borderRadius: 10, alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={t`text-white text-[16px] leading-[22.4px]`}>Go to Login Page</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>
                </Modal>
        </View>
    )
}
export default Verify