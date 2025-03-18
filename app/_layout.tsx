import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { useFonts, Iceland_400Regular } from '@expo-google-fonts/iceland';

import SplashScreenComponent from '@/components/SplashScreen'; // Import animated SplashScreen

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded, error] = useFonts({
        Iceland_400Regular,
    });

    const [isSplashVisible, setSplashVisible] = useState(true);

    useEffect(() => {
        if (loaded || error) {
            // Only start playing animation after app is fully loaded
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if ((!loaded && !error) || isSplashVisible) {
        return (
            <SplashScreenComponent onFinish={() => setSplashVisible(false)} />
        );
    }

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="+not-found" /> */}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
