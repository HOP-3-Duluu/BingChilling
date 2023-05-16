import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react";
import { t } from "../../utils/style";
import LinearGradient from 'react-native-linear-gradient'
import Icon from "react-native-vector-icons/AntDesign";
import IconMail from "react-native-vector-icons/Feather";
export const Forgotpass = ({ navigation }: any) => {
    const [ch, setCh] = useState<boolean>(false);
    const [ch1, setCh1] = useState<boolean>(false);

    return (
        <View style={[t`w-full h-full bg-white flex justify-center items-center`, { justifyContent: "space-around" }]}>
            <Image style={{ width: 326, height: 286 }} source={require('../../assets/forgotPass.png')} />
            <Text style={[t`mt-[10px] mx-[20px] text-sm text-[#212121]`]}>Select which contact details should we use to reset your password</Text>
            <View style={[t`flex   justify-center items-center `]}>
                <View style={{ paddingBottom: 16 }}>
                    <LinearGradient style={[t`border-[${ch ? '0px' : '1px'}] border-[#EEEEEE] rounded-[25px]`, { height: 120 }]} colors={ch ? ['#D0CBF1', '#4448AE'] : ['#FFFFFF', '#FFFFFF']}  >
                        <View style={{ flex: 1, margin: 5, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 25, paddingTop: 20 }}>
                            <TouchableOpacity onPress={() => setCh(!ch)} onPressOut={() => { setCh1(false) }} style={[t`flex  flex-row items-center  border-[${ch ? '#D0CBF1' : '#EEEEEE'}]  w-[350px] gap-[20px] h-[120px] text-center mb-5`]}>
                                <View style={[t`bg-[#FFFFFF] rounded-full`]}>
                                    <View style={[t` flex items-center justify-center bg-[#EDEFFF] w-[80px] h-[80px] rounded-full ml-[24px]`]} >
                                        <Icon name="message1" size={26} color={"#4D5DFA"} />
                                    </View>
                                </View>
                                <View style={[t`flex flex-col justify-start mt-[35px] mb-[39px] ml-[20px] mr-[24px]`]} >
                                    <Text style={[{ lineHeight: 19.6 }, t`text-sm text-[#757575]`]}>via SMS:</Text>
                                    <Text style={[{ lineHeight: 60 }, t`font-bold`]}>+976 ********</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
                <View style={{ paddingBottom:16}}>
                    <LinearGradient style={[t`border-[${ch1 ? '0px' : '1px'}] border-[#EEEEEE] rounded-[25px]`, { height: 120 }]} colors={ch1 ? ['#D0CBF1', '#4448AE'] : ['#FFFFFF', '#FFFFFF']}  >
                        <View style={{ flex: 1, margin: 5, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 25, paddingTop: 20 }}>
                            <TouchableOpacity onPress={() => setCh1(!ch1)} onPressOut={() => { setCh(false) }} style={[t`flex  flex-row items-center  border-[${ch1 ? '#D0CBF1' : '#EEEEEE'}]  w-[350px] gap-[20px] h-[120px] text-center mb-5`]}>
                                <View style={[t`bg-[#FFFFFF] rounded-full`]}>
                                    <View style={[t` flex items-center justify-center bg-[#EDEFFF] w-[80px] h-[80px] rounded-full ml-[24px]`]} >
                                        <IconMail name="mail" size={26} color={"#4D5DFA"} />
                                    </View>
                                </View>
                                <View style={[t`flex flex-col justify-start mt-[35px] mb-[39px] ml-[20px] mr-[24px]`]} >
                                    <Text style={[{ lineHeight: 19.6 }, t`text-sm text-[#757575]`]}>via Email:</Text>
                                    <Text style={[{ lineHeight: 60 }, t`font-bold`]}>example@gmail.com</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Verify')} style={t`mb-10`}>
                    <LinearGradient
                        colors={['#CEC9F2', '#9C9FF0']}
                        style={{
                            width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={t`text-white text-[16px] leading-[22.4px]`} >Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default Forgotpass