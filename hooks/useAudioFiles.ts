import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

const useAudioFiles = () => {
    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
    const [permission, setPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const getAudioFiles = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setPermission(status === 'granted');

            if (status === 'granted') {
                const media = await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.audio,
                });
                setAudioFiles(
                    media.assets.filter((file) =>
                        file.filename.endsWith('.mp3')
                    )
                );
            }
        };

        getAudioFiles();
    }, []);

    return { audioFiles, permission };
};

export default useAudioFiles;
