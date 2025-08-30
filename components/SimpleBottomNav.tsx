import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

type ActiveTab = 'home' | 'wallet' | 'profile';

interface SimpleBottomNavProps {
  activeTab: ActiveTab;
  onTabPress: (tab: ActiveTab) => void;
}

const TradeIcon = ({ size = 24, color = "#666" }: { size?: number; color?: string }) => (
  <Image
    source={require("../assets/images/trade.png")}
    style={{
      width: size,
      height: size,
      tintColor: color,
    }}
    resizeMode="contain"
  />
);

export default function SimpleBottomNav({ activeTab, onTabPress }: SimpleBottomNavProps) {
  const insets = useSafeAreaInsets();
  const renderSideTab = (tab: ActiveTab, icon: string, label: string) => {
    const isActive = activeTab === tab;
    const color = isActive ? '#ffffff' : '#000';

    return (
      <TouchableOpacity
        key={tab}
        style={styles.tab}
        onPress={() => onTabPress(tab)}
      >
        <Ionicons name={icon as any} size={32} color={color} />
        <Text style={[styles.label, { color }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      {/* Safe area background */}
      <View style={[styles.safeAreaBackground, { height: Math.max(insets.bottom, 20) }]} />
      
      {/* Curved Background with SVG */}
      <View style={styles.curvedContainer}>
        <Svg
          width="100%"
          height="80"
          viewBox="0 0 375 80"
          style={styles.svgCurve}
          preserveAspectRatio="none"
        >
          <Path
            d="M0,0 L110,0 Q140,0 150,25 Q160,50 187.5,50 Q215,50 225,25 Q235,0 265,0 L375,0 L375,80 L0,80 Z"
            fill="#ff8c00"
          />
        </Svg>
        
        {/* Tab Items */}
        <View style={styles.tabContainer}>
          {renderSideTab('wallet', 'wallet-outline', 'ওয়ালেট')}
          
          {/* Center elevated button */}
          <View style={styles.centerButtonContainer}>
            <TouchableOpacity
              style={styles.centerButton}
              onPress={() => onTabPress('home')}
            >
              <TradeIcon size={36} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {renderSideTab('profile', 'person-outline', 'প্রোফাইল')}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  safeAreaBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff8c00',
  },
  curvedContainer: {
    position: 'relative',
  },
  svgCurve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 24,
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ff8c00',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    // Add shadow effects to make it look like it's floating and emitting shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: 'NotoSerifBengali-Bold',
    textAlign: 'center',
    marginTop: 0,
  },
});
