import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#020024',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontFamily: 'Iceland_400Regular',
                },
            }}
            tabBar={(props) => (TabBar as any)({ ...props })}>
            <Tabs.Screen name="index" options={{ title: 'Library' }} />
            <Tabs.Screen name="playlist" options={{ title: 'Playlists' }} />
        </Tabs>
    );
}
