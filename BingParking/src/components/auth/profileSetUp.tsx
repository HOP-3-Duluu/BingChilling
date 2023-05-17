import {Alert, Image,Keyboard,KeyboardAvoidingView,Platform,Text,TextInput,TouchableOpacity,View} from 'react-native';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import {t} from '../../utils/style';
import {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { asyncStorage, cognitoClient, userPool } from '../../utils/aws';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useUserCont } from '../../contexts/userCont';
import AWSAPI from '../../utils/api';
import { pool_id } from '../../../env';

export const ProfSetUp = ({navigation, route}: any) => {
  const { email , pass} = route.params;

  const user = useUserCont();
  const [tap, setTap] = useState<any>(0);
  const [img, setImg] = useState<ImageOrVideo | any>(null);
  const [flName , setFlname] = useState<string>('');
  const [name , setName] = useState<string>('');
  const [mail , setMail] = useState<string>('');
  const [value, setValue] = useState<any>('');
  const [gender , setGender] = useState<string>('');
  const [tp , setTp] = useState<string>('');
  const [selected, setSelected] =useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const isValidEmail = (email: string) => {return /\S+@\S+\.\S+/.test(email)};

  useEffect(() => {
     if(email != '') setMail(email);
  }, []);

  const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: mail }), new CognitoUserAttribute({ Name: 'name', Value: name })];

  const handleTextChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setValue(formattedText);
    setInputValue(text);
    if (text.length === 8) {
      Keyboard.dismiss();
    }
  };

  const data = [{key: '1', value: 'Male'},{key: '2', value: 'Female'}] , role = [{key: '1', value: 'User'},{key: '2', value: 'Owner'}];

  const selectImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      multiple: false,
      maxFiles: 1,
    }).then((selectedImages) => {
        setImg(selectedImages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = async() => {
      try {
        return await new Promise((rej ,resolve) => {
          if(name != '' && flName != '' && value != '' && gender != '' && tp != '' && img != null && mail != '') {
            if(!isValidEmail(mail)) {
               Alert.alert(`Not a valid mail. ${mail}`);
               return;
            };
           userPool.signUp(name , pass , attributeList , null as any , async(err , res) => {
            if(err) {rej(`ERROR: ${err?.message}`)};
            const confirmParams = {UserPoolId: pool_id as string , Username: name};
            await AWSAPI.post('user/create' , {
               fname: flName, name: name , mail: mail, phone: value, pic: img?.data, gender: gender, role: tp
            }).then(async(res) => {  
              await cognitoClient.adminConfirmSignUp(confirmParams).then((res) => {
                if(res) {    
                  const userData = {Username: name, Password: pass} , details = new AuthenticationDetails(userData);
                  const cogUser = new CognitoUser({Username: name as string, Pool: userPool});
                  cogUser.authenticateUser(details, {
                    onSuccess: result => {resolve(result), console.log(result), asyncStorage.setItem('name' , name.toLocaleLowerCase().trim()), user?.setIsLogged(true)},
                    onFailure: err => rej(`Err: ${err?.message}`),
                });
                }
                else {
                   Alert.alert('Something went wrong.');
                }
              });
            });
           });
          }
         else {
           Alert.alert('Form not completely filled');
         }
        })
      } catch(e) {
         console.log(e);
      }
  };

  return (
      <View style={[t`w-full h-full bg-white` ]}>
      <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[t`flex items-center`]}>
      <View style={[t`flex flex-row`]}>
      <Image
          style={[t`h-[140px] w-[140px] rounded-[100px] flex items-center`]}
          source={img == null ? require('../../assets/user.jpg') : {uri: img?.path}}
        />
        <TouchableOpacity onPress={() => selectImages()} style={[t`ml-[105px] absolute mt-[110px]`]}>
        <Image
        style={[t`h-[30px] w-[30px] rounded-[10px]`]}
        source={require('../../assets/Exclude.jpg')}
      />
      </TouchableOpacity>
      </View>
      <View
        style={[
          t`${
            tap == 0
              ? 'border-[#EEEEEE]'
              : `${tap == 1 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
          } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
        ]}>
        <TextInput
          style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
          onFocus={() => {
            setTap(1);
          }}
          onBlur={() => {
            setTap(0);
          }}
          placeholder="Full Name"
          onChangeText={(text) => setFlname(text)}
          value={flName}
        />
      </View>
      <View
        style={[
          t`${
            tap == 2
              ? 'border-[#EEEEEE]'
              : `${tap == 3 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
          } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
        ]}>
        <TextInput
          style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
          onFocus={() => {
            setTap(3);
          }}
          onBlur={() => {
            setTap(2);
          }}
          placeholder="Nickname"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
    
      <View
        style={[
          t`${
            tap == 6
              ? 'border-[#EEEEEE]'
              : `${tap == 7 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
          } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
        ]}>
        <TextInput
          style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
          onFocus={() => {
            setTap(7);
          }}
          onBlur={() => {
            setTap(6);
          }}
          placeholder="Email"
          autoCapitalize='none'
          value={mail}
          onChangeText={(txt) => setMail(txt)}
        />
        <Image
          style={[t`h-[20px] w-[20px]`]}
          resizeMode="contain"
          source={{
            uri: 'https://i.ibb.co/4JfwPzG/Message.png',
          }}
        />
      </View>
      <View
        style={[
          t`${
            tap == 8
              ? 'border-[#EEEEEE]'
              : `${tap == 9 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
          } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
        ]}>
        <Text style={[t`ml-[20px]`]}>+976</Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={8}
          style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
          onFocus={() => {
            setTap(9);
          }}
          onBlur={() => {
            setTap(8);
          }}
          value={value}
          placeholder="Phone number"
          onChangeText={handleTextChange}
        />
      </View>
      <SelectList
            setSelected={(e: any) => {setSelected(true) , setGender(data[e - 1]?.value)}}
            boxStyles={t`w-[360px] mt-[20px] h-[60px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            dropdownStyles={t`w-[360px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            data={data}
            placeholder="Gender"
            search={false}
          />
         <SelectList
            setSelected={(e: any) => {setSelected(true), setTp(role[e - 1]?.value)}}
            boxStyles={t`w-[360px] mt-[20px] h-[60px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            dropdownStyles={t`w-[360px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            data={role}
            placeholder="Role"
            
            search={false}
          />
         
      <View style={[t` justify-end items-center`]}>
      <TouchableOpacity
          style={[
            t`bg-[#9C9FF0] mt-[20px] w-[360px] mb-[30px] h-[58px] rounded-[10px] flex items-center justify-center`,
          ]}
          onPress={handleSignUp}>
          <Text style={[t`text-white`]}>Continue</Text>
        </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfSetUp;
