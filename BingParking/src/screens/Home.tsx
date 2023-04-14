import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { t } from "../utils/style"
import { useState } from "react";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { useUserCont } from "../contexts/userCont";

export const HomeScreen = ({navigation}: any) => {

  const [images, setImages] = useState<ImageOrVideo[]>([]);
  const user = useUserCont();
  console.log(user?.user); 

  const selectImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxFiles: 5,
    })
      .then((selectedImages) => {
        setImages(selectedImages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    return (
        <View style={t`flex flex-col w-full justify-center items-center`}>
            <Text style={t`text-green-500`}>HomeScreen</Text>
            <Text style={t`text-green-500`}>Good Luck BingParking Devs! ^^</Text>
            <View style={t`flex flex-col w-full`}>
              <Text>Testing Multiple photo uploads.</Text>
              <Button title="Select Images" onPress={selectImages} />
              <FlatList
               data={images}
               renderItem={({ item }) => (
               <Image source={{ uri: item.path }} style={{ width: 200, height: 200, margin: 10 }}/>)}
               keyExtractor={(item) => item.path}
               horizontal={true}/>
            </View>
            <TouchableOpacity  onPress={() => navigation?.navigate('Starter')}><Text>User-Authentication UI</Text></TouchableOpacity>
        </View>
    )
}; 