import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  userBalance: number;
  activeTab: 'trade' | 'wallet' | 'profile';
}

export default function AppHeader({ userBalance, activeTab }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  // Helper to convert English digits to Bengali
  const toBengaliNumber = (num: number) =>
    Math.floor(num)
      .toLocaleString('en-US')
      .replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);

  // Get page title and icon based on active tab
  const getPageContent = () => {
    switch (activeTab) {
      case 'wallet':
        return {
          title: 'ওয়ালেট',
          icon: (
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.pageIcon} 
              resizeMode="contain" 
            />
          )
        };
      case 'profile':
        return {
          title: 'প্রোফাইল',
          icon: (
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.pageIcon} 
              resizeMode="contain" 
            />
          )
        };
      default:
        return null; // Show logo for trade/home page
    }
  };

  const pageContent = getPageContent();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <View style={styles.headerContent}>
        {/* Logo/Title Section */}
        <View style={styles.logoSection}>
          {pageContent ? (
            <View style={styles.titleContainer}>
              {pageContent.icon}
              <Text style={styles.pageTitle}>{pageContent.title}</Text>
            </View>
          ) : (
            <Image 
              source={require('../assets/images/app-logo.png')} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
          )}
        </View>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceContainer}>
            <Image 
              source={require('../assets/images/icons/coin.png')} 
              style={styles.coinIcon} 
            />
            <Text style={styles.balanceAmount}>
              ৳{toBengaliNumber(userBalance)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFF00',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    justifyContent: 'flex-start',
  },
  logoImage: {
    height: 38, // Fixed height, width will adjust based on aspect ratio
    maxWidth: 200, // Maximum width to prevent it from being too large
  },
  pageIcon: {
    width: 38,
    height: 38,
  },
  titleContainer: {
    flexDirection: 'row',
    marginLeft: 6,
    alignItems: 'center',
    gap: 2,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'HindSiliguri-Bold',
    color: '#000',
    textAlign: 'left',
  },
  balanceSection: {
    alignItems: 'flex-end',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eb01f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingEnd: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  balanceAmount: {
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
    color: '#000',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
});