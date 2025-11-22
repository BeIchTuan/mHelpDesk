import DeviceCard from '@/components/devices/DeviceCard';
import { Room } from '@/types/device';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface RoomItemProps {
  room: Room;
  onDevicePress: (deviceId: string) => void;
}

export default function RoomItem({ room, onDevicePress }: RoomItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="mb-4">
      {/* Header dropdown - transparent, chỉ có text và icon */}
      <TouchableOpacity
        className="flex-row justify-between items-center px-2 py-3"
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text className="text-base font-bold" style={{ color: '#39A3FF' }}>
          {room.name} ({room.devices.length})
        </Text>
        <MaterialIcons
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#39A3FF"
        />
      </TouchableOpacity>

      {/* Content area - device cards với background trắng */}
      {isExpanded && (
        <View className="mt-2 px-2">
          {room.devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onPress={() => onDevicePress(device.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}
