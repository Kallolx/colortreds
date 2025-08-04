import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BottomNavigationProps {
  activeTab?: 'wallet' | 'trade' | 'profile';
  onTabPress?: (tab: 'wallet' | 'trade' | 'profile') => void;
}

export default function BottomNavigation({ activeTab = 'trade', onTabPress }: BottomNavigationProps) {
  const handleTabPress = (tab: 'wallet' | 'trade' | 'profile') => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navItem, activeTab === 'wallet' && styles.activeNavItem]} 
        onPress={() => handleTabPress('wallet')}
      >
        <Text style={styles.navIcon}>💰</Text>
        <Text style={[styles.navLabel, activeTab === 'wallet' && styles.activeNavLabel]}>
          Wallet
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeTab === 'trade' && styles.activeNavItem]} 
        onPress={() => handleTabPress('trade')}
      >
        <Text style={styles.navIcon}>🎯</Text>
        <Text style={[styles.navLabel, activeTab === 'trade' && styles.activeNavLabel]}>
          Trade
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]} 
        onPress={() => handleTabPress('profile')}
      >
        <Text style={styles.navIcon}>👤</Text>
        <Text style={[styles.navLabel, activeTab === 'profile' && styles.activeNavLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#f0f8ff',
    marginHorizontal: 10,
    borderRadius: 12,
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#666',
  },
  activeNavLabel: {
    color: '#007AFF',
    fontFamily: 'Outfit-SemiBold',
  },
});
