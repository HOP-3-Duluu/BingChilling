import { Button, Image, Text, TextInput, View, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { styles, t } from "../../utils/style"
import IonIcons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { asyncStorage } from "../../utils/aws";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useUserCont } from '../../contexts/userCont';

const SearchMain = ({ navigation, route }: any) => {
    const useLoc = useUserCont();
    const [savedLocation, setSavedLoaction] = useState<any>()
    const [searchHistory, setSearchHistory] = useState<any[]>([]);

    const storeSearchHistory = async (searchedText: any) => {

        try {
            const history: any = [...searchHistory, searchedText];
            await asyncStorage.setItem('searchHistory', JSON.stringify(history));
            if (history !== null) {
                setSearchHistory(history);
                console.log(searchHistory);
            }
        } catch (error) {
            console.error('Error storing search history:', error);
        }
    };

    const getSearchHistory = async () => {
        try {
            const history = await asyncStorage.getItem('searchHistory');
            if (history !== null) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error('Error getting search history:', error);
        }
    };

    const handleSearch = (item: { lat: any; lng: any; }) => {
        useLoc?.setCurrentLocation({ latitude: item?.lat, longitude: item?.lng });
        navigation.navigate('Home')
    };

    useEffect(() => {
        getSearchHistory();
    }, []);

    const renderSearchItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => handleSearch(item)}>
            <Text>{item?.name}</Text>
        </TouchableOpacity>
    );

    const clearAsyncStorage = async () => {
        asyncStorage.clear();
    }
    return (
        <View style={t`flex flex-col w-full items-center `}>

            <View style={t`flex flex-row top-0 w-[370px] border rounded-lg border-${styles.colors.main} bg-[#F8F7FD]`} >
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, details) => {
                        const location = details?.geometry?.location;
                        useLoc?.setCurrentLocation({ latitude: location?.lat, longitude: location?.lng });
                        storeSearchHistory({name: data?.description , lat: location?.lat , lng: location?.lng});
                        navigation.navigate('Home')
                    }}
                    styles={styless.autocompleteContainer}
                    query={{
                        key: 'AIzaSyAF76A1JtzoJ2hkIMZQCFegkvo9GSXlYKk',
                        language: 'en',
                    }} />
            </View>
            <View style={t`border-t-[1px] w-[380px] mt-5 border-[#EEEEEE]`}>
                <Text style={t`flex font-bold top-4 ml-[10px]`}>Recent</Text>
                <View style={t`flex ml-[10px] top-7`}>
                    <FlatList
                        data={searchHistory}
                        renderItem={renderSearchItem}
                    />
                </View>
            </View>
            <Button
                title="Erase"
                onPress={() => {
                    clearAsyncStorage()
                }
                }
            />
        </View>
    )
};

const styless = StyleSheet.create({
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
    },
});
export default SearchMain;