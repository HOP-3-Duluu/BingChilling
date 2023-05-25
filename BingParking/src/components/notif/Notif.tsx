import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import AWSAPI from "../../utils/api";
import { useUserCont } from "../../contexts/userCont";

export const Notification = ({navigation}: any) => {
    
    const user = useUserCont(); 
    const [data , setData] = useState<any | null>(null); 

    useEffect(() => {
       AWSAPI.get(`notification/${user?.user?.userId?.S}`).then((res) => {
          setData(res?.data?.data);
       })
    }, [AWSAPI]);
    
    const handleDel = async({id}: any) => {
        await AWSAPI.delete(`notif/del/${id}`).then(() => {
            Alert.alert(`Successfully deleted!`);
            return navigation.navigate('Home');
        }).catch(e => console.log(e));
    };

    const uniqueDates = [...new Set(data != null ? data.map((item: any) => moment(item?.when?.S).calendar()): '')];
    const NotifBanner = ({src , title , desc}: any) => {
        return (
            <View style={t`flex flex-row justify-start items-center w-86 h-28 bg-white rounded-lg`}>
               <View style={t`flex flex-col justify-center items-center p-5`}>
                  <Image source={{uri: src}} resizeMode="contain" style={t`flex w-20 h-20 rounded-full`}/>
               </View>
               <View style={t`flex flex-col justify-start w-52 h-12 mb-5`}>
                    <Text style={t`pb-1.5 font-bold text-sm`}>{title}</Text>
                    <Text style={t`text-[#616161] text-sm max-h-full`} numberOfLines={desc?.length}>{desc}</Text>
               </View>
            </View>
        )
    };
    
   return (
     <View style={t`flex flex-col justify-center items-center bg-[#F8F7FD] w-full pt-5`}>
        <ScrollView>
          {uniqueDates?.map((date: any , i: number) => {
             const items = data.filter((x: any) => moment(x.when?.S).calendar() === date);
             return (
                <View key={i} style={t`flex flex-col justify-start p-5`}>
                    <Text style={t`text-[#212121] font-bold`}>{date}</Text>
                    {items != null ? items?.map((x: any, i: number) => {
                        return (
                            <TouchableOpacity style={t`mt-5`} key={i} onPress={() => handleDel({id: x?.id?.S})}>
                            <NotifBanner src={x?.type?.S == 'Parking' ? 'https://media.istockphoto.com/id/1083622428/vector/car-parking-icon.jpg?s=612x612&w=0&k=20&c=Z6VydNYDHrBq6gujhSuC6eIaCXQn_eMHNBFf8Co0ul4=' : ''} title={x?.type?.S} desc={x?.context?.S}/>
                            </TouchableOpacity>
                        )
                    }): <View><Text>No new notifications.</Text></View>}
                </View>
             )
          })}
        </ScrollView>
     </View>
   )
}; 