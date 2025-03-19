import { View } from 'react-native';
import className from 'twrnc';
import PlayerScreen from '@/components/PlayerScreen';

export default function HomeScreen() {
    return (
        <View style={className`bg-[#020024] h-full p-4`}>
            <PlayerScreen />
        </View>
    );
}