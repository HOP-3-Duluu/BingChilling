import {Image, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {t} from '../../utils/style';
import {useState} from 'react';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useUserCont } from '../../contexts/userCont';

export const Profile = ({navigation}: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const user = useUserCont();

  return (
    <View style={[t`w-full h-full bg-white items-center`]}>
      <View style={[t`w-[340px]`]}>
        <View style={[t`flex items-center mt-[60px] w-[340px]`]}>
          <View style={[t`w-full h-[29px] flex-row justify-between`]}>
            <Text style={[t`font-bold	text-[24px]`]}>Profile</Text>
            <Icon name="ellipsis-horizontal-circle" size={25} />
          </View>
          <Image
            style={[t`h-[140px] w-[140px] rounded-[100px] flex items-center`]}
            source={{uri: user?.user?.photo?.S}}
          />
          <Text style={[t`font-bold	text-[24px] mt-[12px]`]}>{user?.user?.name?.S}</Text>
          <Text style={[t`text-[14px] mt-[12px]`]}>{user?.user?.email?.S}</Text>
        </View>
        <View
          style={[t`w-full border-[1px] h-[1px] border-[#EEEEEE] mt-[24px]`]}
        />
        <View style={[t`w-full h-[364px] flex-col justify-between mt-[24px]`]}>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}
            onPress={() => {navigation.navigate('EditProfile')}}
            >
            <Icon name="person-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}>
            <Icon name="md-wallet-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}>
            <Icon name="notifications-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}>
            <Icon name="shield-checkmark-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}
            onPress={() => {
              navigation.navigate('Help');
            }}
            >
            <Icon name="md-help-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}>
            <Icon name="eye-outline" size={28} />
            <Text style={[t`text-[18px] w-[324px]`]}>Dark Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              t`flex w-[364px] items-center h-[28px] flex-row justify-between`,
            ]}
            onPress={() => {
              setVisible(true);
              navigation.setOptions({
                tabBarStyle: {display: 'none'},
              });
            }}>
            <Icon name="md-exit-outline" color="#F75555" size={28} />
            <Text style={[t`text-[18px] text-[#F75555] w-[324px]`]}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={visible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}>
        <View style={[t`w-full h-full flex justify-end`]}>
          <View
            style={[
              t`rounded-[40px] w-full h-[336px] border-white bg-white flex items-center justify-evenly`,
            ]}>
            <Text style={[t`text-[#F75555] text-[24px] font-bold`]}>
              Log out
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.setOptions({
                  tabBarStyle: {display: 'flex'},
                });
              }}>
            </TouchableOpacity>
            <Text style={[t`text-[18px]`]}>Are you sure you want to log out?</Text>
            <View style={[t`justify-end items-center`]}>
                <TouchableOpacity
                  style={[
                    t`bg-[#9C9FF0] w-[320px] h-[58px] rounded-[10px] flex items-center justify-center`,
                  ]}
                  onPress={() => {
                    setVisible(false);
                    navigation.setOptions({
                      tabBarStyle: {display: 'flex'},
                    });
                    }}>
                  <Text style={[t`text-white`]}>Log out</Text>
                </TouchableOpacity>
              </View>
              <View style={[t` justify-end items-center`]}>
                <TouchableOpacity
                  style={[
                    t`bg-[#EDEFFF] w-[320px] h-[58px] rounded-[10px] flex items-center justify-center`,
                  ]}
                  onPress={() => {
                    setVisible(false);
                    navigation.setOptions({
                      tabBarStyle: {display: 'flex'},
                    });
                  }}>
                  <Text style={[t`text-[#4448AE]`]}>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
