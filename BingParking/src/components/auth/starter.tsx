import {Image,Text,TouchableOpacity,View} from 'react-native';
import {t} from '../../utils/style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { asyncStorage, cognitoClient, userPool } from '../../utils/aws';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useUserCont } from '../../contexts/userCont';

export const Starter = ({navigation}: any) => {

  GoogleSignin.configure({
    webClientId: '',
  });

  const usr = useUserCont();

  const handleGoogleSignIn = async () => {
    try {
      await new Promise(async(res , rej) => {
        const { idToken, user } = await GoogleSignin.signIn();
        console.log(user);
        const clientId = '';
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
              const confirmParams = {UserPoolId: '', Username: user?.familyName};
              await cognitoClient.adminConfirmSignUp(confirmParams as any);
              setTimeout(() => {navigation?.navigate('Login')}, 1000);
            }
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
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png',
                }}
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
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
                }}
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
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQO_TyUapVDKPk9N3tV2tYI_0rWwM2fiSOQ&usqp=CAU',
                }}
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
      <TouchableOpacity
        style={[
          t`bg-[#9C9FF0] mt-[20px] w-[360px] h-[58px] rounded-[10px] flex items-center justify-center`,
        ]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[t`text-white`]}>Sign in with password</Text>
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
