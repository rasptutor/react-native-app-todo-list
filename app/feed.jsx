import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useRouter } from "expo-router";

const videoSource = 
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


export default function FeedScreen() {
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const router = useRouter()
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
      });
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const [loaded, error] = useFonts({
        Inter_500Medium,
    })

    if (!loaded && !error) {
        return null
    }

    const styles = createStyles(theme, colorScheme)   
        
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                <View style={styles.controlsContainer}>
                    <Button
                    title={isPlaying ? 'Pause' : 'Play'}
                    onPress={() => {
                        if (isPlaying) {
                        player.pause();
                        } else {
                        player.play();
                        }
                    }}
                    />
                </View>
            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background,
        },        
        contentContainer: {
            flex: 1,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 50,
        },
        video: {
            width: 350,
            height: 275,
        },
        controlsContainer: {
            padding: 10,
        },
    })
}