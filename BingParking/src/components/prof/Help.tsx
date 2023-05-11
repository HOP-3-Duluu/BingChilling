import {Text, View} from 'react-native';
import {t} from '../../utils/style';

export const Help = () => {
  return (
      <View style={[t`w-full h-full bg-black flex items-center justify-center`]}>
        <Text style={[t`text-[40px] font-bold text-[#8b0000]`]}>There is no help.</Text>
        <Text style={[t`text-[40px] font-bold text-[#8b0000]`]}>Only suffering.</Text>
      </View>
  );
};

export default Help;
