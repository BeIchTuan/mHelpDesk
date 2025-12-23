import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Color Constants ---
const COLORS = {
  primary: '#39A3FF',
  secondary: '#B0D4F2', 
  background: '#FFFFFF',
  highlight: '#FF9149',
  textDark: '#333333',
  textLight: '#999999',
  white: '#FFFFFF',
  success: '#4CAF50',
};

// --- Types ---
type MaintenanceStatus = 'unscheduled' | 'scheduled' | 'completed';

interface MaintenanceItem {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  price: string;
  status: MaintenanceStatus;
}

// --- Images ---
const IMAGES = {
  background: require('@/assets/images/so_tay_ezcare/Background.png'),
  money: require('@/assets/images/so_tay_ezcare/money.png'),
  quantity: require('@/assets/images/so_tay_ezcare/quantity.png'),
};

// --- Mock Data ---
const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: '1',
    day: '21',
    month: 'Tháng 1',
    title: 'Tủ lạnh AQUA Inverter',
    description: 'Bảo dưỡng định kỳ lần 2, thay linh kiện Số nóng lạnh',
    price: '1.000.000đ',
    status: 'unscheduled',
  },
  {
    id: '2',
    day: '18',
    month: 'Tháng 1',
    title: 'Máy lạnh LG Inverter',
    description: 'Bảo dưỡng định kỳ lần 2 kiểm về sinh máy',
    price: '200.000đ',
    status: 'scheduled',
  },
  {
    id: '3',
    day: '11',
    month: 'Tháng 1',
    title: 'Máy nước nóng Ariston',
    description: 'Bảo dưỡng định kỳ lần 1 kiểm về sinh máy',
    price: '100.000đ',
    status: 'completed',
  },
  {
    id: '4',
    day: '09',
    month: 'Tháng 1',
    title: 'Máy lọc không khí BONECO',
    description: 'Bảo dưỡng định kỳ lần 1 kiểm về sinh máy',
    price: '200.000đ',
    status: 'completed',
  },
];

export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = useState('Tháng 01');
  const [activeFilter, setActiveFilter] = useState<'all' | MaintenanceStatus>('all');

  const filteredItems = MAINTENANCE_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case 'unscheduled': return '#FF9149';
      case 'scheduled': return '#FFA726'; 
      case 'completed': return '#4CAF50';
      default: return '#FF9149';
    }
  };

  const StatCard = ({ icon, value, label }: { icon: ImageSourcePropType; value: string; label: string }) => (
    <View className="flex-row items-center bg-white/25 rounded-2xl p-4 flex-1 mx-1">
      <Image source={icon} className="w-8 h-8 mr-3" resizeMode="contain" />
      <View>
        <Text className="text-white font-bold text-xl">{value}</Text>
        <Text className="text-white/90 text-sm">{label}</Text>
      </View>
    </View>
  );

  const FilterTab = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-5 py-3 rounded-xl mr-3 ${
        isActive ? 'bg-[#39A3FF]' : 'bg-[#E8E8E8]'
      }`}
    >
      <Text className={`font-semibold text-base ${
        isActive ? 'text-white' : 'text-[#666666]'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const MaintenanceItemCard = ({ item }: { item: MaintenanceItem }) => (
    <TouchableOpacity className="flex-row items-center bg-white rounded-2xl p-5 mb-4 mx-4" 
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View className="items-center mr-5">
        <Text className="text-4xl font-bold text-[#39A3FF] leading-none">{item.day}</Text>
        <Text className="text-sm text-[#999999] mt-1">{item.month}</Text>
        <View 
          className="w-2.5 h-2.5 rounded-full mt-2" 
          style={{ backgroundColor: getStatusColor(item.status) }}
        />
      </View>
      
      <View className="flex-1">
        <Text className="font-bold text-lg text-[#333333] mb-2">{item.title}</Text>
        <Text className="text-base text-[#666666] mb-3 leading-5">{item.description}</Text>
        <Text className="font-bold text-xl" style={{ color: COLORS.highlight }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View className="px-4 pt-4 pb-3 bg-white">
        <Text className="text-2xl font-bold text-[#39A3FF] text-center uppercase tracking-wider">
          SỔ TAY EZCARE
        </Text>
      </View>

      {/* Statistics Card */}
      <View className="mx-4 mt-4 mb-4">
        <View className="rounded-2xl overflow-hidden">
          <Image 
            source={IMAGES.background}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <View className="p-4" style={{ backgroundColor: 'rgba(57, 163, 255, 0.9)' }}>
            {/* Month Selector */}
            <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-lg py-3 px-4 mb-4">
              <Text className="font-bold text-[#FF9149] text-base mr-2">{selectedMonth}</Text>
              <ChevronDown size={18} color="#FF9149" />
            </TouchableOpacity>
            
            {/* Stats Row */}
            <View className="flex-row">
              <StatCard 
                icon={IMAGES.money}
                value="1,500,000đ"
                label="Chi phí sửa chữa"
              />
              <StatCard 
                icon={IMAGES.quantity}
                value="04"
                label="Số vật dụng cần sửa"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 mb-4">
        <FlatList
          horizontal
          data={[
            { key: 'all', label: 'Tất cả' },
            { key: 'unscheduled', label: 'Chưa đặt lịch' },
            { key: 'scheduled', label: 'Đã đặt lịch' },
            { key: 'completed', label: 'Hoàn tất' },
          ]}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <FilterTab 
              label={item.label}
              isActive={activeFilter === item.key}
              onPress={() => setActiveFilter(item.key as any)}
            />
          )}
          contentContainerStyle={{ paddingRight: 20 }}
        />
      </View>

      {/* Maintenance List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MaintenanceItemCard item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
