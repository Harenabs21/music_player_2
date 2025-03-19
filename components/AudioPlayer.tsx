import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import className from 'twrnc';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { formatTime } from '@/helpers/format';

const AudioPlayer = ({ audioFiles }: { audioFiles: any[] }) => {
    const { togglePlayPause, previousAudio, nextAudio, seekAudio, state, currentTitle } = useAudioPlayer(audioFiles);



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
