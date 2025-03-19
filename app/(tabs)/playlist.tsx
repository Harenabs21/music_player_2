import PlaylistScreen from '@/components/PlaylistSreen';
import { Text, View } from 'react-native';
import className from 'twrnc';

export default function Playlist() {
  return (
    <View style={className`bg-[#020024] h-full p-4`}>
      <View className="flex-1 items-center justify-center">
        <Text style={[className`text-white text-lg`, { fontFamily: 'Iceland_400Regular' }]}>
          Hello, This is the Playlist screen!
        </Text>
      </View>
      <PlaylistScreen />
    </View>
  );
}
