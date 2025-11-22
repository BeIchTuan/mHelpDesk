import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="bg-primary pt-4 pb-6 px-5 rounded-b-3xl">
        <Text className="text-xl font-bold text-white text-center tracking-wider">
          THÔNG BÁO
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty State */}
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-6xl mb-4">🔔</Text>
          <Text className="text-lg font-bold text-textDark mb-2">
            Chưa có thông báo
          </Text>
          <Text className="text-sm text-textLight text-center">
            Bạn sẽ nhận được thông báo về bảo trì,{'\n'}
            bảo hành và khuyến mãi tại đây
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
