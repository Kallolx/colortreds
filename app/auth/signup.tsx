import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSignup = () => {
    // TODO: Implement signup logic
    router.replace('/(tabs)');
  };

  const navigateToLogin = () => {
    router.back();
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload logic
    console.log('Image upload clicked');
  };

  return (
    <View style={styles.container}>
      {/* Top curved section with purple background */}
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
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 30 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.appTitle}>Color Trade</Text>
            <Text style={styles.subtitle}>Daily Color Racing - Create account</Text>
            
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Full Name</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Email Address</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Password</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Confirm Password</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Sex (Male/Female/Other)</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Date of Birth (DD/MM/YYYY)</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Referral Code (Optional)</Text>
              </View>

              {/* Profile Image Upload Section */}
              <View style={styles.imageUploadSection}>
                <Text style={styles.imageUploadLabel}>Profile Picture</Text>
                <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
                  <View style={styles.imageUploadPlaceholder}>
                    <Text style={styles.imageUploadIcon}>📷</Text>
                    <Text style={styles.imageUploadText}>Upload Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Create Account</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                <Text style={styles.loginButtonText}>Already have account? Log In</Text>
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
    flex: 0.3,
    backgroundColor: '#8A2BE2',
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
    backgroundColor: '#FFD700',
    borderRadius: 25,
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginTop: -30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 30,
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
    marginBottom: 30,
  },
  form: {
    gap: 15,
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
  signupButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    paddingVertical: 18,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#8A2BE2',
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
  },
  imageUploadSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageUploadLabel: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageUploadButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageUploadPlaceholder: {
    alignItems: 'center',
  },
  imageUploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#6c757d',
    fontFamily: 'Outfit-Medium',
  },
});
