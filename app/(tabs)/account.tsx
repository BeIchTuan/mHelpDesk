import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

// Quick action button data
const QUICK_ACTIONS = [
    {
        id: 'orders',
        icon: require('@/assets/images/account/order.png'),
        label: 'Đơn hàng',
    },
    {
        id: 'vouchers',
        icon: require('@/assets/images/account/voucher.png'),
        label: 'Khuyến mãi',
    },
    {
        id: 'wishlist',
        icon: require('@/assets/images/account/wishlist.png'),
        label: 'Yêu thích',
    },
];

// Menu items for "Cài đặt tài khoản" section
const ACCOUNT_SETTINGS = [
    {
        id: 'payment',
        icon: require('@/assets/images/account/payment.png'),
        label: 'Phương thức thanh toán',
        route: '/payment-methods',
    },
    {
        id: 'address',
        icon: require('@/assets/images/account/local.png'),
        label: 'Địa chỉ',
        route: '/addresses',
    },
    {
        id: 'security',
        icon: require('@/assets/images/account/security.png'),
        label: 'Bảo mật và Mật khẩu',
        route: '/security',
    },
];

// Menu items for "Hỗ trợ và Khác" section
const SUPPORT_ITEMS = [
    {
        id: 'help',
        icon: require('@/assets/images/account/help.png'),
        label: 'Trung tâm hỗ trợ',
        route: '/help-center',
    },
    {
        id: 'terms',
        icon: require('@/assets/images/account/privacy.png'),
        label: 'Điều khoản và Chính sách',
        route: '/terms',
    },
    {
        id: 'about',
        icon: require('@/assets/images/account/about_app.png'),
        label: 'Giới thiệu về EzCare',
        route: '/about',
    },
];

interface QuickActionProps {
    icon: any;
    label: string;
    onPress: () => void;
}

const QuickActionButton: React.FC<QuickActionProps> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.quickActionIconContainer}>
            <Image source={icon} style={styles.quickActionIcon} resizeMode="contain" />
        </View>
        <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
);

interface MenuItemProps {
    icon: any;
    label: string;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.menuItemLeft}>
            <Image source={icon} style={styles.menuItemIcon} resizeMode="contain" />
            <Text style={styles.menuItemLabel}>{label}</Text>
        </View>
        <Image
            source={require('@/assets/images/account/Line.png')}
            style={styles.arrowIcon}
            resizeMode="contain"
        />
    </TouchableOpacity>
);

export default function AccountScreen() {
    const handleQuickAction = (actionId: string) => {
        console.log('Quick action pressed:', actionId);
    };

    const handleMenuItemPress = (route: string) => {
        console.log('Menu item pressed:', route);
    };

    const handleLogout = () => {
        console.log('Logout pressed');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <SafeAreaView style={styles.safeArea}>
                {/* Header - nằm dưới status bar */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>TÀI KHOẢN</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Section - Rectangle + Avatar ở giữa */}
                    <View style={styles.profileSection}>
                        {/* Blue Rectangle Background */}
                        <Image
                            source={require('@/assets/images/account/Rectangle 2.png')}
                            style={styles.profileRectangle}
                            resizeMode="stretch"
                        />
                        {/* Avatar (chứa cả avatar + tên + thông tin) - căn giữa */}
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={require('@/assets/images/account/Avatar.png')}
                                style={styles.avatar}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Quick Actions Row */}
                    <View style={styles.quickActionsContainer}>
                        {QUICK_ACTIONS.map((action) => (
                            <QuickActionButton
                                key={action.id}
                                icon={action.icon}
                                label={action.label}
                                onPress={() => handleQuickAction(action.id)}
                            />
                        ))}
                    </View>

                    {/* Account Settings Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
                        <View style={styles.menuContainer}>
                            {ACCOUNT_SETTINGS.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    onPress={() => handleMenuItemPress(item.route)}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Support Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hỗ trợ và Khác</Text>
                        <View style={styles.menuContainer}>
                            {SUPPORT_ITEMS.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    onPress={() => handleMenuItemPress(item.route)}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </TouchableOpacity>

                    {/* Bottom spacing */}
                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// Kích thước theo thiết kế Figma
const RECTANGLE_HEIGHT = 103;
const AVATAR_WIDTH = 328;
const AVATAR_HEIGHT = 100;
const HORIZONTAL_PADDING = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingTop: STATUSBAR_HEIGHT + 16, // Status bar height + padding
        paddingBottom: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#39A3FF',
        letterSpacing: 0.5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    // Profile Section
    profileSection: {
        position: 'relative',
        height: RECTANGLE_HEIGHT + (AVATAR_HEIGHT / 2),
        marginBottom: 16,
    },
    profileRectangle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: RECTANGLE_HEIGHT,
        borderRadius: 16,
    },
    avatarWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: RECTANGLE_HEIGHT / 2, // Bắt đầu từ giữa rectangle
        alignItems: 'center', // Căn giữa theo chiều ngang
    },
    avatar: {
        width: AVATAR_WIDTH,
        height: AVATAR_HEIGHT,
    },
    // Quick Actions Styles
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingHorizontal: 8,
    },
    quickActionButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(176, 212, 242, 0.2)',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#39A3FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        minWidth: 95,
    },
    quickActionIconContainer: {
        marginBottom: 6,
    },
    quickActionIcon: {
        width: 28,
        height: 28,
        tintColor: '#39A3FF',
    },
    quickActionLabel: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '500',
    },
    // Section Styles
    section: {
        marginTop: 20,
        paddingHorizontal: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF9149',
        marginBottom: 8,
    },
    menuContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
    },
    // Menu Item Styles
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemIcon: {
        width: 20,
        height: 20,
        tintColor: '#39A3FF',
        marginRight: 12,
    },
    menuItemLabel: {
        fontSize: 14,
        color: '#39A3FF',
        fontWeight: '400',
    },
    arrowIcon: {
        width: 8,
        height: 14,
        tintColor: '#39A3FF',
    },
    // Logout Button Styles
    logoutButton: {
        marginTop: 20,
        marginHorizontal: 48,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#FF9149',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF9149',
    },
    bottomSpacing: {
        height: 24,
    },
});
