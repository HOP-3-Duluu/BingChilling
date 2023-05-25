import React, { useState } from "react"
import { Alert, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style"
import LinearGradient from 'react-native-linear-gradient'
import { cognitoClient } from "../../utils/aws"
import { client_id } from '../../../env'; 

const BeforeVerify = ({ navigation }: any) => {
    const [tap, setTap] = useState<any>(0);
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const handleTextChange = (text: string) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        setValue(formattedText);
        setInputValue(text);
        if (text.length === 8) {
          Keyboard.dismiss();
        }
      };

    const handleForgot = async() => {
        try {
           if(value != '') {
               if(value.length != 8) {
                  Alert.alert(`Seriously...`); 
                  return;
               };
               return await cognitoClient.forgotPassword({Username: `+976${value}`, ClientId: client_id}).then((res) => {
                  console.log(res);
                  if(res) {
                    navigation.navigate('Verify', {phone: value});
                  } 
              });
           }
           else {
              Alert.alert(`Phone number must be given!`); 
           }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <View style={t`flex flex-col w-full justify-center items-center bg-white`}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <Text style={t`my-7 text-[#212121] font-bold`}>Type your phone number down below.</Text>
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

            <TouchableOpacity onPress={handleForgot} style={{ paddingTop: 10 }}>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={{
                        width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={t`text-white text-[16px] leading-[22.4px]`}>Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
export default BeforeVerify