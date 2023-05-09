import React, { useState, useRef, useEffect } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
const Verify = ({ navigation }: any) => {
    const firstInput = useRef<any>();
    const second = useRef<any>();
    const third = useRef<any>();
    const fourth = useRef<any>();
    const [otp, setOtp] = useState<any>({1: '', 2: '', 3: '', 4: '' });

    const [timerCount, setTimer] = useState<number>(3);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            })
        }, 1000);
    }, [otp]);

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
                <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')}/>
                <Text style={t`my-7 text-[#212121] font-bold`}> Code has been sent to +976 88778929 </Text>
                <View style={t`flex flex-row w-full w-[360px] justify-between font-bold`}>
                    <TextInput keyboardType="number-pad" maxLength={1} onChangeText={(text) => { setOtp({ ...otp, 1: text }), text && second.current.focus() }} ref={firstInput} style={t`rounded-[10px] w-[78px] h-[61px] text-center bg-[#F8F7FD] font-bold`} />
                    <TextInput keyboardType="number-pad" maxLength={1} onChangeText={(text) => { setOtp({ ...otp, 2: text }), text ? third.current.focus() : firstInput.current.focus() }} ref={second} returnKeyType="done" style={t`rounded-[10px] w-[78px] h-[61px] text-center bg-[#F8F7FD] font-bold`} />
                    <TextInput keyboardType="number-pad" maxLength={1} onChangeText={(text) => { setOtp({ ...otp, 3: text }), text ? fourth.current.focus() : second.current.focus() }} ref={third} returnKeyType="done" style={t`rounded-[10px] w-[78px] h-[61px] text-center bg-[#F8F7FD] font-bold`} />
                    <TextInput keyboardType="number-pad" maxLength={1} onChangeText={(text) => { setOtp({ ...otp, 4: text }), !text && third.current.focus() }} ref={fourth} returnKeyType="done" style={t`rounded-[10px] w-[78px] h-[61px] text-center bg-[#F8F7FD] font-bold`} />
                </View>
                <Text style={{paddingTop:40}}>resend code {timerCount == 0 ? 'Done' : timerCount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{ paddingTop: 205 }}>
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
export default Verify