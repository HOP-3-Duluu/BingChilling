import { Button, Image, Text, View } from "react-native"
import { styles, t } from "../../utils/style"
import { useEffect, useState } from "react";
import { asyncStorage } from "../../utils/aws";

const BaseOne = ({ navigation}: any) => {

    const [clr , setClr] = useState<boolean>(false);
    
    useEffect(() => {
        asyncStorage?.getItem('intro').then((data) => {
            return data == 'onEnd' ? navigation?.navigate('Starter') : console.log(`New user.`);
        })
    }, []);

    return (
        <View style={t`flex flex-col w-full justify-center items-center mt-auto mb-[51px]`}>
            <Image source={require("../../assets/Hello-rafiki.png")} />
            <Text style={t`flex text-[48px] w-full text-left ml-[24px] font-bold`}>Welcome to  </Text>
            <Text style={t`flex text-[66px] w-full text-left ml-[24px] text-${styles.colors.main} font-bold`} >BingParking</Text>
            <Text style={t`flex text-[18px] w-full text-left ml-[24px] text-${styles.colors.main}`} >The best parking app of the century for all people in the world</Text>
            <View style={t`flex w-full bg-${clr ? styles.colors.main : styles.colors.submain} p-2 w-[368px] h-[58px] mb-[17px] mt-[17px] rounded-lg`} onPointerEnter={() => setClr(true)}>
                <Button
                    color="#FFFFFF"
                    title="Next"
                    onPress={() =>
                        navigation.navigate('TutorialTwo')
                    }
                />
            </View>
        </View>
    )
}; 

export default BaseOne;