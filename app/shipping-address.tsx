import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Colors theo Figma
const COLORS = {
  primary: '#39A3FF',
  secondary: '#B0D4F2',
  background: '#FFFFFF',
  cardBg: '#FFFAF6',
  highlight: '#FF9149',
  text: '#666666',
  white: '#FFFFFF',
  lightGray: '#F0F0F0',
  gray: '#999999',
};

interface AddressItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export default function ShippingAddressScreen() {
  const router = useRouter();
  
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  
  // Mock data theo Figma
  const [addresses] = useState<AddressItem[]>([
    {
      id: '1',
      name: 'Thiên Thanh',
      phone: '0123456789',
      address: 'Kí túc xá khu A ĐHQG, đường Tạ Quang Bửu, khu phố 6, phường Linh Trung, Thành phố Thủ Đức, TP. Hồ Chí Minh',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Thiên Thanh',
      phone: '0123456789',
      address: '123, đường D7, khu phố 6, phường Phú Nhuận, TP. Hồ Chí Minh',
      isDefault: false,
    },
  ]);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleEditAddress = (addressId: string) => {
    // TODO: Navigate to edit address screen
    console.log('Edit address:', addressId);
  };

  const handleAddNewAddress = () => {
    // TODO: Navigate to add address screen
    console.log('Add new address');
  };

  const handleConfirmAddress = () => {
    // Trở về màn hình checkout với địa chỉ đã chọn
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.headerBackBtn}
          >
            <View style={styles.headerBackCircle}>
              <Image 
                source={require('@/assets/images/Vector.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>
            ĐỊA CHỈ NHẬN HÀNG
          </Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/my-items')}
            style={styles.headerHomeBtn}
          >
            <View style={styles.headerHomeCircle}>
              <Ionicons name="home-outline" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {addresses.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.addressCard}
              onPress={() => handleSelectAddress(item.id)}
              activeOpacity={0.7}
            >
              {/* Checkbox */}
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => handleSelectAddress(item.id)}
              >
                <View style={[
                  styles.checkbox,
                  selectedAddressId === item.id && styles.checkboxChecked
                ]}>
                  {selectedAddressId === item.id && (
                    <MaterialIcons name="check" size={14} color={COLORS.white} />
                  )}
                </View>
              </TouchableOpacity>

              {/* Address Info */}
              <View style={styles.addressInfo}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>{item.name}</Text>
                  <Text style={styles.addressPhone}>{item.phone}</Text>
                </View>
                <Text style={styles.addressText}>{item.address}</Text>
                
                {/* Default Tag */}
                {item.isDefault && (
                  <View style={styles.defaultTag}>
                    <Text style={styles.defaultTagText}>Mặc định</Text>
                  </View>
                )}
              </View>

              {/* Edit Button */}
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditAddress(item.id)}
              >
                <View style={styles.editCircle}>
                  <Image 
                    source={require('@/assets/images/product_detail/edit.png')}
                    style={styles.editIcon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          {/* Add New Address Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddNewAddress}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+ Thêm địa chỉ mới</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  headerBackBtn: {
    position: 'absolute',
    left: 16,
  },
  headerBackCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerHomeBtn: {
    position: 'absolute',
    right: 16,
  },
  headerHomeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Address Card
  addressCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // Checkbox
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    borderWidth: 2,
    borderColor: 'rgba(176, 212, 242, 0.5)',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(57, 163, 255, 0.7)',
  },

  // Address Info
  addressInfo: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 10,
  },
  addressPhone: {
    fontSize: 12,
    color: COLORS.text,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
  },

  // Default Tag
  defaultTag: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 209, 209, 0.5)',
    borderWidth: 1,
    borderColor: COLORS.highlight,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  defaultTagText: {
    fontSize: 10,
    color: COLORS.highlight,
  },

  // Edit Button
  editButton: {
    marginLeft: 8,
  },
  editCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(176, 212, 242, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 16,
    height: 16,
  },

  // Add Button
  addButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
