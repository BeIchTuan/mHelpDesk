import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#39A3FF',
        tabBarInactiveTintColor: '#B0D4F2',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70,
          paddingBottom: 20,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/tab/filled/home.png')
                : require('@/assets/images/tab/outline/Icon.png')
              }
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#39A3FF' : '#B0D4F2',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-items"
        options={{
          title: 'Đồ của tôi',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/tab/filled/box-seam.png')
                : require('@/assets/images/tab/outline/box-seam.png')
              }
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#39A3FF' : '#B0D4F2',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Dịch vụ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/tab/filled/build.png')
                : require('@/assets/images/tab/outline/build.png')
              }
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#39A3FF' : '#B0D4F2',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/tab/filled/shopping-cart.png')
                : require('@/assets/images/tab/outline/shopping-cart.png')
              }
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#39A3FF' : '#B0D4F2',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/tab/filled/Icon.png')
                : require('@/assets/images/tab/outline/bell.png')
              }
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#39A3FF' : '#B0D4F2',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
