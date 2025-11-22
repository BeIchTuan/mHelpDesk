import { Device } from '@/types/device';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface DeviceCardProps {
  device: Device;
  onPress: () => void;
}

const getStatusBadge = (status: Device['status']) => {
  switch (status) {
    case 'healthy':
      return { text: 'Ổn định', color: '#4CAF50', bgColor: '#E8F5E9' };
    case 'warning':
      return { text: 'Sắp bảo trì', color: '#FF9800', bgColor: '#FFF3E0' };
    case 'maintenance_due':
      return { text: 'Cần bảo trì', color: '#F44336', bgColor: '#FFEBEE' };
    case 'expired':
      return { text: 'Hết bảo hành', color: '#9E9E9E', bgColor: '#F5F5F5' };
    default:
      return { text: 'Không xác định', color: '#757575', bgColor: '#EEEEEE' };
  }
};

const getStatusColor = (status: Device['status']) => {
  switch (status) {
    case 'healthy':
      return { backgroundColor: '#4CAF50' };
    case 'warning':
      return { backgroundColor: '#FF9800' };
    case 'maintenance_due':
      return { backgroundColor: '#F44336' };
    case 'expired':
      return { backgroundColor: '#9E9E9E' };
    default:
      return { backgroundColor: '#757575' };
  }
};

const getStatusText = (status: Device['status']) => {
  switch (status) {
    case 'healthy':
      return 'Ổn định';
    case 'warning':
      return 'Sắp bảo trì';
    case 'maintenance_due':
      return 'Cần bảo trì';
    case 'expired':
      return 'Hết bảo hành';
    default:
      return 'Không xác định';
  }
};

const getStatusBadgeImage = (status: Device['status']) => {
  switch (status) {
    case 'healthy':
      return require('@/assets/images/Ổn định.png');
    case 'warning':
      return require('@/assets/images/Sắp bảo trì.png');
    case 'maintenance_due':
    case 'expired':
      return require('@/assets/images/Bị hỏng.png');
    default:
      return require('@/assets/images/Ổn định.png');
  }
};

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-md">
      <View className="flex-row">
        {/* Image với status badge */}
        <View className="mr-3">
          <View className="w-24 h-24 rounded-xl overflow-hidden">
            {device.image ? (
              <Image source={device.image} className="w-full h-full" />
            ) : (
              <View className="w-full h-full bg-gray-100 items-center justify-center">
                <Text className="text-3xl">📦</Text>
              </View>
            )}
          </View>
          
          {/* Status badge dưới hình */}
          <Image
            source={getStatusBadgeImage(device.status)}
            style={{ width: 70, height: 24, marginTop: 4, marginLeft: 2 }}
            resizeMode="contain"
          />
        </View>

        {/* Device info */}
        <View className="flex-1">
          <Text className="text-base font-bold" style={{ color: '#39A3FF' }} numberOfLines={1}>
            {device.name}
          </Text>
          <Text className="text-xs text-textLight mt-1" numberOfLines={1}>
            Mã sản phẩm: {device.productCode}
          </Text>
          <Text className="text-xs text-textLight mt-1" numberOfLines={2}>
            Thông tin bảo hành: {device.purchaseDate || 'N/A'} - {device.warrantyExpiry || 'N/A'}
          </Text>
          
          {/* Nút Xem chi tiết */}
          <TouchableOpacity
            onPress={onPress}
            className="self-end mt-2"
            activeOpacity={0.7}
          >
            <Text className="text-sm font-semibold" style={{ color: '#FF9149' }}>
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
