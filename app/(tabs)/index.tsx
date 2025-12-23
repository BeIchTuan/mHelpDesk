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
  chua_dat_lich: require('@/assets/images/so_tay_ezcare/chua_dat_lich.png'),
  da_dat_lich: require('@/assets/images/so_tay_ezcare/da_dat_lich.png'),
  hoan_tat: require('@/assets/images/so_tay_ezcare/hoan_tat.png'),
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
    status: 'unscheduled',
  },
  {
    id: '3',
    day: '11',
    month: 'Tháng 1',
    title: 'Máy nước nóng Ariston',
    description: 'Bảo dưỡng định kỳ lần 1 kiểm về sinh máy',
    price: '100.000đ',
    status: 'scheduled',
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
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const months = [
    'Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04',
    'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 
    'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

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
      <View className="bg-white rounded-lg p-2 mr-3">
        <Image source={icon} className="w-6 h-6" resizeMode="contain" />
      </View>
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

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case 'unscheduled': return IMAGES.chua_dat_lich;
      case 'scheduled': return IMAGES.da_dat_lich;
      case 'completed': return IMAGES.hoan_tat;
      default: return IMAGES.chua_dat_lich;
    }
  };

  const MaintenanceItemCard = ({ item }: { item: MaintenanceItem }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 mx-4" 
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View className="flex-row mb-3">
        {/* Section con cho ngày tháng */}
        <View className="relative">
          <View className="bg-[#EDF7FF] rounded-xl p-3 items-center mr-4">
            <Text className="text-4xl font-bold text-[#39A3FF] leading-none">{item.day}</Text>
            <Text className="text-sm text-[#666666] mt-1">{item.month}</Text>
          </View>
          {/* Status Icon ở dưới section con ngày tháng */}
          <Image 
            source={getStatusIcon(item.status)}
            className="absolute -bottom-1 right-2 w-4 h-4"
            resizeMode="contain"
          />
        </View>
        
        <View className="flex-1 mr-4">
          <Text className="font-bold text-lg text-[#39A3FF] mb-1">{item.title}</Text>
          <Text className="text-base text-[#666666] leading-5">{item.description}</Text>
        </View>

        <View className="items-end justify-center">
          <Text className="font-bold text-xl" style={{ color: COLORS.highlight }}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#EDF7FF]" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View className="px-4 pt-4 pb-3">
        <Text className="text-2xl font-bold text-[#39A3FF] text-center uppercase tracking-wider">
          SỔ TAY EZCARE
        </Text>
      </View>

      {/* Statistics Card */}
      <View className="mx-4 mt-4 mb-4 relative">
        <View className="rounded-2xl overflow-hidden">
          <Image 
            source={IMAGES.background}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <View className="p-4" style={{ backgroundColor: 'rgba(57, 163, 255, 0.9)' }}>
            {/* Month Selector */}
            <View className="items-center mb-4">
              <TouchableOpacity 
                className="flex-row items-center bg-white rounded-xl py-2.5 px-10"
                onPress={() => setShowMonthDropdown(!showMonthDropdown)}
              >
                <Text className="font-bold text-[#FF9149] text-sm mr-2">{selectedMonth}</Text>
                <ChevronDown size={14} color="#FF9149" />
              </TouchableOpacity>
            </View>
            
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
        
        {/* Dropdown Menu - positioned outside overflow-hidden container */}
        {showMonthDropdown && (
          <View 
            className="absolute bg-white rounded-xl min-w-[120px]"
            style={{
              top: 64,
              left: '50%',
              marginLeft: -60,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 8,
              zIndex: 1000
            }}
          >
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                className="py-3 px-4 border-b border-gray-100 last:border-b-0"
                onPress={() => {
                  setSelectedMonth(month);
                  setShowMonthDropdown(false);
                }}
              >
                <Text className={`text-sm font-semibold text-center ${
                  month === selectedMonth ? 'text-[#FF9149]' : 'text-[#666666]'
                }`}>
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
