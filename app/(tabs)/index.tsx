import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const quickActions = [
    { id: '1', title: 'Đồ của tôi', icon: 'shippingbox.fill' as any, route: '/my-items' as any, color: '#39A3FF' },
    { id: '2', title: 'Đặt dịch vụ', icon: 'wrench.and.screwdriver.fill' as any, route: '/explore' as any, color: '#FF9149' },
    { id: '3', title: 'Giỏ hàng', icon: 'cart.fill' as any, route: '/cart' as any, color: '#4CAF50' },
    { id: '4', title: 'Thông báo', icon: 'bell.fill' as any, route: '/notifications' as any, color: '#FF9149' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="bg-primary pt-4 pb-8 px-5 rounded-b-3xl">
        <Text className="text-2xl font-bold text-white mb-1">
          Chào mừng đến EzCare! 👋
        </Text>
        <Text className="text-sm text-white opacity-90">
          Quản lý và chăm sóc vật dụng của bạn
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Text className="text-base font-bold text-textDark mb-4">Truy cập nhanh</Text>
        <View className="flex-row flex-wrap -mx-2 mb-6">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              className="w-1/2 px-2 mb-4"
              onPress={() => router.push(action.route)}
            >
              <View className="bg-white rounded-2xl p-4 items-center shadow-md">
                <View
                  className="w-14 h-14 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: action.color + '20' }}
                >
                  <IconSymbol name={action.icon} size={28} color={action.color} />
                </View>
                <Text className="text-sm font-semibold text-textDark text-center">
                  {action.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <Text className="text-base font-bold text-textDark mb-4">Mẹo bảo dưỡng</Text>
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
          <View className="flex-row items-start">
            <View className="w-12 h-12 rounded-full items-center justify-center mr-3" style={{ backgroundColor: '#FF914920' }}>
              <Text className="text-2xl">💡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-textDark mb-1">
                Kiểm tra định kỳ
              </Text>
              <Text className="text-xs text-textLight">
                Thiết bị được bảo dưỡng định kỳ sẽ kéo dài tuổi thọ và giảm chi phí sửa chữa
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
          <View className="flex-row items-start">
            <View className="w-12 h-12 rounded-full bg-success/20 items-center justify-center mr-3">
              <Text className="text-2xl">📝</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-textDark mb-1">
                Lưu trữ tài liệu
              </Text>
              <Text className="text-xs text-textLight">
                Ghi chép đầy đủ thông tin bảo hành và hướng dẫn sử dụng của thiết bị
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md">
          <View className="flex-row items-start">
            <View className="w-12 h-12 rounded-full bg-error/20 items-center justify-center mr-3">
              <Text className="text-2xl">⚠️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-textDark mb-1">
                Nhận thông báo
              </Text>
              <Text className="text-xs text-textLight">
                Bật thông báo để không bỏ lỡ lịch bảo trì và ưu đãi từ đối tác
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
