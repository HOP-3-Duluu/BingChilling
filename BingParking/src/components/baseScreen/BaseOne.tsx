import { Image, Text, View } from "react-native"
import { styles, t } from "../../utils/style"
import { useEffect} from "react";
import { asyncStorage } from "../../utils/aws";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient'
import { useUserCont } from "../../contexts/userCont";

const BaseOne = ({ navigation }: any) => {
    
    const user = useUserCont();

    useEffect(() => {
        asyncStorage?.getItem('intro').then((data) => {
          return data == 'onEnd' && user?.isLogged == false ? navigation?.navigate('Starter') : console.log(`New user.`);
        })
    }, []);

    return (
        <View style={t`flex flex-col w-full justify-center items-center mt-auto mb-[51px]`}>
            <Image source={require("../../assets/Hello-rafiki.png")} />
            <Text style={t`flex text-[48px] w-full text-left ml-[24px] font-bold`}>Welcome to  </Text>
            <Text style={t`flex text-[66px] w-full text-left ml-[24px] text-${styles.colors.main} font-bold`} >BingParking</Text>
            <Text style={t`flex text-[18px] w-full text-left ml-[24px] text-${styles.colors.main}`} >The best parking app of the century for all people in the world</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('TutorialTwo')}
                    style={[
                        t`flex w-full p-2 w-[368px] h-[58px] mb-[17px] mt-[17px] rounded-lg`,
                    ]}>
                    <LinearGradient
                        colors={  ['#CEC9F2', '#9C9FF0']}
                        style={{
                            width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    ><Text style={ [t`text-white text-[18px]`]}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
        </View>
        
    )
};
export default BaseOne;