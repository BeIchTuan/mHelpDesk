import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SLIDER_WIDTH = Dimensions.get('window').width - 64;
const MIN_PRICE = 0;
const MAX_PRICE = 50000000;

// Component Price Range Slider
interface PriceRangeSliderProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ 
  minValue, 
  maxValue, 
  onMinChange, 
  onMaxChange 
}) => {
  const sliderWidth = SLIDER_WIDTH - 20;
  
  const minPos = (minValue / MAX_PRICE) * sliderWidth;
  const maxPos = (maxValue / MAX_PRICE) * sliderWidth;
  
  const minPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt: any, gestureState: any) => {
        const newPos = Math.max(0, Math.min(gestureState.moveX - 40, maxPos - 20));
        const newValue = Math.round((newPos / sliderWidth) * MAX_PRICE / 100000) * 100000;
        if (newValue >= MIN_PRICE && newValue < maxValue - 1000000) {
          onMinChange(newValue);
        }
      },
    })
  ).current;

  const maxPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt: any, gestureState: any) => {
        const newPos = Math.max(minPos + 20, Math.min(gestureState.moveX - 40, sliderWidth));
        const newValue = Math.round((newPos / sliderWidth) * MAX_PRICE / 100000) * 100000;
        if (newValue <= MAX_PRICE && newValue > minValue + 1000000) {
          onMaxChange(newValue);
        }
      },
    })
  ).current;

  return (
    <View style={{ height: 50, marginBottom: 16, paddingHorizontal: 10 }}>
      <View style={{ 
        position: 'absolute', 
        left: 10, 
        right: 10, 
        top: 23, 
        height: 4, 
        backgroundColor: '#E0E0E0', 
        borderRadius: 2 
      }} />
      <View style={{ 
        position: 'absolute', 
        left: 10 + minPos, 
        width: maxPos - minPos,
        top: 23, 
        height: 4, 
        backgroundColor: '#666666', 
        borderRadius: 2 
      }} />
      <Animated.View
        {...minPanResponder.panHandlers}
        style={{ 
          position: 'absolute', 
          left: minPos,
          top: 14, 
          width: 22, 
          height: 22, 
          borderRadius: 11, 
          backgroundColor: '#666666',
        }}
      />
      <Animated.View
        {...maxPanResponder.panHandlers}
        style={{ 
          position: 'absolute', 
          left: maxPos - 2,
          top: 14, 
          width: 22, 
          height: 22, 
          borderRadius: 11, 
          backgroundColor: '#666666',
        }}
      />
    </View>
  );
};

