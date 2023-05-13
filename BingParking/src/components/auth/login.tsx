import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { t } from '../../utils/style';
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { asyncStorage, cognitoClient, userPool } from '../../utils/aws';
import { useUserCont } from '../../contexts/userCont';
import LinearGradient from 'react-native-linear-gradient';

export const Login = ({ navigation }: any) => {
  const [tap, setTap] = useState<any>(0);
  const [check, setCheck] = useState<boolean>(false);
  const usr = useUserCont();
  GoogleSignin.configure({
    webClientId: '',
  });

  const handleGoogleSignIn = async () => {
    try {
      await new Promise(async (res, rej) => {
        const { idToken, user } = await GoogleSignin.signIn();
        const cogUser = new CognitoUser({
          Username: user?.familyName as string,
          Pool: userPool,
        });

        const userData = { Username: user?.familyName, Password: "TempPassword123!" }, details = new AuthenticationDetails(userData as any);
        if (idToken) {
          cogUser.authenticateUser(details, {
            onSuccess: result => { res(result), asyncStorage?.setItem(`name`, user?.familyName as string), usr?.setIsLogged(true) },
            onFailure: err => rej(`Rejected: ${err}`),
          });
        };
      });
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <View style={[t`w-full h-full bg-white flex justify-center items-center`]}>
      <View style={[t`w-[360px] h-full`]}>
        <Text style={[t`text-[48px] font-bold mt-[45px]`]}>Login to your</Text>
        <Text style={[t`text-[48px] font-bold text-[#999CF0]`]}>Account</Text>
        <View style={[t`mt-[45px]`]}>
          <View style={[
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
              placeholder="Email"
            />
          </View>
          <View style={[
            t`${tap == 2
              ? 'border-[#EEEEEE]'
              : `${tap == 3 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
              } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
          ]}>
            <Image style={[t`h-[20px] w-[20px] ml-[20px]`]} resizeMode="contain" source={{ uri: "https://i.ibb.co/kHT8KqM/Screen-Shot-2023-04-15-at-13-28-14.png" }} />
            <TextInput
              style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
              onFocus={() => {
                setTap(3);
              }}
              onBlur={() => {
                setTap(2);
              }}
              placeholder="Password"
            />
          </View>
          <View
            style={[t`flex flex-row items-center mt-[26px] justify-center`]}>
            <TouchableOpacity
              style={[t`mr-[10px]`]}
              onPress={() => {
                check ? setCheck(false) : setCheck(true);
              }}>
              <Image
                style={[t`w-[24px] h-[24px]`]}
                source={
                  check
                    ? require('../../assets/Box.jpg')
                    : require('../../assets/Check.jpg')
                }></Image>
            </TouchableOpacity>
            <Text>Remember me</Text>
          </View>
        </View>
        <View style={[t`flex justify-center w-full`]}></View>
        <TouchableOpacity
          style={[
            t`bg-[#9C9FF0] mt-[20px] w-[360px] h-[58px] rounded-[10px] flex items-center justify-center`,
          ]}
          onPress={() => { }}>
          <LinearGradient colors={['#CEC9F2', '#9C9FF0']}
            style={{
              width: 360, height: 58, borderRadius: 10, alignItems: 'center',
              justifyContent: 'center',
            }}> 
             <Text style={[t`text-white`]}>Sign in</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')} style={[t`flex w-[360px] mt-[24px] items-center`]}>
          <Text  style={[t`text-[#4D5DFA]`]}>Forgot the password?</Text>
        </TouchableOpacity>
        <View style={[t`mt-[30px] w-[360px] h-[65px] flex flex-col`]}>
          <View
            style={[t`w-[360px] flex flex-row justify-between items-center`]}>
            <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
            <Text>or continue with</Text>
            <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
          </View>
          <View
            style={[
              t`w-[360px] h-[60px] mt-[20px] flex flex-row justify-around items-center`,
            ]}>
            <TouchableOpacity
              style={[
                t`w-[88px] h-[60px] border-[#EEEEEE] border-[1px] flex justify-center items-center rounded-[16px]`,
              ]}>
              <Image
                style={[t`w-[24px] h-[24px]`]}
                resizeMode="contain"
                source={require('../../assets/Facebook.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                t`w-[88px] h-[60px] border-[#EEEEEE] border-[1px] flex justify-center items-center rounded-[16px]`,
              ]} onPress={handleGoogleSignIn}>
              <Image
                style={[t`w-[24px] h-[24px]`]}
                resizeMode="contain"
                source={require('../../assets/Google.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                t`w-[88px] h-[60px] border-[#EEEEEE] border-[1px] flex justify-center items-center rounded-[16px]`,
              ]}>
              <Image
                style={[t`w-[24px] h-[24px]`]}
                resizeMode="contain"
                source={require('../../assets/Apple.jpg')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[t`flex flex-row mt-[70px] justify-center`]}>
          <Text style={[t`mr-[8px]`]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[t`text-[#4448AE] font-semibold`]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
