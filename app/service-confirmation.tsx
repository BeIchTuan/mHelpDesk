import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for confirmation
const DEVICE_INFO = {
  name: 'TỦ LẠNH AQUA INVERTER',
  productCode: 'AQR-IG525AM',
  type: 'Multi Door - 4 cánh',
  capacity: '512 lit',
  color: 'Đen',
  warrantyInfo: '21/10/2024 - 21/10/2025'
};

const REPAIR_COSTS = [
  { item: 'Số nóng lạnh 12VDC 6A hiệu OEM', cost: '800.000đ' },
  { item: 'Phí bảo dưỡng định kỳ lần 2', cost: '200.000đ' },
  { item: 'Phí dịch vụ', cost: '30.000đ' },
];

const SELECTED_STORE = {
  name: 'ĐẠI LÝ MINH MẪN',
  type: 'Online 5 phút trước',
  description: 'Chuyên mua bán, bảo dưỡng sửa chữa thiết bị điện gia đình',
  address: 'Thủ Đức, TP. Hồ Chí Minh',
  hotline: '0312 456 789',
  rating: '4.8/5.0'
};

export default function ServiceConfirmationScreen() {
  const router = useRouter();
  const { maintenanceId, selectedStore } = useLocalSearchParams<{ 
    maintenanceId: string;
    selectedStore: string;
  }>();

  const sectionStyle = {
    backgroundColor: '#FFFAF6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  };

  const totalCost = REPAIR_COSTS.reduce((sum, cost) => {
    const numericCost = parseInt(cost.cost.replace(/[^\d]/g, ''));
    return sum + numericCost;
  }, 0);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#EDF7FF]" edges={['top']}>
        <StatusBar style="dark" backgroundColor="#EDF7FF" />
      
        {/* Header */}
        <View className="bg-[#EDF7FF] px-5 pt-2 pb-4 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('@/assets/images/arrow circle left.png')}
              style={{ width: 32, height: 32, tintColor: '#4BA8F5' }}
            />
          </TouchableOpacity>
          <Text className="flex-1 text-lg font-bold text-[#39A3FF] text-center uppercase">CHI TIẾT SỬA CHỮA</Text>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <Image
              source={require('@/assets/images/home.png')}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Booking Summary */}
          <View style={sectionStyle}>
            <View className="flex-row items-start">
              {/* Left side - Date section */}
              <View className="relative mr-4">
                <View className="bg-[#EDF7FF] rounded-xl p-3 items-center">
                  <Text className="text-2xl font-bold text-[#39A3FF]">10</Text>
                  <Text className="text-xs text-[#666666]">Tháng 1</Text>
                </View>
                {/* Status Icon */}
                <Image 
                  source={require('@/assets/images/so_tay_ezcare/chua_dat_lich.png')}
                  className="absolute -bottom-1 right-1 w-4 h-4"
                  resizeMode="contain"
                />
              </View>

              {/* Right side - Booking details */}
              <View className="flex-1">
                <Text className="text-sm text-[#666666] mb-1">
                  Khung giờ sửa: <Text className="text-[#39A3FF] font-medium">15:00 - 16:30</Text>
                </Text>
                <Text className="text-sm text-[#666666] mb-1">
                  Ghi chú: <Text className="text-[#39A3FF] font-medium">Không có</Text>
                </Text>
                <Text className="text-sm text-[#666666]">
                  Địa chỉ: <Text className="text-[#39A3FF] font-medium">16/A7, đường Lĩnh Xuân, TP Thủ Đức, TP. HCM</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Device Information */}
          <View style={sectionStyle}>
            <View className="flex-row">
              <View className="w-24 h-32 rounded-xl overflow-hidden bg-gray-50 mr-4">
                <Image 
                  source={require('@/assets/images/tu-lanh.png')} 
                  style={{ width: 96, height: 128 }}
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#39A3FF] mb-2">{DEVICE_INFO.name}</Text>
                <Text className="text-xs text-[#666666] mb-1">
                  Mã sản phẩm: {DEVICE_INFO.productCode}
                </Text>
                <Text className="text-xs text-[#666666] mb-1">
                  Loại máy: {DEVICE_INFO.type}
                </Text>
                <Text className="text-xs text-[#666666] mb-1">
                  Dung tích: {DEVICE_INFO.capacity}
                </Text>
                <Text className="text-xs text-[#666666] mb-1">
                  Màu sắc: {DEVICE_INFO.color}
                </Text>
                <Text className="text-xs text-[#666666]">
                  Thông tin bảo hành: {DEVICE_INFO.warrantyInfo}
                </Text>
              </View>
            </View>
          </View>

          {/* Repair Costs */}
          <View style={sectionStyle}>
            <Text className="text-base font-bold text-[#39A3FF] mb-4">CHI PHÍ SỬA CHỮA</Text>
            
            {REPAIR_COSTS.map((cost, index) => (
              <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="flex-1 text-sm text-[#666666]">{cost.item}</Text>
                <Text className="text-sm text-[#666666] font-semibold">{cost.cost}</Text>
              </View>
            ))}
            
            <View className="flex-row justify-between items-center py-3 mt-2">
              <Text className="text-base font-bold text-[#FF9149]">Tổng cộng</Text>
              <Text className="text-base font-bold text-[#FF9149]">
                1.030.000đ
              </Text>
            </View>
          </View>

          {/* Selected Store Information */}
          <View style={sectionStyle}>
            <View className="flex-row items-start justify-between">
              {/* Store info */}
              <View className="flex-row items-start flex-1">
                <View className="mr-3 mt-1">
                  <Image
                    source={require('@/assets/images/so_tay_ezcare/dai_ly.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-[#39A3FF] mb-1">{SELECTED_STORE.name}</Text>
                  <Text className="text-xs text-[#666666] mb-2">{SELECTED_STORE.type}</Text>
                  <Text className="text-xs text-[#666666] mb-3 leading-4">
                    {SELECTED_STORE.description}
                  </Text>
                  
                  <View className="space-y-2">
                    <View className="flex-row items-start">
                      <Text className="text-xs text-[#666666] w-16">Địa chỉ:</Text>
                      <Text className="text-xs text-[#39A3FF] flex-1">{SELECTED_STORE.address}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xs text-[#666666] w-16">Hotline:</Text>
                      <Text className="text-xs text-[#39A3FF] font-medium">{SELECTED_STORE.hotline}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xs text-[#666666] w-16">Đánh giá:</Text>
                      <View className="flex-row items-center">
                        <Text className="text-xs text-[#39A3FF] mr-1">{SELECTED_STORE.rating}</Text>
                        <MaterialIcons name="star" size={12} color="#FFD700" />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Message button */}
              <TouchableOpacity className="border border-[#FF9149] rounded-lg px-4 py-2 ml-3">
                <Text className="text-[#FF9149] text-xs font-bold">Nhận tin</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity className="bg-[#39A3FF] rounded-lg py-4 mt-4">
            <Text className="text-white text-center font-bold text-base">Xác nhận đặt dịch vụ</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
