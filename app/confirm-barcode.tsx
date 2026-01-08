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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ConfirmBarcodeScreen() {
    const router = useRouter();

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/scan-barcode' as any);
        }
    };

    const handleRetry = () => {
        // Quay lại màn hình scan để chụp lại
        router.back();
    };

    const handleContinue = () => {
        // Navigate back to add-device with scanned data
        router.replace({
            pathname: '/add-device',
            params: {
                scannedData: JSON.stringify({
                    deviceName: 'Máy nước nóng lạnh AQUA',
                    productCode: 'NL01231AQ',
                    deviceType: 'Máy nóng lạnh trực tiếp',
                    selectedRoom: 'living-room',
                    selectedRoomLabel: 'Phòng khách',
                    description: 'Dung tích: 1,5 lít\nMàu sắc: Trắng',
                    purchaseDate: '11/11/2025',
                    warrantyExpiry: '11/11/2026',
                    maintenanceInterval: '3',
                    maintenanceIntervalLabel: '3 tháng/lần',
                    deviceStatus: 'stable'
                })
            }
        } as any);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />

            {/* Top Section - White Background */}
            <SafeAreaView style={styles.topSection} edges={['top']}>
                {/* Header - Only back button */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Image
                            source={require('@/assets/images/new_device/back.png')}
                            style={[styles.headerIcon, { tintColor: '#39A3FF' }]}
                        />
                    </TouchableOpacity>
                </View>

                {/* Title Text - Blue color */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ảnh mã vạch:</Text>
                    <Text style={styles.subtitle}>
                        Vui lòng hãy căn chỉnh mã vạch sản phẩm của bạn sao cho{'\n'}vừa với hình vuông bên dưới!
                    </Text>
                </View>
            </SafeAreaView>

            {/* Barcode Image Section */}
            <View style={styles.imageSection}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/new_device/anh_ma_vach.png')}
                        style={styles.barcodeImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Bottom Section - Buttons */}
            <SafeAreaView style={styles.bottomSection} edges={['bottom']}>
                <View style={styles.buttonContainer}>
                    {/* Thử lại Button */}
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                        <Text style={styles.retryButtonText}>Thử lại</Text>
                    </TouchableOpacity>

                    {/* Tiếp tục Button */}
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerIcon: {
        width: 32,
        height: 32,
    },
    titleContainer: {
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#39A3FF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(57, 163, 255, 0.7)',
        lineHeight: 20,
    },
    imageSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    imageContainer: {
        position: 'relative',
        width: SCREEN_WIDTH - 40,
        aspectRatio: 342 / 305,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    barcodeImage: {
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    retryButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    retryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    continueButton: {
        flex: 1,
        backgroundColor: '#39A3FF',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
