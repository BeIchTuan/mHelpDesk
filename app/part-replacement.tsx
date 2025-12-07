import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#39A3FF',
  secondary: '#B0D4F2',
  background: '#FFFFFF',
  cardBg: '#FFFAF6',
  highlight: '#FF9149',
  text: '#666666',
  white: '#FFFFFF',
  warning: '#F9A825',
  error: '#D33636',
};

// Mock data linh kiện cần thay thế
const partData = {
  name: 'Sò nóng lạnh',
  device: 'Tủ lạnh AQUA INVERTER',
  warningText: 'Tủ lạnh AQUA INVERTER cần thay thế phụ tùng - Sò nóng sau 36 tháng sử dụng!!',
  description: 'Sò nóng lạnh (thermistor) là cảm biến giúp tủ lạnh đo và kiểm soát nhiệt độ dàn lạnh. Tuy nhỏ nhung đây là linh kiện quyết định tủ có làm lạnh ổn định hay không.',
  reasons: [
    'Không lạnh sâu, ngăn mát yếu',
    'Đóng tuyết dày, nghẹt gió lạnh',
    'Xả đá sai chu kỳ, lúc thì xả quá nhiều, lúc lại không xả',
    'Tốn điện, vì block chạy liên tục',
    'Nguy cơ hư bo mạch, do nhận tín hiệu sai',
    'Giảm tuổi thọ tủ lạnh, dễ phát sinh lỗi dây chuyền',
  ],
};

export default function PartReplacementScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/my-items');
    }
  };

  const handleBuyNew = () => {
    router.push('/buy-new-item' as any);
  };

  const handleBookService = () => {
    // TODO: Navigate to service booking
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.headerBackBtn}>
            <View style={styles.headerBackCircle}>
              <Image
                source={require('@/assets/images/Vector.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>THAY THẾ LINH KIỆN</Text>

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/my-items')}
            style={styles.headerHomeBtn}
          >
            <Image
              source={require('@/assets/images/home.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content Card */}
          <View style={styles.mainCard}>
            {/* Warning Text */}
            <Text style={styles.warningText}>{partData.warningText}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Mô tả linh kiện */}
            <Text style={styles.sectionTitle}>MÔ TẢ LINH KIỆN</Text>
            <Text style={styles.descriptionText}>{partData.description}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Tại sao nên thay thế */}
            <Text style={styles.sectionTitle}>TẠI SAO NÊN THAY THẾ?</Text>
            <Text style={styles.reasonIntro}>Nếu sò nóng lạnh hư và không thay kịp thời sẽ gây ra:</Text>
            {partData.reasons.map((reason, index) => (
              <View key={index} style={styles.reasonRow}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.buyNewButton} onPress={handleBuyNew}>
                <Text style={styles.buyNewButtonText}>Mua mới</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bookServiceButton} onPress={handleBookService}>
                <Text style={styles.bookServiceButtonText}>Đặt dịch vụ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  headerBackBtn: {},
  headerBackCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    flex: 1,
  },
  headerHomeBtn: {},

  mainCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  warningText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.highlight,
    lineHeight: 22,
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
  },

  descriptionText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },

  reasonIntro: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 8,
  },

  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 8,
    lineHeight: 20,
  },
  reasonText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },

  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  buyNewButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.highlight,
    borderRadius: 20,
    paddingVertical: 12,
  },
  buyNewButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  bookServiceButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 12,
  },
  bookServiceButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});
