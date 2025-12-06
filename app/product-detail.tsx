import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock product data
const productData = {
  id: '4',
  name: 'BRAVIA 9 Tivi Mini LED (QLED) Sony 75 inch K-75XR90',
  currentPrice: '75.650.000',
  originalPrice: '95.990.000',
  discount: '-20%',
  sold: 'Đã bán 6k+',
  mainImage: require('@/assets/images/product_detail/product_detail.png'),
  thumbnails: [
    require('@/assets/images/product_detail/product1.png'),
    require('@/assets/images/product_detail/product2.png'),
    require('@/assets/images/product_detail/product3.png'),
    require('@/assets/images/product_detail/product4.png'),
    require('@/assets/images/product_detail/product5.png'),
    require('@/assets/images/product_detail/product6.png'),
    require('@/assets/images/product_detail/product7.png'),
    require('@/assets/images/product_detail/product8.png'),
  ],
  benefits: [
    { id: 1, text: 'Giảm 10% cho đơn hàng đầu tiên khi ', highlight: 'đăng ký tài khoản mới' },
    { id: 2, text: 'Miễn phí vận chuyển cho đơn từ 5.000.000đ', highlight: '' },
    { id: 3, text: 'Hỗ trợ lắp đặt cho đồ điện tử điện máy và viễn thông', highlight: '' },
    { id: 4, text: 'Chương trình trả góp ưu đãi ', highlight: '5 KHÔNG' },
    { id: 5, text: 'Giảm đến 20% tối đa 5 triệu khi thanh toán qua thẻ tín dụng ', highlight: 'EzCare Credit' },
    { id: 6, text: 'Hư gì đổi nấy 12 tháng tận nhà (miễn phí tháng đầu)', highlight: '' },
  ],
  dealer: {
    name: 'ĐẠI LÝ MINH MẪN',
    address: 'Điện Tử Minh Mẫn',
    image: require('@/assets/images/logo.png'),
  }
};

