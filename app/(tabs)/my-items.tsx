import RoomItem from '@/components/devices/RoomItem';
import { mockRooms } from '@/data/mockDevices';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyItemsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDevicePress = (deviceId: string) => {
    router.push({
      pathname: '/device-detail' as any,
      params: { deviceId }
    });
  };

  const handleAddDevice = () => {
    router.push('/add-device' as any);
  };

  // Filter rooms based on search query
  const filteredRooms = mockRooms.map(room => ({
    ...room,
    devices: room.devices.filter(device =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.productCode.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(room => room.devices.length > 0);

  const displayRooms = searchQuery ? filteredRooms : mockRooms;

  return (
    <View className="flex-1" style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#39A3FF" translucent={false} />
      {/* Status bar area - xanh không có border */}
      <SafeAreaView style={{ backgroundColor: '#39A3FF', borderBottomWidth: 0 }} edges={['top']} />
      
      {/* Header xanh với bo góc dưới */}
      <View 
        style={{ 
          backgroundColor: '#39A3FF',
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: '#39A3FF',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 4,
          zIndex: 1,
        }}
      >
          <Text className="text-2xl font-black text-white text-center mb-4" style={{ letterSpacing: 1 }}>
            ĐỒ CỦA TÔI
          </Text>
          
          {/* Search Bar */}
          <View className="flex-row items-center rounded-full px-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', height: 41 }}>
            <MaterialIcons name="search" size={18} color="#999999" />
            <TextInput
              className="flex-1 ml-2 text-sm"
              style={{ color: '#666666', height: 41 }}
              placeholder="Tìm kiếm"
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Content area - background trắng */}
        <ScrollView
          style={{ flex: 1, backgroundColor: '#FFFFFF', marginTop: -8 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
        {/* Container xanh chứa tất cả room items */}
        <View className="rounded-3xl" style={{ backgroundColor: '#B0D4F2', padding: 20 }}>
          {displayRooms.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              onDevicePress={handleDevicePress}
            />
          ))}

          {displayRooms.length === 0 && (
            <View className="py-10 items-center">
              <Text className="text-base text-textLight">Không tìm thấy thiết bị nào</Text>
            </View>
          )}
        </View>

        {/* Add Device Button - ngoài container xanh */}
        <TouchableOpacity
          className="bg-primary rounded-xl items-center justify-center mt-5 shadow-lg"
          style={{ height: 49 }}
          onPress={handleAddDevice}
          activeOpacity={0.8}
        >
          <Text className="text-base font-bold text-white">+ Thêm vật dụng mới</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
