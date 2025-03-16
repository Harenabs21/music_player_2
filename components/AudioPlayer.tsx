import { Audio } from 'expo-av';
import { useState } from 'react';

const useAudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = async (uri: string) => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true }
        );

        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
            }
        });
    };

    const togglePlayPause = async () => {
        if (sound) {
            isPlaying ? await sound.pauseAsync() : await sound.playAsync();
            setIsPlaying(!isPlaying);
        }
    };

    return { playAudio, togglePlayPause, isPlaying };
};

export default useAudioPlayer;
