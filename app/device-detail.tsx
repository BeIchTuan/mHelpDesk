import ChevronStepper from '@/components/maintenance/ChevronStepper';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockDevices } from '@/data/mockDevices';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function DeviceDetailScreen() {
  const router = useRouter();
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  const [showRepairHistory, setShowRepairHistory] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  
  const device = mockDevices.find(d => d.id === deviceId);

  // Mock repair history data
  const repairHistory = [
    { id: '1', agency: 'THIÊN KIM - Bình Chánh, HCM', date: '21/1/2025', content: 'Kiểm tra, vệ sinh tổng máy', cost: '300.000đ' },
    { id: '2', agency: 'NGỌC GIÀU - Tân Bình, HCM', date: '12/12/2024', content: 'Sửa chữa lỗi thoát nước', cost: '180.000đ' },
    { id: '3', agency: 'NGỌC GIÀU - Tân Bình, HCM', date: '21/10/2024', content: 'Lắp đặt máy, kiểm tra tổng', cost: '0đ' },
  ];

  // Mock parts replacement reminders
  const partsReminders = [
    { id: '1', name: 'Sò nóng lạnh' },
  ];

  if (!device) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-textDark">Không tìm thấy thiết bị</Text>
        </View>
      </SafeAreaView>
    );
  }

  const maintenanceSchedule = device.maintenanceSchedule || [];
  const hasUpcomingMaintenance = maintenanceSchedule.some(m => m.status === 'upcoming');

  const getStepColor = (level: number) => {
    const schedule = maintenanceSchedule.find(s => s.level === level);
    if (schedule?.status === 'done') return '#4CAF50';
    if (schedule?.status === 'upcoming') return '#F44336';
    return '#E0E0E0';
  };

  const getStepTextColor = (level: number) => {
    const schedule = maintenanceSchedule.find(s => s.level === level);
    if (schedule?.status === 'done' || schedule?.status === 'upcoming') return '#FFFFFF';
    return '#999999';
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
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      {/* Header */}
      <View className="bg-white px-5 pt-2 pb-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => {
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
        <Text className="flex-1 text-lg font-bold text-primary text-center">CHI TIẾT VẬT DỤNG</Text>
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
        {/* Device Info Card */}
        <View style={sectionStyle}>
          <View className="flex-row">
            <View className="w-24 h-28 rounded-xl overflow-hidden bg-gray-50">
              {device.image ? (
                <Image 
                  source={device.image} 
                  style={{ width: 96, height: 112 }}
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-100 items-center justify-center">
                  <Text className="text-4xl">📦</Text>
                </View>
              )}
              {/* Status badge */}
              <View 
                className="absolute bottom-1 left-1 right-1 py-1 rounded-full items-center"
                style={{ backgroundColor: 'rgba(249, 168, 37, 0.9)' }}
              >
                <Text className="text-xs font-semibold text-white">Sắp bảo trì</Text>
              </View>
            </View>

            <View className="flex-1 ml-3">
              <View className="flex-row items-start mb-1">
                <IconSymbol name="chevron.right" size={16} color="#39A3FF" style={{ marginTop: 3 }} />
                <Text className="text-base font-bold text-primary ml-1">{device.name}</Text>
              </View>
              <Text className="text-xs text-textLight mb-0.5">Mã sản phẩm: {device.productCode}</Text>
              {device.type && (
                <Text className="text-xs text-textLight mb-0.5">Loại máy: {device.type}</Text>
              )}
              {device.capacity && (
                <Text className="text-xs text-textLight mb-0.5">Dung tích: {device.capacity}</Text>
              )}
              {device.color && (
                <Text className="text-xs text-textLight mb-0.5">Màu sắc: {device.color}</Text>
              )}
              <Text className="text-xs text-textLight">
                Thông tin bảo hành: {device.purchaseDate || 'N/A'} - {device.warrantyExpiry}
              </Text>
            </View>
          </View>
        </View>

        {/* Maintenance Schedule */}
        {hasUpcomingMaintenance && (
          <View style={sectionStyle}>
            <Text className="text-base font-bold text-primary mb-4">THÔNG TIN KIỂM TRA ĐỊNH KỲ</Text>
            
            {/* Chevron Stepper */}
            <View className="mb-4">
              <ChevronStepper 
                totalSteps={6} 
                currentStep={maintenanceSchedule.filter(m => m.status === 'done').length || 2} 
              />
            </View>

            {/* Status Legend */}
            <View className="flex-row justify-around py-2 border-t border-gray-200 mb-4">
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-success mr-1.5" />
                <Text className="text-xs text-textDark">Đúng hạn</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-error mr-1.5" />
                <Text className="text-xs text-textDark">Quá hạn</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-gray-300 mr-1.5" />
                <Text className="text-xs text-textDark">Lần kế tiếp</Text>
              </View>
            </View>

            {/* Maintenance Dates với border line */}
            {maintenanceSchedule[0] && (
              <View className="mb-4">
                <View className="flex-row justify-between items-center py-2.5 border-b border-gray-200">
                  <Text className="flex-1 text-xs text-textDark">
                    Ngày kiểm tra định kỳ gần nhất (Lần {maintenanceSchedule[0].level}):
                  </Text>
                  <Text className="text-xs text-textDark font-semibold ml-2">
                    {maintenanceSchedule[0].checkDate}
                  </Text>
                </View>
                {maintenanceSchedule[0].nextCheckDate && (
                  <View className="flex-row justify-between items-center py-2.5 border-b border-gray-200">
                    <Text className="flex-1 text-xs text-textDark">
                      Ngày kiểm tra định kỳ kế tiếp (Lần {maintenanceSchedule[0].level + 1}):
                    </Text>
                    <Text className="text-xs text-textDark font-semibold ml-2">
                      {maintenanceSchedule[0].nextCheckDate}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity 
              className="bg-primary rounded-full py-3 items-center mb-3 self-center"
              style={{ width: 180 }}
            >
              <Text className="text-sm font-bold text-white">Đặt dịch vụ</Text>
            </TouchableOpacity>

            <TouchableOpacity className="self-end">
              <Text className="text-xs text-textDark underline">? Lợi ích kiểm tra định kỳ</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Parts Replacement Reminder */}
        <View style={sectionStyle}>
          <Text className="text-base font-bold text-primary mb-3">NHẮC NHỞ THAY THẾ LINH KIỆN</Text>
          {partsReminders.map((part) => (
            <TouchableOpacity 
              key={part.id}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row items-center">
                <Image
                  source={require('@/assets/images/warning.png')}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text className="text-sm text-textDark">{part.name}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Repair History */}
        <View style={sectionStyle}>
          <TouchableOpacity 
            className="flex-row justify-between items-center"
            onPress={() => setShowRepairHistory(!showRepairHistory)}
          >
            <Text className="text-base font-bold text-primary">LỊCH SỬ SỬA CHỮA</Text>
            <MaterialIcons 
              name={showRepairHistory ? "remove" : "add"} 
              size={24} 
              color="#39A3FF" 
            />
          </TouchableOpacity>
          
          {showRepairHistory && (
            <View className="mt-3" style={{ paddingHorizontal: 8 }}>
              {repairHistory.map((repair, index) => (
                <View 
                  key={repair.id}
                  className="py-3"
                  style={index < repairHistory.length - 1 ? { borderBottomWidth: 1, borderBottomColor: '#E0E0E0' } : {}}
                >
                  <View className="flex-row justify-between items-start">
                    <Text className="text-xs text-textDark">
                      <Text className="font-semibold">Đại lý: </Text>{repair.agency}
                    </Text>
                    <Text className="text-xs text-textLight">{repair.date}</Text>
                  </View>
                  <Text className="text-xs text-textDark mt-1">
                    <Text className="font-semibold">Nội dung: </Text>{repair.content}
                  </Text>
                  <Text className="text-xs text-textDark">
                    <Text className="font-semibold">Chi phí: </Text>{repair.cost}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Documents */}
        <View style={sectionStyle}>
          <TouchableOpacity 
            className="flex-row justify-between items-center"
            onPress={() => setShowDocuments(!showDocuments)}
          >
            <Text className="text-base font-bold text-primary">TẢI TÀI LIỆU HỮU ÍCH</Text>
            <MaterialIcons 
              name={showDocuments ? "remove" : "add"} 
              size={24} 
              color="#39A3FF" 
            />
          </TouchableOpacity>
          
          {showDocuments && (
            <View className="mt-4">
              <TouchableOpacity 
                className="flex-row items-center justify-center py-3 rounded-full"
                style={{ backgroundColor: '#39A3FF' }}
              >
                <MaterialIcons name="file-download" size={20} color="#FFF" />
                <Text className="text-sm font-semibold text-white ml-2">Hướng dẫn sử dụng</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
