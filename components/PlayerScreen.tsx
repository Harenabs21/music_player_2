import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAudioFiles from '../hooks/useAudioFiles';
import useAudioPlayer from '../hooks/useAudioPlayer';
import usePlaylist from '../hooks/usePlaylist';
import { useState } from 'react';

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
        currentTitle,
        currentIndex,
    } = useAudioPlayer(audioFiles);

    const { addTrackToPlaylist, playlists } = usePlaylist(); // ✅ Récupérer les playlists existantes
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
        null
    );
    const [isModalVisible, setModalVisible] = useState(false);

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
                style={className`border-[1px] border-solid border-purple-900 py-4`}>
                {currentTitle && (
                    <Text
                        style={{
                            fontFamily: 'Iceland_400Regular',
                            fontSize: 16,
                            color: '#fff',
                            textAlign: 'center',
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
            <View>
                {/* 🎵 Bouton pour afficher les playlists */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#79299e',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                    onPress={() => setModalVisible(true)}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        Choisir une Playlist
                    </Text>
                </TouchableOpacity>

                {/* 🎧 Ajouter à la Playlist Sélectionnée */}
                {selectedPlaylistId !== null && currentIndex !== null && (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4CAF50',
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 10,
                        }}
                        onPress={() => {
                            if (currentTitle && state.isPlaying) {
                                addTrackToPlaylist(
                                    selectedPlaylistId,
                                    audioFiles[currentIndex].uri, // ✅ currentIndex est maintenant disponible
                                    currentTitle
                                );
                                alert('Ajouté à la playlist !');
                            }
                        }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>
                            Ajouter à la Playlist
                        </Text>
                    </TouchableOpacity>
                )}

                {/* 📜 Modal pour afficher la liste des playlists */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide">
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                backgroundColor: '#222',
                                padding: 20,
                                borderRadius: 10,
                                margin: 20,
                            }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    marginBottom: 10,
                                }}>
                                Sélectionne une Playlist :
                            </Text>
                            <FlatList
                                data={playlists}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            backgroundColor: '#444',
                                            marginVertical: 5,
                                            borderRadius: 5,
                                        }}
                                        onPress={() => {
                                            setSelectedPlaylistId(item.id);
                                            setModalVisible(false);
                                        }}>
                                        <Text style={{ color: '#fff' }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    padding: 10,
                                    backgroundColor: 'red',
                                    borderRadius: 5,
                                }}
                                onPress={() => setModalVisible(false)}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        textAlign: 'center',
                                    }}>
                                    Fermer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default PlayerScreen;
