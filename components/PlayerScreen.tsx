import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAudioFiles from '../hooks/useAudioFiles';
import useAudioPlayer from '../hooks/useAudioPlayer';

import className from 'twrnc';

const PlayerScreen = () => {
    const { audioFiles, permission } = useAudioFiles();
    const {
        playAudio,
        togglePlayPause,
        stopAudio,
        nextAudio,
        previousAudio,
        seekAudio,
        state,
        currentTitle, // 🔥 On récupère le titre de la chanson en cours
    } = useAudioPlayer(audioFiles);

    if (permission === null) return <Text>Demande de permission...</Text>;
    if (!permission) return <Text>Accès refusé aux fichiers média</Text>;

    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <View style={className`flex-1`}>
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={className`p-2 my-2 border-[1px] border-solid border-purple-900 hover:bg-[#79299e] rounded `}
                        onPress={() => playAudio(index)}>
                        <View style={className`flex-row items-center`}>
                            <Ionicons
                                name="musical-note"
                                size={20}
                                color="#79299e"
                            />
                            <Text
                                style={{
                                    fontFamily: 'Iceland_400Regular',
                                    fontSize: 16,
                                    color: '#fff',
                                    marginLeft: 4,
                                }}>
                                {item.filename}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View
                style={className`border-[1px] border-solid border-purple-900 py-2`}>
                {currentTitle && (
                    <Text
                        style={{
                            fontFamily: 'Iceland_400Regular',
                            fontSize: 16,
                            color: '#fff',
                            textAlign: 'center',
                            paddingTop: 16,
                        }}>
                        {currentTitle}
                    </Text>
                )}

                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 6,
                        color: '#79299e',
                        fontSize: 14,
                    }}>
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

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 4,
                    }}>
                    <TouchableOpacity
                        onPress={previousAudio}
                        style={{ marginHorizontal: 20 }}>
                        <AntDesign
                            name="stepbackward"
                            size={20}
                            color="#79299e"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={togglePlayPause}
                        style={{ marginHorizontal: 14 }}>
                        <AntDesign
                            name={state.isPlaying ? 'pausecircle' : 'play'}
                            size={30}
                            color="#79299e"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={nextAudio}
                        style={{ marginHorizontal: 20 }}>
                        <AntDesign
                            name="stepforward"
                            size={20}
                            color="#79299e"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PlayerScreen;
