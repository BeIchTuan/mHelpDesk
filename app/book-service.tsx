import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MONTHS = [
  'Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06',
  'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const TIME_SLOTS = [
  '07:30 - 09:00', '09:30 - 10:00', '9:00 - 10:30',
  '13:30 - 14:30', '14:00 - 15:30', '15:00 - 16:30'
];

const PROVINCES = [
  'Chọn tỉnh thành phố - Phường',
  'TP. Hồ Chí Minh - Quận 1',
  'TP. Hồ Chí Minh - Quận 2', 
  'TP. Hồ Chí Minh - Quận 3',
  'Hà Nội - Ba Đình',
  'Hà Nội - Hoàn Kiếm'
];

export default function BookServiceScreen() {
  const router = useRouter();
  const { maintenanceId } = useLocalSearchParams<{ maintenanceId: string }>();
  
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [address, setAddress] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showProvincePicker, setShowProvincePicker] = useState(false);

  // Generate calendar days (simplified)
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 31;
    const startDay = 1; // Start from Monday (simplified)
    
    // Add empty cells for alignment
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

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
          {/* Time Selection Section */}
          <View style={sectionStyle}>
            <Text className="text-base font-bold text-[#39A3FF] mb-4">CHỌN THỜI GIAN SỬA CHỮA</Text>
            
            {/* Month Selector */}
            <TouchableOpacity 
              className="flex-row items-center justify-between bg-white border border-[#FF9149] rounded-lg px-4 py-3 mb-4"
              onPress={() => setShowMonthPicker(!showMonthPicker)}
            >
              <Text className="text-sm text-[#FF9149] font-medium">{MONTHS[selectedMonth]}</Text>
              <MaterialIcons name="expand-more" size={20} color="#FF9149" />
            </TouchableOpacity>

            {/* Month Picker Dropdown */}
            {showMonthPicker && (
              <View className="border border-gray-300 rounded-lg mb-4 bg-white">
                {MONTHS.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100"
                    onPress={() => {
                      setSelectedMonth(index);
                      setShowMonthPicker(false);
                    }}
                  >
                    <Text className="text-sm text-[#666666]">{month}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Calendar */}
            <View className="mb-4">
              {/* Week headers */}
              <View className="flex-row mb-2 border-b border-gray-200 pb-2">
                {weekDays.map((day) => (
                  <View key={day} className="flex-1 items-center py-2">
                    <Text className="text-xs text-[#666666] font-medium">{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar grid */}
              <View className="flex-row flex-wrap">
                {calendarDays.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-[14.28%] items-center py-2"
                    onPress={() => day && setSelectedDate(day)}
                    disabled={!day}
                  >
                    {day && (
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center ${
                          selectedDate === day ? 'bg-[#39A3FF]' : ''
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            selectedDate === day ? 'text-white font-bold' : 'text-[#666666]'
                          }`}
                        >
                          {day.toString().padStart(2, '0')}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Confirmed Date */}
            <Text className="text-sm text-[#666666] mb-3">
              Xác nhận thời gian: <Text className="text-[#39A3FF] font-medium">{selectedDate.toString().padStart(2, '0')}/01/2026</Text>
            </Text>

            {/* Time Slots */}
            <Text className="text-sm text-[#666666] mb-3">Chọn khung giờ sửa chữa<Text className="text-[#FF9149]">*</Text>:</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  className={`px-3 py-2 rounded-full border ${
                    selectedTimeSlot === slot
                      ? 'bg-[#39A3FF] border-[#39A3FF]'
                      : 'bg-gray-100 border-gray-300'
                  }`}
                  onPress={() => setSelectedTimeSlot(slot)}
                >
                  <Text
                    className={`text-xs ${
                      selectedTimeSlot === slot ? 'text-white' : 'text-[#666666]'
                    }`}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notes */}
            <Text className="text-sm text-[#666666] mb-2">Ghi chú:</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#666666]"
              placeholder="Ghi chú về thời gian tại đây"
              placeholderTextColor="#999999"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Address Selection Section */}
          <View style={sectionStyle}>
            <Text className="text-base font-bold text-[#39A3FF] mb-4">CHỌN ĐỊA CHỈ SỬA CHỮA</Text>
            
            {/* Province Selector */}
            <Text className="text-sm text-[#666666] mb-2">Tỉnh/Thành phố - Phường<Text className="text-[#FF9149]">*</Text>:</Text>
            <TouchableOpacity 
              className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-4"
              onPress={() => setShowProvincePicker(!showProvincePicker)}
            >
              <Text className="text-sm text-[#666666]">{PROVINCES[selectedProvince]}</Text>
              <MaterialIcons name="expand-more" size={20} color="#666666" />
            </TouchableOpacity>

            {/* Province Picker Dropdown */}
            {showProvincePicker && (
              <View className="border border-gray-300 rounded-lg mb-4 bg-white">
                {PROVINCES.map((province, index) => (
                  <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100"
                    onPress={() => {
                      setSelectedProvince(index);
                      setShowProvincePicker(false);
                    }}
                  >
                    <Text className="text-sm text-[#666666]">{province}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Address Input */}
            <Text className="text-sm text-[#666666] mb-2">Địa chỉ cụ thể<Text className="text-[#FF9149]">*</Text>:</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#666666]"
              placeholder="Nhập số nhà, đường..."
              placeholderTextColor="#999999"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            className="bg-[#39A3FF] rounded-lg py-4 mt-4"
            onPress={() => router.push(`/select-store?maintenanceId=${maintenanceId}&selectedDate=${selectedDate}&selectedTime=${selectedTimeSlot}&address=${address}`)}
          >
            <Text className="text-white text-center font-bold text-base">Tiếp tục</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
