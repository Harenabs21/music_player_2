import { View, Text } from 'react-native';
import className from 'twrnc';
import AudioList from '@/components/AudioList';
import AudioPlayer from '@/components/AudioPlayer';
import PlaylistModal from '@/components/PlaylistModal';
import useAudioFiles from '@/hooks/useAudioFiles';
import useAudioPlayer from '@/hooks/useAudioPlayer';

const PlayerScreen = () => {
    const { audioFiles, permission } = useAudioFiles();
    const {
        playAudio,
        togglePlayPause,
        nextAudio,
        previousAudio,
        seekAudio,
        state,
        currentTitle,
        currentIndex,
    } = useAudioPlayer(audioFiles);

    if (permission === null) return <Text>Demande de permission...</Text>;
    if (!permission) return <Text>Accès refusé aux fichiers média</Text>;

    return (
        <View style={className`flex-1`}>
            <AudioList audioFiles={audioFiles} playAudio={playAudio} />
            <AudioPlayer togglePlayPause={togglePlayPause} previousAudio={previousAudio} nextAudio={nextAudio} seekAudio={seekAudio} state={state} currentTitle={currentTitle}/>
            <PlaylistModal audioFiles={audioFiles} state={state} currentIndex={currentIndex} currentTitle={currentTitle}/>
        </View>
    );
};

export default PlayerScreen;
