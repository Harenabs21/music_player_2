import { View, Text, Button, FlatList } from 'react-native';
import useAudioFiles from '../hooks/useAudioFiles';
import useAudioPlayer from '../hooks/useAudioPlayer';

import className from 'twrnc';

const PlayerScreen = () => {
    const { audioFiles, permission } = useAudioFiles();
    const { playAudio, togglePlayPause, stopAudio, state } = useAudioPlayer();

    if (permission === null) return <Text>Demande de permission...</Text>;
    if (!permission) return <Text>Accès refusé aux fichiers média</Text>;

    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, '0')}`; // Assure un format 0:00
    };

    return (
        <View>
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Button
                        title={item.filename}
                        onPress={() => playAudio(item.uri)}
                    />
                )}
            />
            <Text style={className`text-white`}>
                {formatTime(state.position)} / {formatTime(state.duration)}
            </Text>

            <Button
                title={state.isPlaying ? 'Pause' : 'Lecture'}
                onPress={togglePlayPause}
            />
            <Button title="Arrêter" onPress={stopAudio} />
        </View>
    );
};

export default PlayerScreen;
