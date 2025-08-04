import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.colorStripes}>
          <View style={[styles.stripe, styles.yellowStripe]} />
          <View style={[styles.stripe, styles.purpleStripe]} />
          <View style={[styles.stripe, styles.orangeStripe]} />
        </View>
        <Text style={styles.title}>Color Trade</Text>
        <Text style={styles.subtitle}>Daily Color Racing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
  },
  colorStripes: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stripe: {
    width: 60,
    height: 80,
  },
  yellowStripe: {
    backgroundColor: '#FFD700',
  },
  purpleStripe: {
    backgroundColor: '#8A2BE2',
  },
  orangeStripe: {
    backgroundColor: '#FF8C00',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    textAlign: 'center',
  },
});
