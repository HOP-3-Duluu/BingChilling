import { Button, Platform, StyleSheet, View } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import notifee from '@notifee/react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";

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
        <View style={styles.container}>
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
          <Marker coordinate={des} title="Destination" />
          <MapViewDirections
           origin={org}
           destination={des}
           apikey={''}
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