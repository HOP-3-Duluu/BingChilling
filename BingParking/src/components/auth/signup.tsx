import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { t } from '../../utils/style';
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useUserCont } from '../../contexts/userCont';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { asyncStorage, cognitoClient, userPool } from '../../utils/aws';
import LinearGradient from 'react-native-linear-gradient'
export const Signup = ({ navigation }: any) => {
  const [tap, setTap] = useState<any>(0);
  const [mail, setMail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  GoogleSignin.configure({
    webClientId: '',
  });

  const usr = useUserCont() , params = {UserPoolId: "", AttributesToGet: ["email"]};
  const isValidEmail = (email: string) => { return /\S+@\S+\.\S+/.test(email) };

  const handleSignUp = async () => {
    try {
      return await new Promise(async(res, rej) => {
        if (mail != '' && pw != '') {
          if (!isValidEmail(mail)) {
            Alert.alert(`Invalid email: ${mail}`);
            setMail('');
            return;
          };
          
          await cognitoClient.listUsers(params).then((data) => {
              data?.Users?.map(x => x?.Attributes?.map(val => val?.Value == mail ? Alert.alert('Email already exists.') : navigation?.navigate('ProfileSetUp', { email: mail, pass: pw }))); 
          });
        }
        else {
          return Alert.alert(`Form not filled up`);
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await new Promise(async (res, rej) => {
        const { idToken, user } = await GoogleSignin.signIn();
        console.log(user);
        const clientId = '';
        const params = {
          ClientId: clientId,
          Username: user?.familyName,
          Password: "TempPassword123!",
          UserAttributes: [
            { Name: "email", Value: user?.email },
            { Name: "name", Value: user?.name }
          ],
        };

        const cogUser = new CognitoUser({
          Username: user?.familyName as string,
          Pool: userPool,
        });

        const userData = { Username: user?.familyName, Password: "TempPassword123!" }, details = new AuthenticationDetails(userData as any);

        cognitoClient.signUp(params as any, async (err: any, data: any) => {
          if (err) {
            console.log('Error signing up user:', err?.message);
            if (err?.message == 'User already exists') {
              return cogUser.authenticateUser(details, {
                onSuccess: result => { res(result), asyncStorage?.setItem(`name`, user?.familyName as string), usr?.setIsLogged(true) },
                onFailure: err => rej(`Rejected: ${err}`),
              });
            }
            else {
              const confirmParams = { UserPoolId: '', Username: user?.familyName };
              await cognitoClient.adminConfirmSignUp(confirmParams as any);
              setTimeout(() => { navigation?.navigate('ProfileSetUp' , {email: user?.email}) }, 1000);
            }
          } else {
            console.log('Successfully signed up Google User:', data);
          }
        });
      });
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <View style={[t`w-full h-full bg-white flex justify-center items-center`]}>
      <View style={[t`w-[360px] h-full`]}>
        <Text style={[t`text-[48px] font-bold mt-[45px]`]}>Create your</Text>
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
              style={[t`ml-[15px] h-[60px] w-[308px] ml-[12px]`]}
              value={mail}
              onFocus={() => {
                setTap(1);
              }}
              onBlur={() => {
                setTap(0);
              }}
              placeholder="Email"
              onChangeText={(txt) => setMail(txt)}
              autoCapitalize={'none'}
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
              style={[t`ml-[15px] h-[60px] w-[308px] ml-[12px]`]}
              value={pw}
              onFocus={() => {
                setTap(3);
              }}
              onBlur={() => {
                setTap(2);
              }}
              placeholder="Password"
              onChangeText={(txt) => setPw(txt)}
              autoCapitalize={'none'}
            />
          </View>
        </View>
        <View style={[t`flex justify-center w-full`]}></View>
        <TouchableOpacity
          style={[
            t` mt-[20px]  flex items-center justify-center`,
          ]}
          onPress={handleSignUp}>
          <LinearGradient
            colors={['#CEC9F2', '#9C9FF0']}
            style={{
              width: 360, height: 58, borderRadius: 10, alignItems: 'center',
              justifyContent: 'center',
            }}
          ><Text style={[t`text-white`]}>Sign up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={[t`mt-[42px] w-[360px] h-[65px] flex flex-col`]}>
          <View
            style={[t`w-[360px] flex flex-row justify-between items-center`]}>
            <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
            <Text>or continue with</Text>
            <View style={[t`border-[1px] h-[0px] w-[96px] border-[#EEEEEE]`]} />
          </View>
          <View
            style={[
              t`w-[360px] h-[60px] mt-[46px] flex flex-row justify-around items-center`,
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
        <View style={[t`flex flex-row mt-[108px] justify-center`]}>
          <Text style={[t`mr-[8px]`]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[t`text-[#4448AE] font-semibold`]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
