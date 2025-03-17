import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

type SplashScreenProps = {
    onFinish: () => void;
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    return (
        // create a view
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                loop={false} // Ensures it runs only once
                onAnimationFinish={onFinish} // Hide splash when animation completes
                style={{ width: 300, height: 300 }}
                source={require('@/assets/lottie/musicplayer.json')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#020024',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
