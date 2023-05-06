// import { useState } from "react";
// import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
// import { useUserCont } from "../contexts/userCont";
  
  // const [images, setImages] = useState<ImageOrVideo[]>([]);
  // const user = useUserCont();
  // console.log(user?.user); 

  // const selectImages = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     multiple: true,
  //     maxFiles: 5,
  //   })
  //     .then((selectedImages) => {
  //       setImages(selectedImages);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

//   <View style={t`flex flex-col w-full justify-center items-center`}>
//   <Text style={t`text-green-500`}>HomeScreen</Text>
//   <Text style={t`text-green-500`}>Good Luck BingParking Devs! ^^</Text>
//   <TouchableOpacity  onPress={() => navigation?.navigate('Starter')}><Text>User-Authentication UI</Text></TouchableOpacity>
//   <TouchableOpacity onPress={() => navigation?.navigate('TutorialOne')}><Text>Tutorial</Text></TouchableOpacity>
//   <TouchableOpacity style={t`flex flex-col justify-center items-center rounded-full bg-white w-[52px] h-[52px]`} onPress={() => navigation?.navigate('Notif')}>
//      <IonIcons name="notifications-outline" size={24} color={"#4448AE"}/>
//   </TouchableOpacity>
//   <Banner name={"Ulanbator City"} dis={0.5} dur={30}/>
//   <TouchableOpacity  onPress={() => navigation?.navigate('Forgot')}><Text>Forgot</Text></TouchableOpacity>
// </View>

{/* <View style={t`flex flex-col w-full`}>
<Text>Testing Multiple photo uploads.</Text>
<Button title="Select Images" onPress={selectImages} />
<FlatList
 data={images}
 renderItem={({ item }) => (
 <Image source={{ uri: item.path }} style={{ width: 200, height: 200, margin: 10 }}/>)}
 keyExtractor={(item) => item.path}
 horizontal={true}/>  
</View> */}