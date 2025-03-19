import { View, Text } from 'react-native';
import className from 'twrnc';
import AudioList from '@/components/AudioList';
import AudioPlayer from '@/components/AudioPlayer';
import PlaylistModal from '@/components/PlaylistModal';
import useAudioFiles from '@/hooks/useAudioFiles';

const PlayerScreen = () => {
    const { audioFiles, permission } = useAudioFiles();

    if (permission === null) return <Text>Demande de permission...</Text>;
    if (!permission) return <Text>Accès refusé aux fichiers média</Text>;

    return (
        <View style={className`flex-1`}>
            <AudioList audioFiles={audioFiles} />
            <AudioPlayer audioFiles={audioFiles}/>
            <PlaylistModal audioFiles={audioFiles}/>
        </View>
    );
};

export default PlayerScreen;
