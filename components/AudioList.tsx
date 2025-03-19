import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import className from 'twrnc';
import useAudioPlayer from '@/hooks/useAudioPlayer';

const AudioList = ({ audioFiles }: { audioFiles: any[] }) => {
    const { playAudio } = useAudioPlayer(audioFiles);

    return (
        <FlatList
            data={audioFiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={className`p-2 my-2 border-[1px] border-solid border-purple-900 hover:bg-[#79299e] rounded`}
                    onPress={() => playAudio(index)}>
                    <View style={className`flex-row items-center`}>
                        <Ionicons name="musical-note" size={20} color="#79299e" />
                        <Text style={className`text-white ml-2 text-base`}>
                            {item.filename}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default AudioList;
