import { Button, Image, Text, View } from "react-native"
import { styles, t } from "../../utils/style"
import { useState } from "react";

const BaseOne = ({ navigation, route }: any) => {

    const [clr , setClr] = useState<boolean>(false);

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
            <View style={t`flex w-full bg-${styles.colors.submain} p-2 w-[368px] h-[58px] gap-[10px] rounded-lg hover:bg-${styles.colors.submain}`}>
                <Button
                    color="#FFFFFF"
                    title="Back"
                    onPress={() =>
                        navigation.navigate('Home')
                    }
                />
            </View>
        </View>
    )
}; 

export default BaseOne;