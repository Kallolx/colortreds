import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    // TODO: Implement login logic
    router.replace('/(tabs)');
  };

  const navigateToSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      {/* Top curved section with yellow background */}
      <View style={[styles.topSection, { paddingTop: insets.top }]}>
        <View style={styles.brandContainer}>
          <View style={styles.logoIcon}>
            <View style={styles.logoInner} />
          </View>
        </View>
      </View>

      {/* Bottom white section with form */}
      <View style={styles.bottomSection}>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.appTitle}>ColorTrade</Text>
            <Text style={styles.subtitle}>Daily Color Racing - Login to continue</Text>
            
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Enter your email</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Enter your password</Text>
              </View>
              
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.signupButton} onPress={navigateToSignup}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topSection: {
    flex: 0.35,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  brandContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoInner: {
    width: 50,
    height: 50,
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
  },
  bottomSection: {
    flex: 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginTop: -30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
  },
  formContainer: {
    paddingHorizontal: 30,
    minHeight: '100%',
  },
  appTitle: {
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  placeholder: {
    color: '#6c757d',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  loginButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
    paddingVertical: 18,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#FF8C00',
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 15,
  },
  signupButtonText: {
    color: '#FF8C00',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
  },
});
