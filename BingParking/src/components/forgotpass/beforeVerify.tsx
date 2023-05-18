import React, { useState, useRef, useEffect } from "react"
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
import { cognitoClient } from "../../utils/aws"
import Icon from "react-native-vector-icons/Fontisto"
import Ion from 'react-native-vector-icons/Ionicons'
const BeforeVerify = ({ navigation }: any) => {
    const [tap, setTap] = useState<any>(0);
    const [mail, setMail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [ch, setCh] = useState<boolean>(false);
    const [value, setValue] = useState<any>('');
    const [inputValue, setInputValue] = useState<string>('');

    const handleTextChange = (text: string) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        setValue(formattedText);
        setInputValue(text);
        if (text.length === 8) {
          Keyboard.dismiss();
        }
      };

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <Text style={t`my-7 text-[#212121] font-bold`}>Type your phone number down below.</Text>
            {/* <View style={[
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
            </View> */}
            <View
                style={[
                    t`${tap == 8
                            ? 'border-[#EEEEEE]'
                            : `${tap == 9 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
                        } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
                ]}>
                <Text style={[t`ml-[20px]`]}>+976</Text>
                <TextInput
                    keyboardType="number-pad"
                    maxLength={8}
                    style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
                    onFocus={() => {
                        setTap(9);
                    }}
                    onBlur={() => {
                        setTap(8);
                    }}
                    value={value}
                    placeholder="Phone number"
                    onChangeText={handleTextChange}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Verify')} style={{ paddingTop: 10 }}>
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
export default BeforeVerify