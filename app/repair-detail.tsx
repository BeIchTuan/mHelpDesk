import ChevronStepper from '@/components/maintenance/ChevronStepper';
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

// Mock data for maintenance details
const MAINTENANCE_DETAILS = {
  '1': {
    id: '1',
    day: '21',
    month: 'Tháng 1',
    title: 'Tủ lạnh AQUA Inverter',
    description: 'Bảo dưỡng định kỳ lần 2, thay linh kiện Số nóng lạnh',
    price: '1.000.000đ',
    status: 'unscheduled',
    deviceInfo: {
      productCode: 'AQR-IG525AM',
      type: 'Multi Door - 4 cánh',
      capacity: '512 lit',
      color: 'Đen',
      warrantyInfo: '21/10/2024 - 21/10/2025'
    },
    repairCosts: [
      { item: 'Số nóng lạnh 12VDC 6A hiệu OEM', cost: '800.000đ' },
      { item: 'Phí bảo dưỡng định kỳ lần 2', cost: '200.000đ' },
      { item: 'Phí dịch vụ', cost: '0đ' },
    ],
    totalCost: '1.000.000đ',
    maintenanceSchedule: [
      { level: 1, status: 'done', checkDate: '21/4/2024' },
      { level: 2, status: 'upcoming', checkDate: '21/1/2025' },
      { level: 3, status: 'pending' },
      { level: 4, status: 'pending' },
      { level: 5, status: 'pending' },
      { level: 6, status: 'pending' },
    ]
  }
};

