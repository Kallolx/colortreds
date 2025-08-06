import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  userBalance: number;
}

export default function AppHeader({ userBalance }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  // Helper to convert English digits to Bengali
  const toBengaliNumber = (num: number) =>
    num
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <View style={styles.headerContent}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/images/app-logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceContainer}>
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
    backgroundColor: '#ff8c00',
    paddingHorizontal: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    borderColor: '#ffffff',
  },
  balanceAmount: {
    fontSize: 18,
    fontFamily: 'HindSiliguri-Bold',
    color: '#ffffff',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
});