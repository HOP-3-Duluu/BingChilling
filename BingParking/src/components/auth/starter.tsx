import {Image,Text,TouchableOpacity,View} from 'react-native';
import {t} from '../../utils/style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { asyncStorage, cognitoClient, userPool } from '../../utils/aws';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useUserCont } from '../../contexts/userCont';
import LinearGradient from 'react-native-linear-gradient'
import { client_id, google_client , pool_id } from '../../../env';
export const Starter = ({navigation}: any) => {

  GoogleSignin.configure({
    webClientId: google_client,
  });

  const usr = useUserCont();

  const handleGoogleSignIn = async () => {
    try {
      return await new Promise(async(res , rej) => {
        const { idToken, user } = await GoogleSignin.signIn();
        console.log(user);
        const clientId = client_id as string;
        const params = {
          ClientId: clientId,
          Username: user?.familyName,
          Password: "TempPassword123!",
          UserAttributes: [
            { Name: "email", Value: user?.email },
            { Name: "name", Value: user?.name}
          ],
        };

        const cogUser = new CognitoUser({
          Username: user?.familyName as string, 
          Pool: userPool,
        });
        
        const userData = {Username: user?.familyName, Password: "TempPassword123!"} , details = new AuthenticationDetails(userData as any); 
        
        cognitoClient.signUp(params as any, async(err: any, data: any) => {
          if (err) {
            console.log('Error signing up user:', err?.message);
            if(err?.message == 'User already exists') {
                cogUser.authenticateUser(details, {
                  onSuccess: result => {res(result), asyncStorage?.setItem(`name` , user?.familyName as string) , usr?.setIsLogged(true)},
                  onFailure: err => rej(`Rejected: ${err}`),
              });
            }
            else { 
              const confirmParams = {UserPoolId: pool_id as string, Username: user?.familyName};
              return await cognitoClient.adminConfirmSignUp(confirmParams as any).then(() => {
                setTimeout(() => {navigation?.navigate('ProfileSetUp', {email: user?.email})}, 1000);
              });
            };
          } else {
            console.log('Successfully signed up user:', data);
          }
        });
      });
    } catch (error) {
      console.log(error);
    };
  };
  return (
    <View style={[t`w-full h-full flex bg-white items-center`]}>
      <Text style={[t`text-[48px] font-bold mt-[98px] mt-[214px]`]}>Lets you in</Text>
      <View style={[t`mt-[78px]`]}>
      <TouchableOpacity style={[
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] flex justify-center flex-row items-center `,
            ]}>
              <Image
                style={[t`w-[24px] h-[24px] mr-[12px]`]}
                resizeMode="contain"
                source={require('../../assets/Facebook.jpg')}
              />
          <Text>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      <TouchableOpacity style={[
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] flex justify-center flex-row mt-[16px] items-center `,
            ]} onPress={() => handleGoogleSignIn()}>
              <Image
                style={[t`w-[24px] h-[24px] mr-[12px]`]}
                resizeMode="contain"
                source={require('../../assets/Google.jpg')}
              />
          <Text>
            Continue with Google
          </Text>
        </TouchableOpacity>
      <TouchableOpacity style={[
              t` border-[1px] border-[#EEEEEE] rounded-[10px] w-[360px] h-[60px] flex justify-center flex-row mt-[16px] items-center `,
            ]}>
              <Image
                style={[t`w-[24px] h-[24px] mr-[12px]`]}
                resizeMode="contain"
                source={require('../../assets/Apple.jpg')}
              />
          <Text>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          t`mt-[30px] w-[360px] h-[45px] flex flex-row justify-between items-center`,
        ]}>
        <View style={[t`border-[1px] h-[0px] w-[165px] border-[#EEEEEE]`]} />
        <Text>or</Text>
        <View style={[t`border-[1px] h-[0px] w-[165px] border-[#EEEEEE]`]} />
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={t`pb-[15px]`}>
                            <LinearGradient
                                colors={['#CEC9F2', '#9C9FF0']}
                                style={{
                                    width: 360, height: 58, borderRadius: 10, alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={t`text-white text-[16px] leading-[22.4px] `}>Login</Text>
                            </LinearGradient>

                        </TouchableOpacity>
      
      <View style={[t`flex flex-row mt-[70px]`]}>
        <Text style={[t`mr-[8px]`]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[t`text-[#4448AE] font-semibold`]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Starter;
