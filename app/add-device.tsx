import { IconSymbol } from '@/components/ui/icon-symbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddDeviceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ scannedData?: string }>();

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
  const [deviceStatus, setDeviceStatus] = useState<'stable' | 'maintenance' | 'broken' | ''>('');

  // Fill data from scanned barcode
  useEffect(() => {
    if (params.scannedData) {
      try {
        const data = JSON.parse(params.scannedData);
        if (data.deviceName) setDeviceName(data.deviceName);
        if (data.productCode) setProductCode(data.productCode);
        if (data.deviceType) setDeviceType(data.deviceType);
        if (data.selectedRoom) setSelectedRoom(data.selectedRoom);
        if (data.selectedRoomLabel) setSelectedRoomLabel(data.selectedRoomLabel);
        if (data.description) setDescription(data.description);
        if (data.purchaseDate) setPurchaseDate(data.purchaseDate);
        if (data.warrantyExpiry) setWarrantyExpiry(data.warrantyExpiry);
        if (data.maintenanceInterval) setMaintenanceInterval(data.maintenanceInterval);
        if (data.maintenanceIntervalLabel) setMaintenanceIntervalLabel(data.maintenanceIntervalLabel);
        if (data.deviceStatus) setDeviceStatus(data.deviceStatus);
      } catch (error) {
        console.error('Error parsing scanned data:', error);
      }
    }
  }, [params.scannedData]);

  const rooms = [
    { label: 'Tại phòng khách', value: 'living-room' },
    { label: 'Tại phòng ngủ', value: 'bedroom' },
    { label: 'Tại nhà bếp', value: 'kitchen' },
    { label: 'Tại nhà tắm', value: 'bathroom' },
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
    // Navigate to my-items screen after saving
    router.replace('/(tabs)/my-items' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
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
        <TouchableOpacity onPress={() => router.push('/scan-barcode' as any)}>
          <Image
            source={require('@/assets/images/scan.png')}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
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
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
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
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
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
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
            value={deviceType}
            onChangeText={setDeviceType}
          />
        </View>

        {/* Khu vực với dropdown inline */}
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>
            Khu vực <Text style={{ color: '#FF0000' }}>*</Text>
          </Text>
          <TouchableOpacity
            className="bg-blue-50 rounded-xl px-4 py-3.5 border border-blue-200 flex-row justify-between items-center"
            style={showRoomPicker ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}
            onPress={() => setShowRoomPicker(!showRoomPicker)}
          >
            <Text style={{ fontSize: 15, color: !selectedRoom ? 'rgba(57, 163, 255, 0.7)' : '#39A3FF' }}>
              {selectedRoomLabel}
            </Text>
            <MaterialIcons
              name={showRoomPicker ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="#39A3FF"
            />
          </TouchableOpacity>

          {/* Dropdown list */}
          {showRoomPicker && (
            <View className="bg-blue-50 border border-blue-200 border-t-0 rounded-b-xl overflow-hidden">
              {rooms.map((room, index) => (
                <TouchableOpacity
                  key={room.value}
                  className="px-4 py-3"
                  style={index < rooms.length - 1 ? { borderBottomWidth: 1, borderBottomColor: '#E0E7F1' } : {}}
                  onPress={() => handleRoomSelect(room)}
                >
                  <Text style={{ fontSize: 15, color: selectedRoom === room.value ? '#39A3FF' : 'rgba(57, 163, 255, 0.7)', fontWeight: selectedRoom === room.value ? '600' : '400' }}>
                    {room.label.replace('Tại ', '')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Mô tả */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-2" style={{ color: '#39A3FF' }}>Mô tả</Text>
          <TextInput
            className="bg-blue-50 rounded-xl px-4 py-3.5 text-base text-textDark border border-blue-200"
            style={{ height: 100, textAlignVertical: 'top' }}
            placeholder="Gợi ý&#10;Dung tích ...&#10;Màu sắc ..."
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
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

        {/* Ngày mua - Hạn bảo hành trên cùng 1 hàng */}
        <View className="flex-row items-center mb-4">
          <TextInput
            className="text-center flex-1"
            style={{
              height: 40,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(57, 163, 255, 0.7)',
              backgroundColor: 'rgba(176, 212, 242, 0.3)',
              fontSize: 14,
            }}
            placeholder="Nhập ngày mua"
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
            value={purchaseDate}
            onChangeText={setPurchaseDate}
          />
          <Text style={{ marginHorizontal: 10, fontSize: 14, fontWeight: '800', color: 'rgba(57, 163, 255, 0.7)' }}>đến</Text>
          <TextInput
            className="text-center flex-1"
            style={{
              height: 40,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(57, 163, 255, 0.7)',
              backgroundColor: 'rgba(176, 212, 242, 0.3)',
              fontSize: 14,
            }}
            placeholder="Nhập hạn bảo hành"
            placeholderTextColor="rgba(57, 163, 255, 0.7)"
            value={warrantyExpiry}
            onChangeText={setWarrantyExpiry}
          />
        </View>

        {/* Thời gian kiểm tra định kỳ - inline dropdown */}
        <View className="mb-4">
          <Text style={{ color: '#39A3FF', fontSize: 14, fontWeight: '800', marginBottom: 8 }}>Thời gian kiểm tra định kỳ <Text style={{ color: '#FF0000' }}>*</Text></Text>
          <TouchableOpacity
            className="bg-white rounded-xl px-4 py-3.5 border border-blue-200 flex-row justify-between items-center"
            style={showMaintenancePicker ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}
            onPress={() => setShowMaintenancePicker(!showMaintenancePicker)}
          >
            <Text style={{ fontSize: 15, color: !maintenanceInterval ? 'rgba(57, 163, 255, 0.7)' : '#39A3FF' }}>
              {maintenanceIntervalLabel}
            </Text>
            <MaterialIcons
              name={showMaintenancePicker ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="#39A3FF"
            />
          </TouchableOpacity>

          {/* Dropdown list */}
          {showMaintenancePicker && (
            <View className="bg-white border border-blue-200 border-t-0 rounded-b-xl overflow-hidden">
              {maintenanceIntervals.map((interval, index) => (
                <TouchableOpacity
                  key={interval.value}
                  className="px-4 py-3"
                  style={index < maintenanceIntervals.length - 1 ? { borderBottomWidth: 1, borderBottomColor: '#E0E7F1' } : {}}
                  onPress={() => handleMaintenanceSelect(interval)}
                >
                  <Text style={{ fontSize: 15, color: maintenanceInterval === interval.value ? '#39A3FF' : 'rgba(57, 163, 255, 0.7)', fontWeight: maintenanceInterval === interval.value ? '600' : '400' }}>
                    {interval.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Tình trạng hoạt động hiện tại */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3" style={{ color: '#39A3FF' }}>Tình trạng hoạt động hiện tại <Text style={{ color: '#FF0000' }}>*</Text></Text>
          <View className="flex-row items-center">
            {/* Ổn định */}
            <TouchableOpacity
              className="flex-row items-center mr-6"
              onPress={() => setDeviceStatus('stable')}
            >
              <View
                className="w-5 h-5 rounded-full mr-2 items-center justify-center"
                style={{ backgroundColor: 'rgba(176, 212, 242, 0.3)' }}
              >
                {deviceStatus === 'stable' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
              <Text style={{ color: 'rgba(57, 163, 255, 0.7)', fontSize: 14 }}>Ổn định</Text>
            </TouchableOpacity>

            {/* Sắp bảo trì */}
            <TouchableOpacity
              className="flex-row items-center mr-6"
              onPress={() => setDeviceStatus('maintenance')}
            >
              <View
                className="w-5 h-5 rounded-full mr-2 items-center justify-center"
                style={{ backgroundColor: 'rgba(176, 212, 242, 0.3)' }}
              >
                {deviceStatus === 'maintenance' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
              <Text style={{ color: 'rgba(57, 163, 255, 0.7)', fontSize: 14 }}>Sắp bảo trì</Text>
            </TouchableOpacity>

            {/* Bị hỏng */}
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setDeviceStatus('broken')}
            >
              <View
                className="w-5 h-5 rounded-full mr-2 items-center justify-center"
                style={{ backgroundColor: 'rgba(176, 212, 242, 0.3)' }}
              >
                {deviceStatus === 'broken' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </View>
              <Text style={{ color: 'rgba(57, 163, 255, 0.7)', fontSize: 14 }}>Bị hỏng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons: Hủy và Lưu */}
        <View className="flex-row mt-4 mb-6">
          <TouchableOpacity
            className="flex-1 rounded-full py-3.5 items-center mr-3 border"
            style={{ borderColor: '#B0D4F2', backgroundColor: '#FFFFFF' }}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text className="text-base font-semibold" style={{ color: '#666666' }}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-primary rounded-full py-3.5 items-center"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-base font-semibold text-white">Lưu</Text>
          </TouchableOpacity>
        </View>
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
                  className={`flex-row justify-between items-center py-4 px-4 rounded-xl mb-2 ${selectedRoom === room.value ? 'bg-blue-50' : 'bg-white'
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
                  className={`flex-row justify-between items-center py-4 px-4 rounded-xl mb-2 ${maintenanceInterval === interval.value ? 'bg-blue-50' : 'bg-white'
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
