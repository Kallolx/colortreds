import { StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Page</Text>
        <Text style={styles.subtitle}>Coming Soon - Profile features will be added here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
