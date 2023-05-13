import { Button, Image, Platform, StyleSheet, Text, Touchable, View } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import notifee from '@notifee/react-native';
import MapViewDirections from 'react-native-maps-directions';
import LinearGradient from 'react-native-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { t } from "../utils/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

export const HomeScreen = ({ navigation }: any) => {
      const [currentLocation, setCurrentLocation] = useState<any | null>(null);
      const mapsRef = useRef<any>(''); 
      const [rc , setRc] = useState<boolean>(false);
      const [id , setId] = useState<any | null>(null);
      const [org , setOrg] = useState<any>({latitude: 36.1871635, longitude: -120.8211910});
      const [des , setDes] = useState<any>({latitude: 37.3318456, longitude: -122.0296002});
      const [lan , setLan] = useState<any | number>(0);
      const [lon, setLon] = useState<any | number>(0);
      const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
      const [selectedParking, setSelectedParking] = useState<boolean>(false);
    
      let role = 'owner';
      const handleMapPress = (event: any) => {
        setSelectedLocation(event.nativeEvent.coordinate);
        console.log(`Selected: ${JSON.stringify(selectedLocation)}`); 
      };
      
    
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          await Geolocation.requestAuthorization("whenInUse");
          Geolocation.getCurrentPosition(position => {
            setCurrentLocation(position.coords); 
          },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        }
      };
       
      const sendNotifcation = async({title , body}: any) => {
        await notifee.displayNotification({
          title: title,
          body: body,
          ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
          },
        });
      }; 

      useEffect(() => {
        currentLocation != null ? mapsRef?.current?.animateToRegion(currentLocation, 1000) : currentLocation;
      }, [currentLocation]);

     
      useEffect(() => {
        setLan(Number(((des?.latitude - org?.latitude) / 3).toFixed(6)));
        setLon(Number(((des?.longitude - org?.longitude) / 3).toFixed(6)));
        if(org?.latitude != des?.latitude && rc) {
          console.log(lan , lon);
          setId(setTimeout(() => {
            return setOrg({...org , latitude: (org?.latitude + lan) , longitude: (org?.longitude + lon)}); 
          }, 1000));
        };
    
        return () => {clearTimeout(id)};
      }, [org, des, rc]);
    
      return (
        <View style={[t`w-full h-full`,styles.container]}>
          <Button title="Display Notification" onPress={() => {setRc(true)}}/>
          <MapView
            style={styles.map}
            zoomControlEnabled={true}
            zoomEnabled={true}
            showsUserLocation={true}
            onPress={handleMapPress}
            ref={mapsRef}
            initialRegion={{
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
              latitudeDelta: currentLocation?.latitude,
              longitudeDelta: currentLocation?.longitude,
            }}>
            <GooglePlacesAutocomplete
             placeholder="Search"
             fetchDetails={true}
             onPress={(data, details = null) => {
                const location = details?.geometry?.location;
                setCurrentLocation({latitude: location?.lat, longitude: location?.lng});
             }}
             styles={styles.autocompleteContainer}
             query={{
              key: '',
              language: 'en',
             }}/> 
            {selectedLocation && (
            <Marker coordinate={selectedLocation} />
          )}
          <Marker coordinate={org} title="Me" onPress={() => console.log('darsan')}/>
          <Marker coordinate={des} title="Destination" onPress={() => setSelectedParking(true)} />
          <MapViewDirections
           origin={org}
           destination={des}
           apikey={'AIzaSyAF76A1JtzoJ2hkIMZQCFegkvo9GSXlYKk'}
           strokeColor='red'
           strokeWidth={2}
           mode='DRIVING'
           onReady={(res) => {
              console.log(`Distance: ${Math.floor(res?.distance)} , Duration: ${Math.floor(res?.duration)}`)
              if(res?.distance == 0 && res?.duration == 0) {
                 console.log('Reached!');
                 return clearTimeout(id);
              }
           }}/> 
           <Marker coordinate={currentLocation}/>
          </MapView>
          <View style={[t`w-full h-full flex absolute bottom-5 right-5 justify-end items-end`]} pointerEvents="box-none">
            <View style={[t`flex-row justify-between w-[120px]`]}>
              <TouchableOpacity onPress={() => navigation.navigate('ParkAdd')} style={[t`border-[1px] rounded-10 border-[#4448AE] bg-[#4448AE] w-[50px] h-[50px] flex justify-center items-center`]}>
                <Icon name='md-add-sharp' color='white' size={25}/>
              </TouchableOpacity>
              <TouchableOpacity style={[t`border-[1px] rounded-10 border-[#4448AE] bg-[#4448AE] w-[50px] h-[50px] flex justify-center items-center`]} onPress={requestLocationPermission}>
                <Icon name='locate' color='white' size={25}/></TouchableOpacity>
            </View>
          </View>
           <Modal isVisible={selectedParking}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}><View style={[t`w-full h-full bg-white rounded-[30px] flex items-center`]}>
          
          <Image
        style={[t`h-[200px] w-[200px] mt-[100px] flex items-center`]}
        source={
          // photo == null ?
             require('../assets/parking.jpg')
            // : {uri: photo?.path}
}
      /><View style={t`w-[320px] flex-col h-[200px] justify-between`}>
        <Text style={t`text-[30px]`}>Name </Text>
        <Text style={t`text-[30px]`}>Address : Address</Text>
        <Text style={t`text-[30px]`}>Cost per hour : Cost₮</Text>
        <Text style={t`text-[30px]`}>Phone : Phone</Text>
      </View>
        <View style={[t`w-full h-full z-1 flex items-center justify-end absolute`]}>
                    <TouchableOpacity
                  style={[
                    t`bg-[#9C9FF0] w-[320px] h-[58px] rounded-[10px] flex items-center mb-[20px] justify-center`,
                  ]}
                  onPress={() => {
                    setSelectedParking(false);
                    }}>
                  <Text style={[t`text-white`]}>Reserve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    t`bg-[#EDEFFF] w-[320px] h-[58px] rounded-[10px] flex items-center mb-[30px] justify-center`,
                  ]}
                  onPress={() => {
                    setSelectedParking(false);
                  }}>
                  <Text style={[t`text-[#4448AE]`]}>Cancel</Text>
                </TouchableOpacity>
        </View>
      </View>
      </Modal>
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