import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ScanBarcodeScreen() {
    const router = useRouter();

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/add-device' as any);
        }
    };

    const handleCapture = () => {
        // Navigate to confirm barcode screen
        router.push('/confirm-barcode' as any);
    };

    const handleUpload = () => {
        // TODO: Implement upload from gallery
        console.log('Upload from gallery');
    };

    const handleSwitchCamera = () => {
        // TODO: Implement camera switch
        console.log('Switch camera');
    };

    const handleFlash = () => {
        // TODO: Implement flash toggle
        console.log('Toggle flash');
    };

    const handleTimer = () => {
        // TODO: Implement timer
        console.log('Toggle timer');
    };

    const handleGoHome = () => {
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="transparent" translucent />

            {/* Top Section - Dark Background */}
            <SafeAreaView style={styles.topSection} edges={['top']}>
                {/* Header Icons */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Image
                            source={require('@/assets/images/new_device/back.png')}
                            style={[styles.headerIcon, { tintColor: '#39A3FF' }]}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={handleSwitchCamera} style={styles.headerIconBtn}>
                            <Image
                                source={require('@/assets/images/new_device/refresh.png')}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTimer} style={styles.headerIconBtn}>
                            <Image
                                source={require('@/assets/images/new_device/time-line.png')}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFlash} style={styles.headerIconBtn}>
                            <Image
                                source={require('@/assets/images/new_device/flashlight.png')}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Title Text */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ảnh mã vạch:</Text>
                    <Text style={styles.subtitle}>
                        Vui lòng hãy căn chỉnh mã vạch sản phẩm của bạn sao cho{'\n'}vừa với hình vuông bên dưới!
                    </Text>
                </View>
            </SafeAreaView>

            {/* Camera Preview Section */}
            <View style={styles.cameraSection}>
                {/* Background Image */}
                <Image
                    source={require('@/assets/images/new_device/background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />

                {/* Scan Frame Overlay - Rectangle for scanning */}
                <View style={styles.scanFrameContainer}>
                    <View style={styles.scanRectangle} />
                </View>
            </View>

            {/* Bottom Controls Section */}
            <SafeAreaView style={styles.bottomSection} edges={['bottom']}>
                <View style={styles.controlsContainer}>
                    {/* Left - Avatar/Profile */}
                    <TouchableOpacity style={styles.controlBtn}>
                        <Image
                            source={require('@/assets/images/new_device/Mask group.png')}
                            style={styles.avatarIcon}
                        />
                    </TouchableOpacity>

                    {/* Center - Capture Button */}
                    <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
                        <Image
                            source={require('@/assets/images/new_device/chup.png')}
                            style={styles.captureIcon}
                        />
                    </TouchableOpacity>

                    {/* Right - Upload */}
                    <TouchableOpacity style={styles.controlBtn} onPress={handleUpload}>
                        <Image
                            source={require('@/assets/images/new_device/upload-2-line.png')}
                            style={styles.uploadIcon}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    topSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    headerIconBtn: {
        padding: 5,
    },
    headerIcon: {
        width: 28,
        height: 28,
        tintColor: '#FFFFFF',
    },
    titleContainer: {
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 20,
    },
    cameraSection: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    scanFrameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    scanRectangle: {
        width: 200,
        height: 100,
        borderWidth: 3,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        backgroundColor: 'rgba(217, 217, 217, 0.2)',
    },
    bottomSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingTop: 20,
        paddingBottom: 10,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 20,
    },
    controlBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    captureBtn: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureIcon: {
        width: 80,
        height: 80,
    },
    uploadIcon: {
        width: 40,
        height: 40,
    },
});
