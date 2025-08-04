import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  userBalance: number;
}

export default function AppHeader({ userBalance }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 0 }]}>
      <View style={styles.headerLeft}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: '#000000' }]}>ColorTrades</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>${userBalance.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Outfit-Bold',
    marginTop: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#007AFF',
  },
});