export default function ProductDetailScreen() {
  const [cartCount, setCartCount] = useState(7);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMainImage, setSelectedMainImage] = useState(productData.mainImage);
  const thumbnailRef = useRef<FlatList>(null);

  const scrollToIndex = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentImageIndex - 1)
      : Math.min(productData.thumbnails.length - 1, currentImageIndex + 1);
    
    setCurrentImageIndex(newIndex);
    thumbnailRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const handleThumbnailPress = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedMainImage(productData.thumbnails[index]);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      
      {/* Main Image with Header */}
      <View style={{ height: 280 }}>
        <ImageBackground 
          source={selectedMainImage}
          style={{ flex: 1, width: '100%' }}
          resizeMode="cover"
        >
          {/* Overlay gradient */}
          <View style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: 100,
            backgroundColor: 'rgba(176, 212, 242, 0.5)'
          }} />
          
          {/* Header */}
          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingTop: 8
            }}>
              {/* Back Button */}
              <TouchableOpacity 
                onPress={() => router.back()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image 
                  source={require('@/assets/images/product_detail/back.png')}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Cart Button */}
              <TouchableOpacity 
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image 
                  source={require('@/assets/images/product_detail/cart.png')}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
                {/* Cart Badge */}
                {cartCount > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#39A3FF',
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4
                  }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Image Counter */}
            <View style={{ 
              position: 'absolute', 
              bottom: 16, 
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 4
            }}>
              <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                {currentImageIndex + 1}/{productData.thumbnails.length + 1}
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* Thumbnail Carousel */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12,
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left Arrow */}
        <TouchableOpacity 
          onPress={() => scrollToIndex('left')}
          style={{ paddingHorizontal: 8 }}
        >
          <MaterialIcons name="chevron-left" size={28} color="#666666" />
        </TouchableOpacity>

        {/* Thumbnails */}
        <FlatList
          ref={thumbnailRef}
          horizontal
          data={productData.thumbnails}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              onPress={() => handleThumbnailPress(index)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                borderWidth: currentImageIndex === index ? 2 : 1,
                borderColor: currentImageIndex === index ? '#FF9149' : '#E0E0E0',
                overflow: 'hidden'
              }}
            >
              <Image 
                source={item}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />

        {/* Right Arrow */}
        <TouchableOpacity 
          onPress={() => scrollToIndex('right')}
          style={{ paddingHorizontal: 8 }}
        >
          <MaterialIcons name="chevron-right" size={28} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={{ padding: 16 }}>
          {/* Product Name */}
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: '#39A3FF',
            marginBottom: 12
          }}>
            {productData.name}
          </Text>

          {/* Price Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ 
              fontSize: 22, 
              fontWeight: 'bold', 
              color: '#FF9149',
              marginRight: 12
            }}>
              {productData.currentPrice}đ
            </Text>

            {/* Vertical Line */}
            <View style={{ width: 1, height: 24, backgroundColor: '#E0E0E0', marginRight: 12 }} />

            {/* Tags */}
            <View style={{
              borderWidth: 1,
              borderColor: '#FF9149',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 8
            }}>
              <Text style={{ fontSize: 12, color: '#FF9149' }}>Mẫu mới</Text>
            </View>

            <View style={{
              backgroundColor: '#FF9149',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4
            }}>
              <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' }}>Trả trước 0đ</Text>
            </View>
          </View>

          {/* Discount Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{
              backgroundColor: '#FF9149',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 8
            }}>
              <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' }}>
                {productData.discount}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 14, 
              color: '#999999',
              textDecorationLine: 'line-through'
            }}>
              {productData.originalPrice}đ
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#999999',
              marginLeft: 'auto'
            }}>
              {productData.sold}
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={{ 
          backgroundColor: '#F5F9FC', 
          marginHorizontal: 16,
          borderRadius: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#E8F4FC'
        }}>
          {/* Header */}
          <View style={{ 
            backgroundColor: '#39A3FF',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderTopLeftRadius: 11,
            borderTopRightRadius: 11
          }}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
              ƯU ĐÃI XỊN CÙNG EZCARE
            </Text>
          </View>

          {/* Content */}
          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ color: '#666666', fontSize: 13 }}>1. Giảm 10% cho đơn hàng đầu tiên khi </Text>
              <Text style={{ color: '#39A3FF', fontSize: 13, fontWeight: 'bold' }}>đăng ký tài khoản mới</Text>
            </View>
            <Text style={{ color: '#666666', fontSize: 13, marginBottom: 6 }}>2. Miễn phí vận chuyển cho đơn từ 5.000.000đ</Text>
            <Text style={{ color: '#666666', fontSize: 13, marginBottom: 6 }}>3. Hỗ trợ lắp đặt cho đồ điện tử điện máy và viễn thông</Text>
            <View style={{ flexDirection: 'row', marginBottom: 6, flexWrap: 'wrap' }}>
              <Text style={{ color: '#666666', fontSize: 13 }}>4. Chương trình trả góp ưu đãi </Text>
              <Text style={{ color: '#39A3FF', fontSize: 13, fontWeight: 'bold' }}>5 KHÔNG</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 6, flexWrap: 'wrap' }}>
              <Text style={{ color: '#666666', fontSize: 13 }}>5. Giảm đến 20% tối đa 5 triệu khi thanh toán qua thẻ tín dụng </Text>
              <Text style={{ color: '#39A3FF', fontSize: 13, fontWeight: 'bold' }}>EzCare Credit</Text>
            </View>
            <Text style={{ color: '#666666', fontSize: 13, marginBottom: 6 }}>6. Hư gì đổi nấy 12 tháng tận nhà (miễn phí tháng đầu)</Text>
            
            <TouchableOpacity>
              <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 13, textDecorationLine: 'underline', marginTop: 4 }}>
                Chính sách bảo hành
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dealer Section */}
        <View style={{ 
          backgroundColor: '#FFFFFF',
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#E0E0E0'
        }}>
          {/* Row 1: Avatar + Info + Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={require('@/assets/images/product_detail/avatar_daily.png')}
              style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF9149' }}>
                ĐẠI LÝ MINH MẪN
              </Text>
              <Text style={{ fontSize: 11, color: '#999999' }}>
                Online 5 phút trước
              </Text>
              <Text style={{ fontSize: 11, color: '#666666' }}>
                TP. Hồ Chí Minh
              </Text>
            </View>
            {/* Stats */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
              <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>210</Text>
                <Text style={{ fontSize: 10, color: '#999' }}>Sản phẩm</Text>
              </View>
              <View style={{ width: 1, height: 24, backgroundColor: '#E0E0E0' }} />
              <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>4.8</Text>
                <Text style={{ fontSize: 10, color: '#999' }}>Đánh giá</Text>
              </View>
            </View>
            {/* View Button */}
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: '#39A3FF',
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 10
            }}>
              <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 11 }}>Xem đại lý</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Specifications Section */}
        <View style={{ 
          marginHorizontal: 16, 
          marginBottom: 16,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
            <TouchableOpacity style={{ 
              flex: 1, 
              paddingVertical: 14, 
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: '#39A3FF'
            }}>
              <Text style={{ 
                color: '#39A3FF', 
                fontWeight: 'bold',
                fontSize: 13
              }}>
                THÔNG SỐ KỸ THUẬT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, paddingVertical: 14, alignItems: 'center' }}>
              <Text style={{ color: '#666666', fontSize: 13 }}>THÔNG TIN SẢN PHẨM</Text>
            </TouchableOpacity>
          </View>

          {/* Specs Content - 2 columns */}
          <View style={{ flexDirection: 'row', padding: 16 }}>
            {/* Left - Image */}
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Image 
                source={require('@/assets/images/product_detail/information.png')}
                style={{ width: '100%', height: 280 }}
                resizeMode="contain"
              />
            </View>

            {/* Right - Specs Table */}
            <View style={{ flex: 1, paddingLeft: 8 }}>
              {[
                { label: 'Model:', value: 'K-75XR90' },
                { label: 'Màu sắc:', value: 'Đen' },
                { label: 'Nhà sản xuất:', value: 'Sony' },
                { label: 'Xuất xứ sản phẩm:', value: 'Malaysia' },
                { label: 'Năm ra mắt:', value: '2024' },
                { label: 'Thời gian bảo hành:', value: '24 tháng' },
                { label: 'Địa điểm bảo hành:', value: 'Đại lý Minh Mẫn' },
                { label: 'Loại Tivi:', value: 'Tivi Mini LED' },
                { label: 'Kích thước màn hình:', value: '75 inch' },
                { label: 'Độ phân giải:', value: '4K (UHD)' },
              ].map((spec, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={{ color: '#999999', fontSize: 11 }}>{spec.label}</Text>
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '500' }}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* View More Button */}
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <TouchableOpacity style={{
              backgroundColor: '#39A3FF',
              borderRadius: 24,
              paddingVertical: 12,
              alignItems: 'center'
            }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Xem thêm thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer for bottom buttons */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0'
      }}>
        {/* Add to Cart & Buy Now */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          <TouchableOpacity 
            onPress={addToCart}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#FF9149',
              borderRadius: 24,
              paddingVertical: 12,
              gap: 8
            }}
          >
            <MaterialIcons name="shopping-cart" size={20} color="#FF9149" />
            <Text style={{ color: '#FF9149', fontWeight: 'bold' }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FF9149',
              borderRadius: 24,
              paddingVertical: 12
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Mua ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Installment Button */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#39A3FF',
            borderRadius: 24,
            paddingVertical: 12,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
            Mua trả góp
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 2 }}>
            Qua thẻ tín dụng, nhà tài chính, mua trước trả sau
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