// Mock data sản phẩm linh kiện/phụ kiện thay thế
const replacementProducts = [
  { 
    id: '1', 
    name: 'Sò nóng lạnh AQUA chính hãng', 
    currentPrice: '350.000', 
    originalPrice: '450.000',
    discount: '-22%',
    rating: 4.8,
    sold: 'Đã bán 1,2k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true,
    category: 'Linh kiện',
    brand: 'AQUA'
  },
  { 
    id: '2', 
    name: 'Relay khởi động tủ lạnh LG', 
    currentPrice: '280.000', 
    originalPrice: '350.000',
    discount: '-20%',
    rating: 4.7,
    sold: 'Đã bán 890',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false,
    category: 'Linh kiện',
    brand: 'LG'
  },
  { 
    id: '3', 
    name: 'Tủ lạnh AQUA Inverter 512 lít', 
    currentPrice: '15.990.000', 
    originalPrice: '18.990.000',
    discount: '-16%',
    rating: 4.9,
    sold: 'Đã bán 3,5k',
    image: require('@/assets/images/tu-lanh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true,
    category: 'Tủ lạnh',
    brand: 'AQUA'
  },
  { 
    id: '4', 
    name: 'Tủ lạnh LG Inverter 335 lít',
    currentPrice: '10.640.000', 
    originalPrice: '14.690.000',
    discount: '-27%',
    rating: 4.6,
    sold: 'Đã bán 16k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false,
    category: 'Tủ lạnh',
    brand: 'LG'
  },
  { 
    id: '5', 
    name: 'Sò nóng lạnh Samsung chính hãng', 
    currentPrice: '320.000', 
    originalPrice: '400.000',
    discount: '-20%',
    rating: 4.8,
    sold: 'Đã bán 2,1k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: true,
    category: 'Linh kiện',
    brand: 'Samsung'
  },
  { 
    id: '6', 
    name: 'Tủ lạnh Samsung Inverter 380 lít', 
    currentPrice: '12.490.000', 
    originalPrice: '15.990.000',
    discount: '-22%',
    rating: 4.7,
    sold: 'Đã bán 8k',
    image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
    paymentTag: 'Trả trước',
    hasNewTag: false,
    category: 'Tủ lạnh',
    brand: 'Samsung'
  },
];

const filterCategories = ['Tất cả', 'Linh kiện', 'Tủ lạnh', 'Phụ kiện'];
const filterBrands = ['Tất cả', 'AQUA', 'LG', 'Samsung', 'Toshiba', 'Panasonic'];
const filterSortOptions = ['Được đề xuất', 'Giá thấp đến cao', 'Giá cao đến thấp', 'Đánh giá'];

export default function BuyNewItemScreen() {
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState('Lọc theo');
  const [selectedSort, setSelectedSort] = useState('Được đề xuất');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [priceMinValue, setPriceMinValue] = useState(0);
  const [priceMaxValue, setPriceMaxValue] = useState(20000000);

  // Filter products
  const filteredProducts = replacementProducts.filter(product => {
    if (selectedCategory !== 'Tất cả' && product.category !== selectedCategory) return false;
    if (selectedBrand !== 'Tất cả' && product.brand !== selectedBrand) return false;
    return true;
  });

  const applyFilter = () => {
    setShowFilter(false);
  };

  const resetFilter = () => {
    setSelectedSort('Được đề xuất');
    setSelectedCategory('Tất cả');
    setSelectedBrand('Tất cả');
    setHasDiscount(false);
    setPriceMinValue(0);
    setPriceMaxValue(20000000);
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/my-items');
    }
  };

  // Component hiển thị filter section
  const renderFilterSection = (title: string, items: string[], selectedItem: string, onSelect: (item: string) => void) => (
    <View>
      <View style={{ backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>{title}</Text>
      </View>
      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16 }}>
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={{ 
              paddingVertical: 16, 
              borderBottomWidth: 1, 
              borderBottomColor: '#F0F0F0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onPress={() => onSelect(item)}
          >
            <Text style={{ fontSize: 16, color: '#333333' }}>{item}</Text>
            <View style={{ 
              width: 22, 
              height: 22, 
              borderRadius: 11, 
              backgroundColor: selectedItem === item ? 'rgba(176, 212, 242, 0.3)' : 'transparent',
              borderWidth: 2,
              borderColor: selectedItem === item ? '#39A3FF' : 'rgba(176, 212, 242, 0.3)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {selectedItem === item && (
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#39A3FF' }} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Component hiển thị tùy chọn section
  const renderOptionsSection = () => (
    <View>
      <View style={{ backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>TÙY CHỌN</Text>
      </View>
      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16 }}>
        <TouchableOpacity
          style={{ 
            paddingVertical: 16, 
            borderBottomWidth: 1, 
            borderBottomColor: '#F0F0F0',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onPress={() => setHasDiscount(!hasDiscount)}
        >
          <Text style={{ fontSize: 16, color: '#333333' }}>Ưu đãi</Text>
          <View style={{ 
            width: 22, 
            height: 22, 
            borderRadius: 11, 
            backgroundColor: hasDiscount ? 'rgba(176, 212, 242, 0.3)' : 'transparent',
            borderWidth: 2,
            borderColor: hasDiscount ? '#39A3FF' : 'rgba(176, 212, 242, 0.3)',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {hasDiscount && (
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#39A3FF' }} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Khoảng giá */}
      <View style={{ backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>KHOẢNG GIÁ</Text>
      </View>
      <View style={{ backgroundColor: '#FFFFFF', padding: 16 }}>
        <PriceRangeSlider 
          minValue={priceMinValue}
          maxValue={priceMaxValue}
          onMinChange={setPriceMinValue}
          onMaxChange={setPriceMaxValue}
        />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#E0E0E0', 
            borderRadius: 8, 
            paddingHorizontal: 12, 
            paddingVertical: 10 
          }}>
            <Text style={{ fontSize: 14, color: '#333333', textAlign: 'center' }}>
              {priceMinValue.toLocaleString('vi-VN')}đ
            </Text>
          </View>
          <View style={{ width: 20, height: 1, backgroundColor: '#999999', marginHorizontal: 8 }} />
          <View style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#E0E0E0', 
            borderRadius: 8, 
            paddingHorizontal: 12, 
            paddingVertical: 10 
          }}>
            <Text style={{ fontSize: 14, color: '#333333', textAlign: 'center' }}>
              {priceMaxValue.toLocaleString('vi-VN')}đ
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <StatusBar style="dark" />
      
        {/* Header */}
        <View className="px-4 py-3 bg-white">
          {/* Header bar */}
          <View className="flex-row items-center justify-between mb-3">
            <TouchableOpacity onPress={handleGoBack}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(176, 212, 242, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image 
                  source={require('@/assets/images/Vector.png')}
                  style={{ width: 20, height: 20, tintColor: '#39A3FF' }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-lg font-bold" style={{ color: '#39A3FF' }}>
              ĐIỆN TỬ, ĐIỆN MÁY
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/my-items')}>
              <Image 
                source={require('@/assets/images/home.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center" style={{ gap: 8 }}>
            <View 
              className="flex-1 bg-white rounded-full px-4 flex-row items-center border"
              style={{ height: 40, borderColor: '#E0E0E0' }}
            >
              <MaterialIcons name="search" size={20} color="#999" />
              <TextInput
                className="flex-1 ml-2 text-sm"
                placeholder="Tìm kiếm linh kiện, thiết bị..."
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity 
              onPress={() => setShowFilter(true)}
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20,
                backgroundColor: '#F0F8FF',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="tune" size={24} color="#39A3FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4">
            <View className="flex-row flex-wrap justify-between">
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  className="bg-white rounded-2xl p-3 mb-3"
                  style={{ width: '48%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                  onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}
                >
                  {/* Discount badge */}
                  <View 
                    className="absolute top-2 left-2 z-10 rounded px-2 py-1"
                    style={{ backgroundColor: '#FFE5E5' }}
                  >
                    <Text className="text-xs font-bold" style={{ color: '#FF4444' }}>
                      {product.discount}
                    </Text>
                  </View>
                  
                  {/* Ảnh sản phẩm */}
                  <View className="w-full items-center justify-center mb-2" style={{ height: 110 }}>
                    <Image
                      source={product.image}
                      style={{ width: '100%', height: 110 }}
                      resizeMode="contain"
                    />
                  </View>
                  
                  {/* Tên sản phẩm */}
                  <Text 
                    className="text-sm mb-1" 
                    numberOfLines={2}
                    style={{ color: '#7EC8F5', lineHeight: 18 }}
                  >
                    {product.name}
                  </Text>
                  
                  {/* Giá */}
                  <View className="mb-2">
                    <View className="flex-row items-center">
                      <Text className="text-base font-bold" style={{ color: '#FF9149' }}>
                        {product.currentPrice}đ
                      </Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                      <Text 
                        className="text-xs mr-2" 
                        style={{ color: '#999999', textDecorationLine: 'line-through' }}
                      >
                        {product.originalPrice}đ
                      </Text>
                      <Text className="text-xs font-semibold" style={{ color: '#FF4444' }}>
                        {product.discount}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Tags */}
                  <View className="flex-row mb-2 flex-wrap" style={{ gap: 6 }}>
                    {product.hasNewTag && (
                      <View 
                        className="rounded px-2 py-1"
                        style={{ borderWidth: 1, borderColor: '#FF9149', backgroundColor: '#FFFFFF', flexShrink: 0 }}
                      >
                        <Text className="text-xs font-medium" style={{ color: '#FF9149' }}>
                          Mẫu mới
                        </Text>
                      </View>
                    )}
                    <View 
                      className="rounded px-2 py-1"
                      style={{ backgroundColor: '#FF9149', flexShrink: 0 }}
                    >
                      <Text className="text-xs font-medium" style={{ color: '#FFFFFF' }} numberOfLines={1}>
                        Trả trước 0đ
                      </Text>
                    </View>
                  </View>
                  
                  {/* Rating và đã bán */}
                  <View className="flex-row items-center">
                    <Text style={{ color: '#FFD700', fontSize: 14 }}>⭐</Text>
                    <Text className="text-xs" style={{ color: '#7EC8F5', fontWeight: '600', marginLeft: 4 }}>
                      {product.rating}
                    </Text>
                    <Text className="text-xs" style={{ color: '#7EC8F5', marginLeft: 4, flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
                      - {product.sold}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Filter Full Screen */}
      {showFilter && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: '#FFFFFF',
          zIndex: 1000 
        }}>
          <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            {/* Modal Header */}
            <View className="px-4 py-4 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <MaterialIcons name="close" size={28} color="#666666" />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={resetFilter} className="flex-row items-center">
                <Text className="text-sm" style={{ color: '#666666', marginRight: 4 }}>Làm mới</Text>
                <MaterialIcons name="refresh" size={20} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View className="flex-row border-b border-gray-200">
              {['Lọc theo', 'Loại hàng', 'Thương hiệu', 'Tùy chọn'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  className="flex-1 py-3 items-center border-b-2"
                  style={{ borderBottomColor: activeTab === tab ? '#39A3FF' : 'transparent' }}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text 
                    className="text-sm font-medium"
                    style={{ color: activeTab === tab ? '#39A3FF' : '#666666' }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Filter Content */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              {activeTab === 'Lọc theo' && (
                <View>
                  {renderFilterSection('LỌC THEO', filterSortOptions, selectedSort, setSelectedSort)}
                  {renderFilterSection('LOẠI HÀNG', filterCategories, selectedCategory, setSelectedCategory)}
                  {renderFilterSection('THƯƠNG HIỆU', filterBrands, selectedBrand, setSelectedBrand)}
                  {renderOptionsSection()}
                </View>
              )}

              {activeTab === 'Loại hàng' && (
                <View>
                  {renderFilterSection('LOẠI HÀNG', filterCategories, selectedCategory, setSelectedCategory)}
                </View>
              )}

              {activeTab === 'Thương hiệu' && (
                <View>
                  {renderFilterSection('THƯƠNG HIỆU', filterBrands, selectedBrand, setSelectedBrand)}
                </View>
              )}

              {activeTab === 'Tùy chọn' && (
                <View>
                  {renderOptionsSection()}
                </View>
              )}
            </ScrollView>

            {/* Apply Button */}
            <View className="px-4 py-3" style={{ borderTopWidth: 1, borderTopColor: '#F0F0F0' }}>
              <TouchableOpacity
                className="rounded-full py-4 items-center mx-4"
                style={{ backgroundColor: '#39A3FF' }}
                onPress={applyFilter}
              >
                <Text className="text-lg font-bold text-white">Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}
