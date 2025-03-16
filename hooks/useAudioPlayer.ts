import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

interface AudioPlayerState {
    isPlaying: boolean;
    isLoading: boolean;
    position: number;
    duration: number;
}

const useAudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [state, setState] = useState<AudioPlayerState>({
        isPlaying: false,
        isLoading: false,
        position: 0,
        duration: 0,
    });

    // Fonction pour jouer un fichier audio
    const playAudio = async (uri: string) => {
        try {
            if (sound) {
                await sound.unloadAsync(); // Décharge l'ancien son s'il y en a un
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );

            setSound(newSound);
            setState((prev) => ({
                ...prev,
                isPlaying: true,
                isLoading: false,
            }));

            // Met à jour l'état du lecteur en fonction du fichier en cours
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setState({
                        isPlaying: status.isPlaying,
                        isLoading: false,
                        position: status.positionMillis,
                        duration: status.durationMillis || 0,
                    });
                }
            });
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier :', error);
        }
    };

    // Fonction pour mettre en pause/reprendre
    const togglePlayPause = async () => {
        if (sound) {
            if (state.isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        }
    };

    // Fonction pour arrêter la lecture
    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            setState((prev) => ({ ...prev, isPlaying: false, position: 0 }));
        }
    };

    // Nettoyer le son lorsque le composant est démonté
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return { playAudio, togglePlayPause, stopAudio, state };
};

export default useAudioPlayer;
