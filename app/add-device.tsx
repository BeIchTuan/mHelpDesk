import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddDeviceScreen() {
  const router = useRouter();
  const [deviceName, setDeviceName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedRoomLabel, setSelectedRoomLabel] = useState('Chọn khu vực');
  const [description, setDescription] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyExpiry, setWarrantyExpiry] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');
  const [maintenanceInterval, setMaintenanceInterval] = useState('');
  const [maintenanceIntervalLabel, setMaintenanceIntervalLabel] = useState('Chọn thời gian');
  const [showRoomPicker, setShowRoomPicker] = useState(false);
  const [showMaintenancePicker, setShowMaintenancePicker] = useState(false);

  const rooms = [
    { label: 'Tại phòng khách', value: 'living-room' },
    { label: 'Tại phòng ngủ', value: 'bedroom' },
    { label: 'Tại nhà bếp', value: 'kitchen' },
    { label: 'Tại nhà tắm', value: 'bathroom' },
    { label: 'Tại gara', value: 'garage' },
    { label: 'Tại sân vườn', value: 'garden' },
  ];

  const maintenanceIntervals = [
    { label: '3 tháng/lần', value: '3' },
    { label: '6 tháng/lần', value: '6' },
    { label: '9 tháng/lần', value: '9' },
    { label: '12 tháng/lần', value: '12' },
  ];

  const handleAddImage = () => {
    console.log('Add image');
  };

  const handleRoomSelect = (room: typeof rooms[0]) => {
    setSelectedRoom(room.value);
    setSelectedRoomLabel(room.label);
    setShowRoomPicker(false);
  };

  const handleMaintenanceSelect = (interval: typeof maintenanceIntervals[0]) => {
    setMaintenanceInterval(interval.value);
    setMaintenanceIntervalLabel(interval.label);
    setShowMaintenancePicker(false);
  };

  const handleSubmit = () => {
    if (!deviceName || !productCode || !deviceType || !selectedRoom) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    console.log('Submit device');
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-2 pb-4 flex-row items-center bg-white">
        <TouchableOpacity 
          onPress={() => {
            console.log('Back button pressed in add-device');
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/my-items' as any);
            }
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('@/assets/images/arrow circle left.png')}
            style={{ width: 32, height: 32, tintColor: '#4BA8F5' }}
          />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-center" style={{ color: '#39A3FF' }}>THÊM VẬT DỤNG MỚI</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title với Line */}
        <View className="flex-row items-center mb-5">
          <Text className="text-base font-bold mr-3" style={{ color: '#FF9149' }}>Thông tin vật dụng</Text>
          <View className="flex-1" style={{ height: 1, backgroundColor: '#FF9149' }} />
        </View>

        {/* Add Image Button */}
        <TouchableOpacity className="items-center mb-6" onPress={handleAddImage}>
          <Image
            source={require('@/assets/images/Box_Thêm hình ảnh.png')}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Tên vật dụng */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>
            Tên vật dụng <Text style={{ color: '#FF0000' }}>*</Text>
          </Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            placeholder="Nhập tên vật dụng"
            placeholderTextColor="#B0B0B0"
            value={deviceName}
            onChangeText={setDeviceName}
          />
        </View>

        {/* Mã sản phẩm */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>
            Mã sản phẩm <Text style={{ color: '#FF0000' }}>*</Text>
          </Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            placeholder="Nhập mã sản phẩm"
            placeholderTextColor="#B0B0B0"
            value={productCode}
            onChangeText={setProductCode}
          />
        </View>

        {/* Loại máy */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>
            Loại máy <Text style={{ color: '#FF0000' }}>*</Text>
          </Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            placeholder="Nhập loại máy"
            placeholderTextColor="#B0B0B0"
            value={deviceType}
            onChangeText={setDeviceType}
          />
        </View>

        {/* Khu vực với dropdown */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>
            Khu vực <Text style={{ color: '#FF0000' }}>*</Text>
          </Text>
          <TouchableOpacity
            className="bg-blue-50 rounded-xl px-4 py-3.5 border border-blue-200 flex-row justify-between items-center"
            onPress={() => setShowRoomPicker(true)}
          >
            <Text style={{ fontSize: 15, color: !selectedRoom ? '#B0B0B0' : '#39A3FF' }}>
              {selectedRoomLabel}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#39A3FF" />
          </TouchableOpacity>
        </View>

        {/* Mô tả */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>Mô tả</Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            style={{ height: 100, textAlignVertical: 'top' }}
            placeholder="Gợi ý&#10;Dung tích ...&#10;Màu sắc ..."
            placeholderTextColor="#B0B0B0"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Section Title với Line - Thông tin bảo hành */}
        <View className="flex-row items-center mb-5">
          <Text className="text-base font-bold mr-3" style={{ color: '#FF9149' }}>Thông tin bảo hành</Text>
          <View className="flex-1" style={{ height: 1, backgroundColor: '#FF9149' }} />
        </View>

        {/* Ngày mua */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>Ngày mua</Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            placeholder="Nhập ngày mua"
            placeholderTextColor="#B0B0B0"
            value={purchaseDate}
            onChangeText={setPurchaseDate}
          />
        </View>

        {/* Hạn bảo hành */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>Hạn bảo hành</Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            placeholder="Nhập hạn bảo hành"
            placeholderTextColor="#B0B0B0"
            value={warrantyExpiry}
            onChangeText={setWarrantyExpiry}
          />
        </View>

        {/* Thời gian kiểm tra định kỳ */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>Thời gian kiểm tra định kỳ <Text style={{ color: '#FF0000' }}>*</Text></Text>
          <TouchableOpacity
            className="bg-blue-50 rounded-xl px-4 py-3.5 border border-blue-200 flex-row justify-between items-center"
            onPress={() => setShowMaintenancePicker(true)}
          >
            <Text style={{ fontSize: 15, color: !maintenanceInterval ? '#B0B0B0' : '#39A3FF' }}>
              {maintenanceIntervalLabel}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#39A3FF" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-primary rounded-xl py-4 items-center mt-2 shadow-lg"
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text className="text-base font-bold text-white">Thêm vật dụng</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Room Picker Modal */}
      <Modal
        visible={showRoomPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRoomPicker(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setShowRoomPicker(false)}
        >
          <View className="bg-white rounded-t-3xl p-5" style={{ maxHeight: '70%' }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: '#39A3FF' }}>
                Chọn khu vực
              </Text>
              <TouchableOpacity onPress={() => setShowRoomPicker(false)}>
                <IconSymbol name="xmark" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {rooms.map((room) => (
                <TouchableOpacity
                  key={room.value}
                  className={`flex-row justify-between items-center py-4 px-4 rounded-xl mb-2 ${
                    selectedRoom === room.value ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onPress={() => handleRoomSelect(room)}
                  style={{ borderWidth: 1, borderColor: selectedRoom === room.value ? '#39A3FF' : '#E0E0E0' }}
                >
                  <Text
                    style={{ fontSize: 15, color: selectedRoom === room.value ? '#39A3FF' : '#666666', fontWeight: selectedRoom === room.value ? '600' : '400' }}
                  >
                    {room.label}
                  </Text>
                  {selectedRoom === room.value && (
                    <IconSymbol name="checkmark" size={20} color="#39A3FF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Maintenance Interval Picker Modal */}
      <Modal
        visible={showMaintenancePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMaintenancePicker(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setShowMaintenancePicker(false)}
        >
          <View className="bg-white rounded-t-3xl p-5" style={{ maxHeight: '70%' }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold" style={{ color: '#39A3FF' }}>
                Chọn thời gian kiểm tra định kỳ
              </Text>
              <TouchableOpacity onPress={() => setShowMaintenancePicker(false)}>
                <IconSymbol name="xmark" size={24} color="#999" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {maintenanceIntervals.map((interval) => (
                <TouchableOpacity
                  key={interval.value}
                  className={`flex-row justify-between items-center py-4 px-4 rounded-xl mb-2 ${
                    maintenanceInterval === interval.value ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onPress={() => handleMaintenanceSelect(interval)}
                  style={{ borderWidth: 1, borderColor: maintenanceInterval === interval.value ? '#39A3FF' : '#E0E0E0' }}
                >
                  <Text
                    style={{ fontSize: 15, color: maintenanceInterval === interval.value ? '#39A3FF' : '#666666', fontWeight: maintenanceInterval === interval.value ? '600' : '400' }}
                  >
                    {interval.label}
                  </Text>
                  {maintenanceInterval === interval.value && (
                    <IconSymbol name="checkmark" size={20} color="#39A3FF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
