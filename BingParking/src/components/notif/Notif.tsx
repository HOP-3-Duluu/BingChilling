import { Image, Text, TouchableOpacity, View } from "react-native"
import { t } from "../../utils/style";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";

export const Notification = ({navigation}: any) => {
    const [data , setData] = useState<any>([
        {uri: 'https://previews.123rf.com/images/davidscar/davidscar1404/davidscar140400041/27761366-a-rubber-stamp-with-an-accepted-seal.jpg', title: 'Payment Success', desc: 'Parking booking at Portley was succ...' , date: moment().calendar()},
        {uri: 'https://media.istockphoto.com/id/1222806141/photo/computer-error.jpg?s=170667a&w=0&k=20&c=8chRJ86S1WhzUtWtmsmQ2A72j_iuCyVsz0MY-3p7jbM=', title: 'Payment Success', desc: 'Parking booking at Portley was succ...', date: moment().calendar()},
        {uri: 'https://media.istockphoto.com/id/936681148/vector/lock-icon.jpg?s=612x612&w=0&k=20&c=_0AmWrBagdcee-KDhBUfLawC7Gh8CNPLWls73lKaNVA=', title: 'Payment Success', desc: 'Parking booking at Portley was succ...', date: moment().subtract(1, 'days').calendar()},
        {uri: 'https://www.shutterstock.com/image-vector/wallet-icon-trendy-flat-style-260nw-414685651.jpg', title: 'Payment Success', desc: 'Parking booking at Portley was succ...', date: moment().subtract(1, 'days').calendar()},
        {uri: 'https://previews.123rf.com/images/davidscar/davidscar1404/davidscar140400041/27761366-a-rubber-stamp-with-an-accepted-seal.jpg', title: 'Payment Success', desc: 'Parking booking at Portley was succ...', date: moment().subtract(5, 'days').calendar()},
    ]);

    const uniqueDates = [...new Set(data.map((item: any) => item.date))];
    //back-end , notification -> type: 'Payment' -> navigate to payment section
    const NotifBanner = ({src , title , desc, date}: any) => {
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
             const items = data.filter((x: any) => x.date === date);
             return (
                <View key={i} style={t`flex flex-col justify-start p-5`}>
                    <Text style={t`text-[#212121] font-bold`}>{date}</Text>
                    {items?.map((x: any, i: number) => {
                        return (
                            <TouchableOpacity style={t`mt-5`} key={i}>
                            <NotifBanner src={x?.uri} title={x?.title} desc={x?.desc}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
             )
          })}
        </ScrollView>
     </View>
   )
}; 