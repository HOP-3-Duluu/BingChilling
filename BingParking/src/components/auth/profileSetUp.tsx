import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import {t} from '../../utils/style';
import {useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const ProfSetUp = () => {
  const [tap, setTap] = useState<any>(0);
  const [img, setImg] = useState<ImageOrVideo | any>('https://i.ibb.co/HKksxDD/Ellipse.jpg');
  const [selected, setSelected] =useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleTextChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setValue(formattedText);
  };

  const data = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
  ];

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

  return (
    <ScrollView style={[t`w-full h-full bg-white`]}>
      <View style={[t`flex items-center`]}>
      <View style={[t`flex flex-row`]}>
      <Image
          style={[t`h-[140px] w-[140px] rounded-[100px] flex items-center`]}
          source={{
            uri: img && img.path ? img.path : img,
          }}
        />
        <TouchableOpacity onPress={() => selectImages()} style={[t`ml-[105px] absolute mt-[110px]`]}>
        <Image
        style={[t`h-[30px] w-[30px] rounded-[10px]`]}
        source={{
          uri: 'https://i.ibb.co/SNzyCcb/Group.png',
        }}
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
        />
      </View>
      <View
        style={[
          t`${
            tap == 4
              ? 'border-[#EEEEEE]'
              : `${tap == 5 ? 'border-[#4448AE]' : 'border-[#EEEEEE]'}`
          } w-[360px] mt-[20px] h-[60px] bg-[#F8F7FD] border-[1px] rounded-[10px] flex flex-row items-center`,
        ]}>
        <TextInput
          style={[t`ml-[15px] w-[308px] h-[60px] ml-[12px]`]}
          onFocus={() => {
            setTap(5);
          }}
          onBlur={() => {
            setTap(4);
          }}
          placeholder="Date of Birth"
        />
        <Image
          style={[t`h-[20px] w-[20px]`]}
          resizeMode="contain"
          source={{
            uri: 'https://i.ibb.co/bRdK9MJ/Calendar.png',
          }}
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
        {/* here a dropdown list of a map*/}
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
            setSelected={() => setSelected(true)}
            boxStyles={t`w-[360px] mt-[20px] h-[60px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            dropdownStyles={t`w-[360px] rounded-[10px] border-[#EEEEEE] bg-[#F8F7FD] border-[1px] flex flex-row items-center`}
            data={data}
            placeholder="Gender"
            search={false}
          />
          <TouchableOpacity
          style={[
            t`bg-[#9C9FF0] mt-[20px] w-[360px] h-[58px] rounded-[10px] flex items-center justify-center`,
          ]}
          onPress={() => ''}>
          <Text style={[t`text-white`]}>Continue</Text>
        </TouchableOpacity>
    </View>
        </ScrollView>
  );
};

export default ProfSetUp;
