import ChevronStepper from '@/components/maintenance/ChevronStepper';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Time slots cho case có đại lý sẵn
const TIME_SLOTS = [
  '9:00 - 10:30',
  '13:00 - 14:30',
  '15:00 - 16:30'
];

// Mock data for assigned stores
const ASSIGNED_STORES: Record<string, {
  id: string;
  name: string;
  onlineStatus: string;
  description: string;
  location: string;
  hotline: string;
  rating: number;
  note: string;
}> = {
  '1': {
    id: '1',
    name: 'ĐẠI LÝ MINH MẪN',
    onlineStatus: 'Online 5 phút trước',
    description: 'Chuyên mua bán, bảo dưỡng sửa chữa thiết bị điện máy, điện gia dụng',
    location: 'Thủ Đức, TP. Hồ Chí Minh',
    hotline: '0312 456 789',
    rating: 4.8,
    note: 'Nơi mua hàng Máy lạnh LG Inverter, phụ trách bảo dưỡng lần I, II của thiết bị',
  }
};

// Mock data for maintenance details
const MAINTENANCE_DETAILS: Record<string, {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  price: string;
  status: 'unscheduled' | 'scheduled' | 'completed';
  hasAssignedStore: boolean;
  assignedStoreId?: string;
  // Thông tin đã đặt lịch sẵn (cho case status = 'scheduled')
  bookedTimeSlot?: string;
  bookedNotes?: string;
  deviceInfo: {
    productCode: string;
    type: string;
    capacity?: string;
    color: string;
    warrantyInfo: string;
  };
  repairCosts: Array<{ item: string; cost: string }>;
  totalCost: string;
  maintenanceSchedule?: Array<{
    level: number;
    status: 'done' | 'upcoming' | 'pending';
    checkDate?: string;
  }>;
  deviceImage?: any;
}> = {
  '1': {
    id: '1',
    day: '21',
    month: 'Tháng 1',
    title: 'Tủ lạnh AQUA Inverter',
    description: 'Bảo dưỡng định kỳ lần 2, thay linh kiện Số nóng lạnh',
    price: '1.000.000đ',
    status: 'unscheduled',
    hasAssignedStore: false,
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
  },
  '2': {
    id: '2',
    day: '18',
    month: 'Tháng 1',
    title: 'MÁY LẠNH LG INVERTER',
    description: 'Bảo dưỡng định kỳ lần 2 kiểm vệ sinh máy',
    price: '200.000đ',
    status: 'unscheduled',
    hasAssignedStore: true,
    assignedStoreId: '1',
    deviceInfo: {
      productCode: '2.5HP-V24END',
      type: '1 chiều 2.5HP',
      color: 'Trắng',
      warrantyInfo: '3/1/2024 - 3/1/2026'
    },
    repairCosts: [
      { item: 'Phí bảo dưỡng định kỳ lần 3', cost: '200.000đ' },
      { item: 'Phí dịch vụ', cost: '0đ' },
    ],
    totalCost: '200.000đ',
    deviceImage: require('@/assets/images/so_tay_ezcare/may_lanh.png'),
  },
  '3': {
    id: '3',
    day: '11',
    month: 'Tháng 1',
    title: 'MÁY NƯỚC NÓNG ARISTON',
    description: 'Bảo dưỡng định kỳ lần 2 kiểm vệ sinh máy',
    price: '100.000đ',
    status: 'scheduled',
    hasAssignedStore: true,
    assignedStoreId: '1',
    // Thông tin đã đặt lịch sẵn
    bookedTimeSlot: '15:00 - 16:30',
    bookedNotes: '',
    deviceInfo: {
      productCode: 'SM45E/PE',
      type: 'Năng lượng mặt trời',
      capacity: '150 lít',
      color: 'Trắng',
      warrantyInfo: '30/5/2025 - 30/5/2026'
    },
    repairCosts: [
      { item: 'Phí bảo dưỡng định kỳ lần 2', cost: '100.000đ' },
      { item: 'Phí dịch vụ', cost: '0đ' },
    ],
    totalCost: '100.000đ',
    deviceImage: require('@/assets/images/so_tay_ezcare/may_nuoc_nong.png'),
  }
};

