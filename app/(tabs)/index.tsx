import { View, Text } from 'react-native';

import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';

import className from 'twrnc';
import PlayerScreen from '@/components/PlayerScreen';

const BACKGROUND_AUDIO_TASK = 'BACKGROUND_AUDIO_TASK';

TaskManager.defineTask(BACKGROUND_AUDIO_TASK, async () => {
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
    });
});

export default function HomeScreen() {
    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
        });

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
        return () => {
            TaskManager.unregisterAllTasksAsync();
        };
    }, []);

    return (
        <View style={className`bg-[#020024] h-full p-4`}>
            <Text
                style={{
                    fontFamily: 'Iceland_400Regular',
                    fontSize: 24,
                    color: '#fff',
                }}>
                Music Player
            </Text>
            <PlayerScreen />
        </View>
    );
}
