import { Alert, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import notifee from '@notifee/react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useRef, useState } from "react";
import IonIcons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from "react-native-maps";
import { t } from "../utils/style";
import { useUserCont } from '../contexts/userCont';
import AWSAPI from "../utils/api";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { google_api } from "../../env";
import { useLocationCont } from "../contexts/locationCont";
import { Banner } from "../components/tempo/Banner";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS']);

//       const sendNotifcation = async({title , body}: any) => {
//         await notifee.displayNotification({
//           title: title,
//           body: body,
//           ios: {
//             foregroundPresentationOptions: {
//               badge: true,
//               sound: true,
//               banner: true,
//               list: true,
//             },
//           },
//         });
//       }; 

export const HomeScreen = ({ navigation }: any) => {

  const useLoc = useUserCont();
  const mapsRef = useRef<any>('');
  const [id, setId] = useState<any | null>(null);
  const [lan, setLan] = useState<any | number>(0);
  const [lon, setLon] = useState<any | number>(0);
  const [tm , setTm] = useState<any>(0);
  const [dis, setDis] = useState<number>(0);
  const [rc, setRc] = useState<boolean>(false);
  const user = useUserCont();
  const location = useLocationCont();

  const [data, setData] = useState<any | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization("whenInUse");
      Geolocation.getCurrentPosition(position => {
        useLoc?.setCurrentLocation(position.coords);
      },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }
    else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted == 'granted') {
        Geolocation.getCurrentPosition(position => {
          useLoc?.setCurrentLocation(position.coords);
        },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      };
    };
  };

  useEffect(() => {
    useLoc?.currentLocation != null ? mapsRef?.current?.animateToRegion(useLoc?.currentLocation, 1000) : useLoc?.currentLocation;
  }, [useLoc?.currentLocation]);

  useEffect(() => {
    requestLocationPermission();

    AWSAPI.get('locations').then((res) => {
      setData(res?.data?.data);
    }).catch(err => console.error(err)); 
  }, [AWSAPI]);

  useEffect(() => {
    if (useLoc?.currentLocation?.latitude != location?.des?.latitude && rc) {

      setLan(Number(((location?.des?.latitude - useLoc?.currentLocation?.latitude) / 3).toFixed(6)));
      setLon(Number(((location?.des?.longitude - useLoc?.currentLocation?.longitude) / 3).toFixed(6)));

      setId(setTimeout(() => {
        return useLoc?.setCurrentLocation({ ...useLoc?.currentLocation, latitude: (useLoc?.currentLocation?.latitude + lan), longitude: (useLoc?.currentLocation?.longitude + lon) });
      }, 1000));
    }

    return () => { clearTimeout(id) };
  }, [useLoc?.currentLocation, location?.des, rc]);

  return (
    <View style={styles.container}>
        <MapView
        style={styles.map}
        zoomControlEnabled={true}
        zoomEnabled={true}
        showsUserLocation={true}
        ref={mapsRef}
        initialRegion={{
          latitude: useLoc?.currentLocation?.latitude,
          longitude: useLoc?.currentLocation?.longitude,
          latitudeDelta: useLoc?.currentLocation?.latitude,
          longitudeDelta: useLoc?.currentLocation?.longitude,
        }}>
        {data != null ? data?.map((x: any, i: number) => {
          return <Marker key={i} title={x?.name?.S} coordinate={{ latitude: Number(x?.lat?.N), longitude: Number(x?.lon?.N) }} onPress={() => navigation.navigate('Park', { name: x?.name?.S, address: x?.address?.S, lat: x?.lat?.N, lon: x?.lon?.N, cost: x?.cost?.S, phone: x?.phone?.S, photos: x?.photos?.S, time: x?.time?.M })}>
            <Icon name="parking" color={"#4448AE"} size={30} />
          </Marker>
        }) : ''}
        {location?.fs ?
          <>
            <MapViewDirections
              origin={useLoc?.currentLocation}
              destination={location?.des}
              apikey={google_api}
              strokeColor='#4448AE'
              strokeWidth={2}
              mode='DRIVING'
              onReady={async(res) => {
                const hours = Math.floor(res?.duration / 60), remainingMinutes = res?.duration % 60;
                hours == 0 ? setTm(`${remainingMinutes}m`) : remainingMinutes == 0 ? setTm(`${hours}h`) : setTm(`${hours}h${Math.floor(remainingMinutes)}m`);
                setDis(res?.distance);
                location?.setErr(false); 
                location?.setHasErr(false);
                if (res?.distance == 0 && res?.duration == 0) {
                  console.log('Reached!');
                  location?.setHasErr(true);
                  return clearTimeout(id);
                };
              }}
              onError={(e) => {
                  if(e) {
                    Alert.alert(`Can't be reached.`);
                    location?.setErr(true);
                    location?.setHasErr(true);
                    setTimeout(() => {
                        location?.setErr(false);
                    }, 500);
                  }
                  return clearTimeout(id); 
              }}/>
          </> : ''}
        <Marker title={`${user?.user?.name?.S}`} coordinate={useLoc?.currentLocation} pinColor="#4448AE"/>
      </MapView>
      <View style={t`${location?.hasErr != null && location?.hasErr != true ? 'flex' : 'hidden'} absolute top-30 left-11.5 w-full`}>
         <Banner name={location?.name} dis={(dis / 1000).toFixed(2)} dur={tm}/>
      </View>
      <View style={[t`w-full h-full flex absolute bottom-5 right-5 justify-end items-end`]} pointerEvents="box-none">
        <View style={[t`flex-row justify-between w-[180px]`]}>
          <View style={t`${user?.user?.type?.S == 'Owner' ? '' : 'hidden'}`}>
            <TouchableOpacity onPress={() => navigation.navigate('ParkAdd', { userId: user?.user?.id?.S })} style={[t`border-[1px] rounded-10 border-[#4448AE] bg-[#4448AE] w-[50px] h-[50px] flex justify-center items-center`]}>
              <IonIcons name='md-add-sharp' color='white' size={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[t`border-[1px] rounded-10 border-[#4448AE] bg-[#4448AE] w-[50px] h-[50px] flex justify-center items-center`]} onPress={requestLocationPermission}>
            <IonIcons name='locate' color='white' size={25} />
          </TouchableOpacity>
          <View style={t`${location?.fs && location?.err == false ? 'flex' : 'hidden'}`}>
          <TouchableOpacity style={[t`border-[1px] rounded-10 border-[#4448AE] bg-[#4448AE] w-[50px] h-[50px] flex justify-center items-center`]} onPress={() => location?.err == false && location?.hasErr == false ? setRc(true) : setRc(false)}>
            <Icon name='car' color='white' size={25} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={t`flex flex-row absolute top-[24px] right-[14px]`}>
        <TouchableOpacity style={t`flex flex-col justify-center items-center rounded-full bg-white w-[52px] h-[52px]`} onPress={() => navigation?.navigate('Search')}>
          <IonIcons name="search-outline" size={24} color={"#4448AE"} />
        </TouchableOpacity>
        <TouchableOpacity style={t`flex flex-col justify-center items-center rounded-full bg-white w-[52px] h-[52px] ml-[10px]`} onPress={() => navigation?.navigate('Notif')}>
          <IonIcons name="notifications-outline" size={24} color={"#4448AE"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  map: {
    flex: 1
  },
  autocompleteContainer: {
    flex: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1
  },
});

export default HomeScreen;