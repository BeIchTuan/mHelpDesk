import ChevronStepper from '@/components/maintenance/ChevronStepper';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockDevices } from '@/data/mockDevices';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
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
  
  const device = mockDevices.find(d => d.id === deviceId);

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

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="bg-background px-5 pt-2 pb-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => {
            console.log('Back button pressed');
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
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Device Info Card */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <View className="flex-row">
            <View className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
              {device.image ? (
                <Image 
                  source={device.image} 
                  style={{ width: 96, height: 96 }}
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-100 items-center justify-center">
                  <Text className="text-4xl">📦</Text>
                </View>
              )}
            </View>

            <View className="flex-1 ml-3">
              <View className="flex-row items-center mb-1">
                <Text className="text-lg font-bold text-primary flex-1">{device.name}</Text>
                <View 
                  className="px-3 py-1.5 rounded-full"
                  style={{ 
                    backgroundColor: '#FFF9E6', 
                    borderWidth: 1.5, 
                    borderColor: '#F9A825' 
                  }}
                >
                  <Text className="text-xs font-bold" style={{ color: '#F9A825' }}>
                    Sắp bảo trì
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-textLight mb-0.5">Mã sản phẩm: {device.productCode}</Text>
              {device.type && (
                <Text className="text-sm text-textLight mb-0.5">Loại máy: {device.type}</Text>
              )}
              {device.capacity && (
                <Text className="text-sm text-textLight mb-0.5">Dung tích: {device.capacity}</Text>
              )}
              {device.color && (
                <Text className="text-sm text-textLight mb-0.5">Màu sắc: {device.color}</Text>
              )}
              <Text className="text-sm text-textLight">
                Thông tin bảo hành: {device.purchaseDate || 'N/A'} - {device.warrantyExpiry}
              </Text>
            </View>
          </View>
        </View>

        {/* Maintenance Schedule */}
        {hasUpcomingMaintenance && (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
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
                  <Text className="flex-1 text-sm text-textDark">
                    Ngày kiểm tra định kỳ gần nhất (Lần {maintenanceSchedule[0].level}):
                  </Text>
                  <Text className="text-sm text-textDark font-semibold ml-2">
                    {maintenanceSchedule[0].checkDate}
                  </Text>
                </View>
                {maintenanceSchedule[0].nextCheckDate && (
                  <View className="flex-row justify-between items-center py-2.5 border-b border-gray-200">
                    <Text className="flex-1 text-sm text-textDark">
                      Ngày kiểm tra định kỳ kế tiếp (Lần {maintenanceSchedule[0].level + 1}):
                    </Text>
                    <Text className="text-sm text-textDark font-semibold ml-2">
                      {maintenanceSchedule[0].nextCheckDate}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity className="bg-primary rounded-lg py-3 items-center mb-3">
              <Text className="text-base font-bold text-white">Đặt dịch vụ</Text>
            </TouchableOpacity>

            <TouchableOpacity className="self-end">
              <Text className="text-sm text-textDark">? Lợi ích kiểm tra định kỳ</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Maintenance History */}
        <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-md flex-row justify-between items-center">
          <Text className="text-base font-bold text-primary">LỊCH SỬ SỬA CHỮA</Text>
          <IconSymbol name="plus" size={24} color="#4BA8F5" />
        </TouchableOpacity>

        {/* Documents */}
        <TouchableOpacity className="bg-white rounded-xl p-4 shadow-md flex-row justify-between items-center">
          <Text className="text-base font-bold text-primary">TÀI LIỆU HỮU ÍCH</Text>
          <IconSymbol name="plus" size={24} color="#4BA8F5" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
