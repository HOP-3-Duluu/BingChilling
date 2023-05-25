import { Image, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { t } from "../../utils/style"
import { TextInput } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Fontisto"
import Ion from 'react-native-vector-icons/Ionicons'
import { useState } from "react"
import Modal from "react-native-modal";

const Createnewpass = ({ navigation }: any) => {
    const [ch, setCh] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={[t`flex flex-col  w-full h-full bg-white justify-center items-center`]}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <View style={t`flex flex-col w-full p-4`}>
                <Text style={t`flex text-sm text-[#212121] mb-5`}>Create Your New Password</Text>
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
            <View style={t`flex flex-row justify-center items-center`}>
                <TouchableOpacity
                    style={[t`mr-[10px]`]}
                    onPress={() => {
                        checked ? setChecked(false) : setChecked(true);
                    }}>
                    <Image
                        style={[t`w-[24px] h-[24px]`]}
                        source={
                            checked
                                ? {
                                    uri: 'https://i.ibb.co/TKzrT42/Screen-Shot-2023-04-15-at-11-45-16.png',
                                }
                                : {
                                    uri: 'https://i.ibb.co/3R63W5q/Screen-Shot-2023-04-15-at-11-48-37.png',
                                }
                        }></Image>
                </TouchableOpacity>
                <Text style={t`text-sm font-bold`}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={toggleModal} style={t`mt-[100px] pt-[30px]`}>
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
export default Createnewpass