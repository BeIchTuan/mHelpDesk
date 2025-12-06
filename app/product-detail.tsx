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
          backgroundColor: '#FFFAF6', 
          marginHorizontal: 16,
          borderRadius: 12,
          marginBottom: 16,
          marginTop: 8,
          paddingTop: 32,
          padding: 16,
          borderWidth: 1,
          borderColor: '#E8E0D8',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {/* Tag ưu đãi - positioned at top */}
          <Image 
            source={require('@/assets/images/product_detail/Tag ưu đãi.png')}
            style={{ 
              position: 'absolute',
              top: 4,
              left: -8,
              width: '58%',
              height: 32
            }}
            resizeMode="contain"
          />

          {/* Content */}
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', marginBottom: 6, flexWrap: 'wrap' }}>
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
              <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 13, marginTop: 4 }}>
                Chính sách bảo hành
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dealer Section */}
        <View style={{ 
          backgroundColor: '#FFFAF6',
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#E8E0D8',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <Image 
              source={require('@/assets/images/product_detail/avatar_daily.png')}
              style={{ width: 44, height: 44, borderRadius: 8, marginRight: 8 }}
              resizeMode="cover"
            />
            
            {/* Info + Stats */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#39A3FF' }}>
                ĐẠI LÝ MINH MẪN
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 9, color: '#999999' }}>Online 5 phút trước</Text>
                  <Text style={{ fontSize: 9, color: '#666666' }}>TP. Hồ Chí Minh</Text>
                </View>
                {/* Stats - nằm cạnh Online/TPHCM */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <View style={{ width: 1, height: 24, backgroundColor: '#E0E0E0' }} />
                  <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#39A3FF' }}>210</Text>
                    <Text style={{ fontSize: 8, color: '#999' }}>Sản phẩm</Text>
                  </View>
                  <View style={{ width: 1, height: 24, backgroundColor: '#E0E0E0' }} />
                  <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#39A3FF' }}>4.8</Text>
                    <Text style={{ fontSize: 8, color: '#999' }}>Đánh giá</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* View Button */}
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: '#FF9149',
              borderRadius: 6,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}>
              <Text style={{ color: '#FF9149', fontWeight: 'bold', fontSize: 10 }}>Xem đại lý</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Specifications Section */}
        <View style={{ 
          marginHorizontal: 16, 
          marginBottom: 16,
          backgroundColor: '#FFFAF6',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E8E0D8',
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {/* Headers */}
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 12 }}>
                THÔNG SỐ KỸ THUẬT
              </Text>
              <View style={{ width: 95, height: 2, backgroundColor: '#39A3FF', marginTop: 4 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: '#666666', fontSize: 12 }}>
                THÔNG TIN SẢN PHẨM
              </Text>
            </View>
          </View>

          {/* Content - 2 columns */}
          <View style={{ flexDirection: 'row' }}>
            {/* Left - Image (59% theo Figma: 209/354) */}
            <View style={{ width: '59%' }}>
              <Image 
                source={require('@/assets/images/product_detail/information.png')}
                style={{ width: 209, height: 157 }}
                resizeMode="contain"
              />
            </View>

            {/* Right - Specs Table (41%) */}
            <View style={{ width: '41%' }}>
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
                <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={{ color: '#999999', fontSize: 9, width: 55 }} numberOfLines={2}>{spec.label}</Text>
                  <Text style={{ color: '#333333', fontSize: 9, fontWeight: '500', flex: 1 }}>{spec.value}</Text>
                </View>
              ))}

              {/* View More Button */}
              <TouchableOpacity style={{
                backgroundColor: '#39A3FF',
                borderRadius: 16,
                paddingVertical: 8,
                alignItems: 'center',
                marginTop: 8
              }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 11 }}>Xem thêm thông tin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Review Section */}
        <View style={{ 
          marginHorizontal: 16, 
          marginBottom: 16,
          backgroundColor: '#FFFAF6',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E8E0D8',
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {/* Header */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 12 }}>
              ĐÁNH GIÁ SẢN PHẨM
            </Text>
            <View style={{ width: 95, height: 2, backgroundColor: '#39A3FF', marginTop: 4 }} />
          </View>

          {/* Rating Overview */}
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {/* Left - Overall Score */}
            <View style={{ width: '40%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Image 
                  source={require('@/assets/images/product_detail/star.png')}
                  style={{ width: 16, height: 16, marginRight: 4 }}
                />
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333' }}>5</Text>
                <Text style={{ fontSize: 16, color: '#999' }}>/5</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#666', marginTop: 4 }}>151 khách hài lòng</Text>
              <Text style={{ fontSize: 10, color: '#999' }}>1 đánh giá</Text>
            </View>

            {/* Right - Rating Bars */}
            <View style={{ width: '60%', paddingLeft: 16 }}>
              {[
                { stars: 5, percent: 100 },
                { stars: 4, percent: 0 },
                { stars: 3, percent: 0 },
                { stars: 2, percent: 0 },
                { stars: 1, percent: 0 },
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontSize: 10, color: '#666', width: 14 }}>{item.stars}</Text>
                  <Image 
                    source={require('@/assets/images/product_detail/star.png')}
                    style={{ width: 10, height: 10, marginRight: 6 }}
                  />
                  <View style={{ flex: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginRight: 8 }}>
                    <View style={{ 
                      width: `${item.percent}%`, 
                      height: '100%', 
                      backgroundColor: '#39A3FF', 
                      borderRadius: 4 
                    }} />
                  </View>
                  <Text style={{ fontSize: 10, color: '#666', width: 30, textAlign: 'right' }}>{item.percent}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#E8E0D8', marginBottom: 12 }} />

          {/* Review Item */}
          <View style={{ marginBottom: 12 }}>
            {/* Reviewer Name */}
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>Chị Ba Bie</Text>
            
            {/* Stars & Date */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', marginRight: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image 
                    key={star}
                    source={require('@/assets/images/product_detail/star.png')}
                    style={{ width: 12, height: 12, marginRight: 2 }}
                  />
                ))}
              </View>
              <View style={{ width: 1, height: 12, backgroundColor: '#E0E0E0', marginRight: 8 }} />
              <Text style={{ fontSize: 10, color: '#999' }}>18/08/2024 10:30</Text>
            </View>

            {/* Review Tags */}
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>
                Chất lượng sản phẩm: <Text style={{ fontWeight: 'bold', color: '#333' }}>rất tốt</Text>
              </Text>
              <Text style={{ fontSize: 11, color: '#666' }}>
                Đúng với mô tả: <Text style={{ fontWeight: 'bold', color: '#333' }}>hàng y như ảnh</Text>
              </Text>
            </View>

            {/* Review Content */}
            <Text style={{ fontSize: 11, color: '#333', lineHeight: 18 }}>
              Nhân viên nói chuyện dễ thương nhiệt tình, nón xinh xĩu với cưng lắm luôn á mà còn giao hàng nhanh. Lần sau sẽ tiếp tục ủng hộ shop!
            </Text>
          </View>

          {/* Write Review Button */}
          <TouchableOpacity style={{
            backgroundColor: '#39A3FF',
            borderRadius: 20,
            paddingVertical: 12,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>Viết đánh giá</Text>
          </TouchableOpacity>
        </View>

        {/* Related Products Section */}
        <View style={{ marginBottom: 16 }}>
          {/* Header */}
          <View style={{ 
            paddingVertical: 12, 
            paddingHorizontal: 16,
            marginBottom: 12
          }}>
            <Text style={{ color: '#39A3FF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
              CÓ THỂ BẠN SẼ QUAN TÂM
            </Text>
          </View>

          {/* Products Grid */}
          <View style={{ paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[
              { 
                id: '1', 
                name: 'Máy giặt AQUA Inverter 11kg', 
                currentPrice: '29.990.000', 
                originalPrice: '34.490.000',
                discount: '-24%',
                rating: 4.8,
                sold: 'Đã bán 2,4k',
                image: require('@/assets/images/muasam/sanphambanchay/ảnh_máy giặt .png'),
                hasNewTag: true
              },
              { 
                id: '2', 
                name: 'Máy rửa chén Sanaky 13 bộ', 
                currentPrice: '12.650.000', 
                originalPrice: '14.990.000',
                discount: '-16%',
                rating: 4.9,
                sold: 'Đã bán 1,7k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy rửa chén.png'),
                hasNewTag: true
              },
              { 
                id: '3', 
                name: 'LG Inverter 335 lít', 
                currentPrice: '10.640.000', 
                originalPrice: '14.690.000',
                discount: '-27%',
                rating: 4.6,
                sold: 'Đã bán 16k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
                hasNewTag: false
              },
              { 
                id: '4', 
                name: 'Bravia 9 Tivi Mini LED Sony 75 inch', 
                currentPrice: '75.650.000', 
                originalPrice: '95.990.000',
                discount: '-20%',
                rating: 5,
                sold: 'Đã bán 6k+',
                image: require('@/assets/images/Ảnh_Tivi.png'),
                hasNewTag: true
              },
              { 
                id: '5', 
                name: 'Máy nước nóng trực tiếp Ferroli', 
                currentPrice: '1.800.000', 
                originalPrice: '1.990.000',
                discount: '-13%',
                rating: 4.9,
                sold: 'Đã bán 52k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy nước nóng.png'),
                hasNewTag: true
              },
              { 
                id: '6', 
                name: 'Tủ cấp đông Sanaky Inverter 305 lít', 
                currentPrice: '8.490.000', 
                originalPrice: '9.650.000',
                discount: '-13%',
                rating: 4.9,
                sold: 'Đã bán 31k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tủ đông.png'),
                hasNewTag: false
              },
              { 
                id: '7', 
                name: 'Máy giặt AQUA Inverter 11kg', 
                currentPrice: '29.990.000', 
                originalPrice: '34.490.000',
                discount: '-24%',
                rating: 4.8,
                sold: 'Đã bán 2,4k',
                image: require('@/assets/images/muasam/sanphambanchay/ảnh_máy giặt .png'),
                hasNewTag: true
              },
              { 
                id: '8', 
                name: 'Máy rửa chén Sanaky 13 bộ', 
                currentPrice: '12.650.000', 
                originalPrice: '14.990.000',
                discount: '-16%',
                rating: 4.9,
                sold: 'Đã bán 1,7k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy rửa chén.png'),
                hasNewTag: true
              },
              { 
                id: '9', 
                name: 'LG Inverter 335 lít', 
                currentPrice: '10.640.000', 
                originalPrice: '14.690.000',
                discount: '-27%',
                rating: 4.6,
                sold: 'Đã bán 16k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_tủ lạnh.png'),
                hasNewTag: false
              },
              { 
                id: '10', 
                name: 'Bravia 9 Tivi Mini LED Sony 75 inch', 
                currentPrice: '75.650.000', 
                originalPrice: '95.990.000',
                discount: '-20%',
                rating: 5,
                sold: 'Đã bán 6k+',
                image: require('@/assets/images/Ảnh_Tivi.png'),
                hasNewTag: true
              },
              { 
                id: '11', 
                name: 'Máy nước nóng trực tiếp Ferroli', 
                currentPrice: '1.800.000', 
                originalPrice: '1.990.000',
                discount: '-13%',
                rating: 4.9,
                sold: 'Đã bán 52k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Máy nước nóng.png'),
                hasNewTag: true
              },
              { 
                id: '12', 
                name: 'Tủ cấp đông Sanaky Inverter 305 lít', 
                currentPrice: '8.490.000', 
                originalPrice: '9.650.000',
                discount: '-13%',
                rating: 4.9,
                sold: 'Đã bán 31k',
                image: require('@/assets/images/muasam/sanphambanchay/Ảnh_Tủ đông.png'),
                hasNewTag: false
              },
            ].map((product) => (
              <TouchableOpacity
                key={product.id}
                style={{ 
                  width: '48%', 
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 12,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}
                onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}
              >
                {/* Discount badge */}
                <View style={{ 
                  position: 'absolute', 
                  top: 8, 
                  left: 8, 
                  zIndex: 10,
                  backgroundColor: '#FFF0E6',
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  paddingVertical: 2
                }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#FF9149' }}>
                    {product.discount}
                  </Text>
                </View>
                
                {/* Product Image */}
                <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Image
                    source={product.image}
                    style={{ width: '100%', height: 100 }}
                    resizeMode="contain"
                  />
                </View>
                
                {/* Product Name */}
                <Text 
                  numberOfLines={2}
                  style={{ fontSize: 12, color: '#7EC8F5', lineHeight: 16, marginBottom: 4 }}
                >
                  {product.name}
                </Text>
                
                {/* Price */}
                <View style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FF9149' }}>
                    {product.currentPrice}đ
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 10, color: '#999999', textDecorationLine: 'line-through', marginRight: 6 }}>
                      {product.originalPrice}đ
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: '#FF4444' }}>
                      {product.discount}
                    </Text>
                  </View>
                </View>
                
                {/* Tags */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                  {product.hasNewTag && (
                    <View style={{ 
                      borderWidth: 1, 
                      borderColor: '#FF9149', 
                      backgroundColor: '#FFFFFF',
                      borderRadius: 4,
                      paddingHorizontal: 6,
                      paddingVertical: 2
                    }}>
                      <Text style={{ fontSize: 9, fontWeight: '500', color: '#FF9149' }}>
                        Mẫu mới
                      </Text>
                    </View>
                  )}
                  <View style={{ 
                    backgroundColor: '#FF9149',
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    paddingVertical: 2
                  }}>
                    <Text style={{ fontSize: 9, fontWeight: '500', color: '#FFFFFF' }}>
                      Trả trước 0đ
                    </Text>
                  </View>
                </View>
                
                {/* Rating */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image 
                    source={require('@/assets/images/product_detail/star.png')}
                    style={{ width: 12, height: 12, marginRight: 4 }}
                  />
                  <Text style={{ fontSize: 10, color: '#7EC8F5', fontWeight: '600' }}>
                    {product.rating}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#7EC8F5', marginLeft: 4 }} numberOfLines={1}>
                    - {product.sold}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
              backgroundColor: 'rgba(176, 212, 242, 0.3)',
              borderRadius: 24,
              paddingVertical: 12,
              gap: 8
            }}
          >
            <MaterialIcons name="shopping-cart" size={20} color="#39A3FF" />
            <Text style={{ color: '#39A3FF', fontWeight: 'bold' }}>Thêm vào giỏ hàng</Text>
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
