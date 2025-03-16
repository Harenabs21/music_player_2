import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const AudioList = () => {
    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions();

    useEffect(() => {
        const fetchAudioFiles = async () => {
            if (permissionResponse?.granted) {
                const media = await MediaLibrary.getAssetsAsync({
                    mediaType: 'audio',
                    first: 50, // Limiter à 50 fichiers pour éviter de surcharger la liste
                });
                setAudioFiles(media.assets);
            }
        };

        fetchAudioFiles();
    }, [permissionResponse]);

    return (
        <View>
            {!permissionResponse?.granted && (
                <Button
                    title="Autoriser l'accès aux fichiers"
                    onPress={requestPermission}
                />
            )}
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.filename}</Text>}
            />
        </View>
    );
};

export default AudioList;
