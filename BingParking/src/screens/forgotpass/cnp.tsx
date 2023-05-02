import { Alert, Button, Image, Pressable, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { t } from "../../utils/style"
import { TextInput } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Fontisto"
import Ion from 'react-native-vector-icons/Ionicons'
import { useState } from "react"
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
const Createnewpass = ({ navigation }: any) => {
    const [ch, setCh] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={[t`flex flex-col flex-start w-full h-full bg-white justify-center items-center `, { justifyContent: "flex-start" }]}>
            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
            <View style={t`flex flex-col justify-start w-full p-4`}>
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
            <View style={t`flex flex-row flex-start justify-center items-center `}>
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
                    <Text style={t`text-white text-[16px] leading-[22.4px] `}>Continue</Text>
                </LinearGradient>
                <Modal isVisible={isModalVisible} animationIn={"fadeInUp"} animationOut={"fadeOut"}>
                    <View style={[t`bg-[#FFFFFF] flex  flex-start justify-center items-center  rounded-[24px] h-[441px] w-[340px] `, { justifyContent:"space-around"}]}>
                        <View style={t`flex  flex-start justify-center items-center `}>
                            <Image style={{ width: 236, height: 236 }} source={require('../../assets/verify.jpg')} />
                            <Text style={t`text-[#4448AE] text-[24px] leading-[22.4px] font-bold`}>Congratulations!</Text>
                        </View>
                        <Text style={t`text-[#212121] text-[16px]`}>Your account is ready to use</Text>
                        <TouchableOpacity onPress={toggleModal} style={t`pb-[15px]`}>
                            <LinearGradient
                                colors={['#CEC9F2', '#9C9FF0']}
                                style={{
                                    width: 266, height: 58, borderRadius: 10, alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={t`text-white text-[16px] leading-[22.4px] `}>Go to Homepage</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>
                </Modal>
            </TouchableOpacity>

        </View>
    )

}
export default Createnewpass