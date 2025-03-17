import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function useAudioPlayer(audioFiles: any[]) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [currentTitle, setCurrentTitle] = useState<string | null>(null); // 🔥 Ajout du titre en cours
    const [isFirstPlay, setIsFirstPlay] = useState(true);
    const [state, setState] = useState({
        isPlaying: false,
        position: 0,
        duration: 1,
    });

    // Charger et jouer un son par index
    const loadAndPlayAudio = async (index: number) => {
        if (index < 0 || index >= audioFiles.length) return;

        const file = audioFiles[index];

        if (sound) {
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: file.uri },
            { shouldPlay: true }
        );

        newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                setState({
                    isPlaying: status.isPlaying,
                    position: status.positionMillis,
                    duration: status.durationMillis || 1,
                });

                if (status.didJustFinish) {
                    nextAudio();
                }
            }
        });

        setSound(newSound);
        setCurrentIndex(index);
        setCurrentTitle(file.filename); // 🔥 Met à jour le titre affiché
        setIsFirstPlay(false);
    };

    // 🎵 Gérer Play / Pause
    const togglePlayPause = async () => {
        if (!sound) {
            if (isFirstPlay && audioFiles.length > 0) {
                loadAndPlayAudio(0); // ✅ Lire la première chanson si l'utilisateur appuie sur Play sans choisir
            }
            return;
        }

        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
            status.isPlaying
                ? await sound.pauseAsync()
                : await sound.playAsync();
        }
    };

    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            setState({
                isPlaying: false,
                position: 0,
                duration: state.duration,
            });
        }
    };

    const nextAudio = () => {
        if (currentIndex === null) return;
        const nextIndex = (currentIndex + 1) % audioFiles.length;
        loadAndPlayAudio(nextIndex);
    };

    const previousAudio = () => {
        if (currentIndex === null) return;
        const prevIndex =
            (currentIndex - 1 + audioFiles.length) % audioFiles.length;
        loadAndPlayAudio(prevIndex);
    };

    const seekAudio = async (position: number) => {
        if (sound) {
            await sound.setPositionAsync(position);
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return {
        playAudio: loadAndPlayAudio,
        togglePlayPause,
        stopAudio,
        nextAudio,
        previousAudio,
        seekAudio,
        state,
        currentTitle, // 🔥 On retourne le titre
    };
}