export default function RepairDetailScreen() {
  const router = useRouter();
  const { maintenanceId } = useLocalSearchParams<{ maintenanceId: string }>();

  const maintenance = MAINTENANCE_DETAILS[maintenanceId as keyof typeof MAINTENANCE_DETAILS];

  // Khởi tạo state - nếu status = 'scheduled' thì đã đặt lịch sẵn
  const initialIsBooked = maintenance?.status === 'scheduled' && !!maintenance.bookedTimeSlot;
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(initialIsBooked);
  const [bookedTimeSlot, setBookedTimeSlot] = useState<string>(maintenance?.bookedTimeSlot || '');
  const [bookedNotes, setBookedNotes] = useState<string>(maintenance?.bookedNotes || '');

  if (!maintenance) {
    return (
      <SafeAreaView className="flex-1 bg-[#EDF7FF]">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-[#666666]">Không tìm thấy thông tin sửa chữa</Text>
        </View>
      </SafeAreaView>
    );
  }

  const assignedStore = maintenance.assignedStoreId ? ASSIGNED_STORES[maintenance.assignedStoreId] : null;

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

  const handleConfirmBooking = () => {
    if (!selectedTimeSlot) {
      Alert.alert('Thông báo', 'Vui lòng chọn khung giờ sửa chữa');
      return;
    }
    // Set trạng thái đã đặt lịch
    setBookedTimeSlot(selectedTimeSlot);
    setBookedNotes(notes);
    setIsBooked(true);
  };

  const getBookingStatusIcon = () => {
    return isBooked
      ? require('@/assets/images/so_tay_ezcare/da_dat_lich.png')
      : getStatusIcon();
  };

  const handleMessage = () => {
    Alert.alert('Nhắn tin', `Bạn muốn nhắn tin cho ${assignedStore?.name}?`);
  };

  // Render UI cho case CÓ đại lý được gán sẵn
  if (maintenance.hasAssignedStore && assignedStore) {
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
            {/* Card Chọn Khung Giờ Sửa / Thông tin đã đặt */}
            <View style={sectionStyle}>
              <View className="flex-row items-start">
                {/* Left side - Date section */}
                <View className="relative mr-4">
                  <View className="bg-[#EDF7FF] rounded-xl p-3 items-center">
                    <Text className="text-3xl font-bold text-[#39A3FF]">{maintenance.day}</Text>
                    <Text className="text-xs text-[#666666]">{maintenance.month}</Text>
                  </View>
                  {/* Status Icon - Thay đổi theo trạng thái đặt lịch */}
                  <Image
                    source={getBookingStatusIcon()}
                    className="absolute -bottom-1 right-1 w-4 h-4"
                    resizeMode="contain"
                  />
                </View>

                {/* Right side - Nội dung thay đổi theo trạng thái */}
                <View className="flex-1">
                  {isBooked ? (
                    // UI sau khi đã đặt lịch
                    <>
                      <View className="flex-row mb-1">
                        <Text className="text-sm text-[#666666] w-32">Khung giờ sửa:</Text>
                        <Text className="text-sm text-[#39A3FF] font-medium">{bookedTimeSlot}</Text>
                      </View>
                      <View className="flex-row mb-1">
                        <Text className="text-sm text-[#666666] w-32">Trạng thái thời gian:</Text>
                        <Text className="text-sm text-[#39A3FF] font-medium">Đã đặt lịch</Text>
                      </View>
                      <View className="flex-row">
                        <Text className="text-sm text-[#666666] w-32">Ghi chú:</Text>
                        <Text className="text-sm text-[#666666]">{bookedNotes || 'Không có'}</Text>
                      </View>
                    </>
                  ) : (
                    // UI chưa đặt lịch - form chọn giờ
                    <>
                      <Text className="text-sm text-[#666666] mb-2">Chọn khung giờ sửa:</Text>

                      {/* Time Slots */}
                      <View className="flex-row flex-wrap gap-2 mb-3">
                        {TIME_SLOTS.map((slot) => (
                          <TouchableOpacity
                            key={slot}
                            className={`px-3 py-2 rounded-full ${selectedTimeSlot === slot
                              ? 'bg-[#39A3FF]'
                              : 'bg-gray-200'
                              }`}
                            onPress={() => setSelectedTimeSlot(slot)}
                          >
                            <Text
                              className={`text-xs ${selectedTimeSlot === slot ? 'text-white font-medium' : 'text-[#666666]'
                                }`}
                            >
                              {slot}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      {/* Notes */}
                      <Text className="text-sm text-[#666666] mb-1">Ghi chú:</Text>
                      <TextInput
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#666666] bg-white mb-3"
                        placeholder="Ghi chú về thời gian tại đây..."
                        placeholderTextColor="#999999"
                        value={notes}
                        onChangeText={setNotes}
                      />

                      {/* Confirm Button - Màu xanh, căn phải */}
                      <View className="items-end">
                        <TouchableOpacity
                          className="bg-[#39A3FF] rounded-lg py-2.5 px-5"
                          onPress={handleConfirmBooking}
                        >
                          <Text className="text-white text-center font-bold text-sm">Xác nhận đặt</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>

            {/* Device Info Card - Tăng kích thước hình ảnh */}
            <View style={sectionStyle}>
              <View className="flex-row">
                <View className="w-32 h-36 rounded-xl overflow-hidden bg-gray-50 mr-4">
                  <Image
                    source={maintenance.deviceImage || require('@/assets/images/so_tay_ezcare/may_lanh.png')}
                    style={{ width: 128, height: 144 }}
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1 justify-center">
                  <Text className="text-base font-bold text-[#39A3FF] mb-2 uppercase">{maintenance.title}</Text>
                  <Text className="text-xs text-[#666666] mb-1">Mã sản phẩm: {maintenance.deviceInfo.productCode}</Text>
                  <Text className="text-xs text-[#666666] mb-1">Loại máy: {maintenance.deviceInfo.type}</Text>
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

              {/* Divider line cam */}
              <View className="h-0.5 bg-[#FF9149] my-2" />

              <View className="flex-row justify-between items-center py-2">
                <Text className="text-base font-bold text-[#FF9149]">Tổng cộng</Text>
                <Text className="text-base font-bold text-[#FF9149]">{maintenance.totalCost}</Text>
              </View>
            </View>

            {/* Assigned Store Card - Bổ sung đầy đủ thông tin */}
            <View style={sectionStyle}>
              {/* Header: Avatar + Name + Message Button */}
              <View className="flex-row items-start mb-4">
                {/* Store Avatar */}
                <View className="mr-3">
                  <Image
                    source={require('@/assets/images/so_tay_ezcare/dai_ly.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Store Info */}
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#39A3FF] mb-0.5">{assignedStore.name}</Text>
                  <Text className="text-xs text-[#4CAF50] mb-0.5">{assignedStore.onlineStatus}</Text>
                  <Text className="text-xs text-[#666666]" numberOfLines={2}>{assignedStore.description}</Text>
                </View>

                {/* Message Button */}
                <TouchableOpacity
                  className="border border-[#FF9149] rounded-lg px-4 py-2"
                  onPress={handleMessage}
                >
                  <Text className="text-[#FF9149] font-medium text-sm">Nhắn tin</Text>
                </TouchableOpacity>
              </View>

              {/* Thông tin chi tiết đại lý */}
              <View className="border-t border-gray-200 pt-3">
                {/* Địa chỉ */}
                <View className="flex-row mb-2">
                  <Text className="text-sm text-[#666666] w-20">Địa chỉ:</Text>
                  <Text className="text-sm text-[#666666] flex-1">{assignedStore.location}</Text>
                </View>

                {/* Hotline */}
                <View className="flex-row mb-2">
                  <Text className="text-sm text-[#666666] w-20">Hotline:</Text>
                  <Text className="text-sm text-[#666666] flex-1">{assignedStore.hotline}</Text>
                </View>

                {/* Đánh giá */}
                <View className="flex-row mb-2 items-center">
                  <Text className="text-sm text-[#666666] w-20">Đánh giá:</Text>
                  <Text className="text-sm text-[#39A3FF] font-medium">{assignedStore.rating}/5.0 </Text>
                  <Text className="text-yellow-500">★</Text>
                </View>

                {/* Ghi chú */}
                <View className="flex-row">
                  <Text className="text-sm text-[#666666] w-20">Ghi chú:</Text>
                  <Text className="text-sm text-[#666666] flex-1">
                    Nơi mua hàng <Text className="text-[#39A3FF]">Máy lạnh LG Inverter</Text>, phụ trách bảo dưỡng lần I, II của thiết bị
                  </Text>
                </View>
              </View>
            </View>

            {/* Lịch sử sửa chữa */}
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

  // Render UI cho case CHƯA có đại lý (code cũ)
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
                {maintenance.deviceInfo.capacity && (
                  <Text className="text-xs text-[#666666] mb-1">Dung tích: {maintenance.deviceInfo.capacity}</Text>
                )}
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
          {maintenance.maintenanceSchedule && (
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
          )}

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
