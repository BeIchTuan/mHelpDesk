import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for available stores
const AVAILABLE_STORES = [
  {
    id: '1',
    name: 'ĐẠI LÝ MINH MẪN',
    type: 'Online 5 phút trước',
    location: 'TP. Hồ Chí Minh',
    rating: 4.8,
    ratingText: 'Đánh giá',
    price: '30.000đ',
    priceLabel: 'Phí dịch vụ'
  },
  {
    id: '2', 
    name: 'ĐẠI LÝ HOÀNG DIỆU',
    type: 'Đang Online',
    location: 'TP. Hồ Chí Minh',
    rating: 4.8,
    ratingText: 'Đánh giá',
    price: '35.000đ',
    priceLabel: 'Phí dịch vụ'
  },
  {
    id: '3',
    name: 'ĐẠI LÝ TÙNG THÀNH',
    type: 'Đang Online',
    location: 'TP. Hồ Chí Minh',
    rating: 4.8,
    ratingText: 'Đánh giá',
    price: '40.000đ',
    priceLabel: 'Phí dịch vụ'
  },
  {
    id: '4',
    name: 'ĐẠI LÝ ĐỨC DANH',
    type: 'Đang Online',
    location: 'TP. Hồ Chí Minh',
    rating: 4.7,
    ratingText: 'Đánh giá',
    price: '40.000đ',
    priceLabel: 'Phí dịch vụ'
  },
  {
    id: '5',
    name: 'ĐẠI LÝ THIỆN THÀNH',
    type: 'Online 15 phút trước',
    location: 'Đồng Nai',
    rating: 4.8,
    ratingText: 'Đánh giá',
    price: '45.000đ',
    priceLabel: 'Phí dịch vụ'
  },
  {
    id: '6',
    name: 'ĐẠI LÝ MẪN NHI',
    type: 'Online 15 phút trước', 
    location: 'Đồng Nai',
    rating: 4.7,
    ratingText: 'Đánh giá',
    price: '50.000đ',
    priceLabel: 'Phí dịch vụ'
  }
];

export default function SelectStoreScreen() {
  const router = useRouter();
  const { maintenanceId, selectedDate, selectedTime, address } = useLocalSearchParams<{ 
    maintenanceId: string;
    selectedDate: string;
    selectedTime: string; 
    address: string;
  }>();
  
  const [selectedStore, setSelectedStore] = useState('');

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
          <Text className="flex-1 text-lg font-bold text-[#39A3FF] text-center uppercase">ĐẶT DỊCH VỤ</Text>
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
                  Ghi chú: <Text className="text-[#39A3FF] font-medium">không có</Text>
                </Text>
                <Text className="text-sm text-[#666666]">
                  Địa chỉ: <Text className="text-[#39A3FF] font-medium">16/A7, đường Lĩnh Xuân, TP Thủ Đức, TP. HCM</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Available Stores List */}
          <View style={sectionStyle}>
            <Text className="text-base font-bold text-[#39A3FF] mb-4">DANH SÁCH CỬA HÀNG KHẢ DỤNG</Text>
            
            {AVAILABLE_STORES.map((store) => (
              <TouchableOpacity
                key={store.id}
                className={`p-4 rounded-xl mb-3 border ${
                  selectedStore === store.id 
                    ? 'bg-[#EDF7FF] border-[#39A3FF]' 
                    : 'bg-white border-gray-200'
                }`}
                onPress={() => setSelectedStore(store.id)}
              >
                <View className="flex-row items-center justify-between">
                  {/* Left side - Store info with icon */}
                  <View className="flex-row items-center flex-1">
                    {/* Store icon */}
                    <View className="mr-3">
                      <Image
                        source={require('@/assets/images/so_tay_ezcare/dai_ly.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                      />
                    </View>

                    {/* Store details */}
                    <View className="flex-1">
                      <Text className="text-sm font-bold text-[#39A3FF] mb-1">{store.name}</Text>
                      <Text className="text-xs text-[#666666] mb-1">{store.type}</Text>
                      <Text className="text-xs text-[#666666]">{store.location}</Text>
                    </View>
                  </View>

                  {/* Vertical separator line */}
                  <View className="w-px h-10 bg-gray-300 mx-4" />

                  {/* Center - Rating */}
                  <View className="items-center">
                    <Text className="text-sm font-bold text-[#39A3FF] mb-0.5">{store.rating}</Text>
                    <Text className="text-xs text-[#666666]">{store.ratingText}</Text>
                  </View>

                  {/* Right side - Price */}
                  <View className="items-end ml-6">
                    <Text className="text-xs text-[#666666] mb-0.5">{store.priceLabel}</Text>
                    <Text className="text-sm font-bold text-[#FF9149]">{store.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            className={`rounded-lg py-4 mt-4 ${
              selectedStore ? 'bg-[#39A3FF]' : 'bg-gray-300'
            }`}
            disabled={!selectedStore}
            onPress={() => router.push(`/service-confirmation?maintenanceId=${maintenanceId}&selectedStore=${selectedStore}`)}
          >
            <Text className="text-white text-center font-bold text-base">Tiếp tục</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