export default function RepairDetailScreen() {
  const router = useRouter();
  const { maintenanceId } = useLocalSearchParams<{ maintenanceId: string }>();
  
  const maintenance = MAINTENANCE_DETAILS[maintenanceId as keyof typeof MAINTENANCE_DETAILS];

  if (!maintenance) {
    return (
      <SafeAreaView className="flex-1 bg-[#EDF7FF]">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-[#666666]">Không tìm thấy thông tin sửa chữa</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusIcon = () => {
    switch (maintenance.status) {
      case 'unscheduled': return require('@/assets/images/so_tay_ezcare/chua_dat_lich.png');
      case 'scheduled': return require('@/assets/images/so_tay_ezcare/da_dat_lich.png');
      case 'completed': return require('@/assets/images/so_tay_ezcare/hoan_tat.png');
      default: return require('@/assets/images/so_tay_ezcare/chua_dat_lich.png');
    }
  };

  // Section card style
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
        {/* Status Card */}
        <View style={sectionStyle}>
          <View className="flex-row items-start">
            {/* Left side - Date section */}
            <View className="relative mr-4">
              <View className="bg-[#EDF7FF] rounded-xl p-3 items-center">
                <Text className="text-2xl font-bold text-[#39A3FF]">{maintenance.day}</Text>
                <Text className="text-xs text-[#666666]">{maintenance.month}</Text>
              </View>
              {/* Status Icon ở góc dưới bên phải của section ngày tháng */}
              <Image 
                source={getStatusIcon()}
                className="absolute -bottom-1 right-1 w-4 h-4"
                resizeMode="contain"
              />
            </View>

            {/* Right side - Description + Button stacked vertically */}
            <View className="flex-1">
              <Text className="text-sm text-[#666666] mb-3 font-bold italic">Vật dụng chưa được đặt lịch sửa chữa bạn ơi!</Text>
              <TouchableOpacity 
                className="bg-[#39A3FF] rounded-lg py-3 px-4"
                onPress={() => router.push(`/book-service?maintenanceId=${maintenance.id}`)}
              >
                <Text className="text-white text-center font-bold text-sm">Đặt dịch vụ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Device Info Card */}
        <View style={sectionStyle}>
          <View className="flex-row">
            <View className="w-24 h-28 rounded-xl overflow-hidden bg-gray-50 mr-4">
              <Image 
                source={require('@/assets/images/tu-lanh.png')} 
                style={{ width: 96, height: 112 }}
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#39A3FF] mb-2">{maintenance.title}</Text>
              <Text className="text-xs text-[#666666] mb-1">Mã sản phẩm: {maintenance.deviceInfo.productCode}</Text>
              <Text className="text-xs text-[#666666] mb-1">Loại máy: {maintenance.deviceInfo.type}</Text>
              <Text className="text-xs text-[#666666] mb-1">Dung tích: {maintenance.deviceInfo.capacity}</Text>
              <Text className="text-xs text-[#666666] mb-1">Màu sắc: {maintenance.deviceInfo.color}</Text>
              <Text className="text-xs text-[#666666]">
                Thông tin bảo hành: {maintenance.deviceInfo.warrantyInfo}
              </Text>
            </View>
          </View>
        </View>

        {/* Repair Costs Card */}
        <View style={sectionStyle}>
          <Text className="text-base font-bold text-[#39A3FF] mb-4">CHI PHÍ SỬA CHỮA</Text>
          
          {maintenance.repairCosts.map((cost, index) => (
            <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="flex-1 text-sm text-[#666666]">{cost.item}</Text>
              <Text className="text-sm text-[#666666] font-semibold">{cost.cost}</Text>
            </View>
          ))}
          
          <View className="flex-row justify-between items-center py-3 mt-2">
            <Text className="text-base font-bold text-[#FF9149]">Tổng cộng</Text>
            <Text className="text-base font-bold text-[#FF9149]">{maintenance.totalCost}</Text>
          </View>
        </View>

        {/* Maintenance Schedule Card */}
        <View style={sectionStyle}>
          <Text className="text-base font-bold text-[#39A3FF] mb-4">THÔNG TIN KIỂM TRA ĐỊNH KỲ</Text>
          
          {/* Chevron Stepper */}
          <View className="mb-4">
            <ChevronStepper 
              totalSteps={6} 
              currentStep={maintenance.maintenanceSchedule.filter(m => m.status === 'done').length || 1} 
            />
          </View>

          {/* Status Legend */}
          <View className="flex-row justify-around py-2 border-t border-gray-200 mb-4">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#4CAF50] mr-1.5" />
              <Text className="text-xs text-[#666666]">Đúng hạn</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#F44336] mr-1.5" />
              <Text className="text-xs text-[#666666]">Quá hạn</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-gray-300 mr-1.5" />
              <Text className="text-xs text-[#666666]">Lần kế tiếp</Text>
            </View>
          </View>

          {/* Maintenance Dates với border line */}
          {maintenance.maintenanceSchedule[1] && (
            <View className="mb-4">
              <View className="flex-row justify-between items-center py-2.5 border-b border-gray-200">
                <Text className="flex-1 text-xs text-[#666666]">
                  Ngày kiểm tra định kỳ gần nhất (Lần {maintenance.maintenanceSchedule[1].level}):
                </Text>
                <Text className="text-xs text-[#666666] font-semibold ml-2">
                  {maintenance.maintenanceSchedule[1].checkDate}
                </Text>
              </View>
              <View className="flex-row justify-between items-center py-2.5 border-b border-gray-200">
                <Text className="flex-1 text-xs text-[#666666]">
                  Ngày kiểm tra định kỳ kế tiếp (Lần 3):
                </Text>
                <Text className="text-xs text-[#666666] font-semibold ml-2">21/4/2025</Text>
              </View>
            </View>
          )}

          <TouchableOpacity className="self-end">
            <Text className="text-xs text-[#666666] underline">? Lợi ích kiểm tra định kỳ</Text>
          </TouchableOpacity>
        </View>

        {/* Parts Replacement Reminder */}
        <View style={sectionStyle}>
          <Text className="text-base font-bold text-[#39A3FF] mb-3">NHẮC NHỞ THAY THẾ LINH KIỆN</Text>
          <TouchableOpacity className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/warning.png')}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              <Text className="text-sm text-[#666666]">Số nóng lạnh</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Repair History */}
        <View style={sectionStyle}>
          <TouchableOpacity className="flex-row justify-between items-center">
            <Text className="text-base font-bold text-[#39A3FF]">LỊCH SỬ SỬA CHỮA</Text>
            <MaterialIcons 
              name="add" 
              size={24} 
              color="#39A3FF" 
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
