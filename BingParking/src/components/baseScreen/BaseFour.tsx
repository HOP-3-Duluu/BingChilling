import { Button, Image, Text, View, } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles, t } from "../../utils/style"
import { useEffect, } from "react";
import { useIsFocused } from '@react-navigation/native';

const BaseFour = ({ navigation, route }: any) => {
    const isFocused = useIsFocused()
    const width = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width.value,
        }
    });

    useEffect(() => {
        width.value = 1,
            (width.value = withSpring(18, {
                damping: 20,
                stiffness: 100,
                mass: 5
            }))
    }, [isFocused]);


    return (
        <View style={t`flex flex-col w-full justify-center items-center mt-auto mb-[51px]`}>
            <Image source={require("../../assets/Wristwatch-rafiki.png")} />
            <Text style={t`flex text-[32px] w-full text-center ml-[24px] mt-[10px] mb-[10px] font-bold`}>Find Parking
                <Text style={t`text-${styles.colors.main}`}> Places </Text>
                Around You Easily</Text>

            <Text style={t`flex text-[18px] w-full text-center ml-[24px] text-[#616161] `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>

            <View style={[t`flex flex-row w-[50px] my-[20px] justify-center `]}>
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1`,]}></Animated.View >
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1`,]}></Animated.View >
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1 border-${styles.colors.main}`, animatedStyles]}></Animated.View >
            </View>
            <View style={t`flex w-full bg-${styles.colors.submain} p-2 w-[368px] h-[58px] mb-[17px] mt-[17px] rounded-lg text-white text-white `}>
                <Button
                    color="#FFFFFF"
                    title="Next"
                    onPress={() => {
                        (width.value = withSpring(0))
                        navigation.navigate('TutorialFour')
                    }
                    }
                />
            </View >
            <View style={t`flex w-full bg-${styles.colors.submain} p-2 w-[368px] h-[58px] gap-[10px] rounded-lg`}>
                <Button
                    color="#FFFFFF"
                    title="Back"
                    onPress={() => {
                        (width.value = withSpring(0))
                        navigation.navigate('TutorialThree')
                    }
                    }
                />
            </View>
        </View >
    )
};

export default BaseFour;