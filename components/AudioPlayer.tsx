import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import className from 'twrnc';
import { formatTime } from '@/helpers/format';

interface AudioPlayerProps {
    togglePlayPause: () => void;
    previousAudio: () => void;
    nextAudio: () => void;
    state: {
        isPlaying: boolean;
        position: number;
        duration: number;
    };
    seekAudio: (position: number) => Promise<void>;
    currentTitle: string | null;
}

const AudioPlayer = ({ togglePlayPause, previousAudio, nextAudio, seekAudio, state, currentTitle }: AudioPlayerProps) => {
    



    return (
        <View style={className`border-[1px] border-solid border-purple-900 py-4`}>
            {currentTitle && (
                <Text style={className`text-white text-center text-lg`}>
                    {currentTitle}
                </Text>
            )}
            <Text style={className`text-purple-500 text-center mt-2 text-sm`}>
                {formatTime(state.position)} / {formatTime(state.duration)}
            </Text>
            <Slider
                style={{ width: '100%', height: 30 }}
                minimumValue={0}
                maximumValue={state.duration}
                value={state.position}
                minimumTrackTintColor="#79299e"
                maximumTrackTintColor="gray"
                thumbTintColor="#79299e"
                onSlidingComplete={(value) => seekAudio(value)}
            />
            <View style={className`flex-row justify-center items-center mt-4`}>
                <TouchableOpacity onPress={previousAudio} style={className`mx-4`}>
                    <AntDesign name="stepbackward" size={20} color="#79299e" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause} style={className`mx-4`}>
                    <AntDesign name={state.isPlaying ? 'pausecircle' : 'play'} size={30} color="#79299e" />
                </TouchableOpacity>
                <TouchableOpacity onPress={nextAudio} style={className`mx-4`}>
                    <AntDesign name="stepforward" size={20} color="#79299e" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AudioPlayer;
