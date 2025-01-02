import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

export default function LoginScreen({ navigation }) {
  const [isTrainer, setIsTrainer] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        '⚠️ Missing Information',
        'Please fill in all fields before logging in.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (isTrainer) {
        navigation.navigate('TrainerDashboard');
      } else {
        navigation.navigate('StudentDashboard');
      }
    }, 2000);
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/banner.png")}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#DA0037" />
            <Text style={styles.loadingText}>Logging In...</Text>
          </View>
        ) : (
          <>
            <View style={styles.toggleBox}>
              <TouchableOpacity
                style={[styles.toggleButton, isTrainer ? styles.activeToggle : {}]}
                onPress={() => setIsTrainer(true)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    isTrainer ? styles.activeToggleText : {},
                  ]}
                >
                  Trainer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isTrainer ? styles.activeToggle : {}]}
                onPress={() => setIsTrainer(false)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    !isTrainer ? styles.activeToggleText : {},
                  ]}
                >
                  Student
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Username or Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username or email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#CCCCCC"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#CCCCCC"
                
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showPassword}>
                  {showPassword ? '🙈' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() =>
                navigation.navigate(isTrainer ? 'TrainerSignUp' : 'StudentSignUp')
              }
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: screenWidth * 1, // 80% of screen width
    height: screenWidth * 0.6, // Maintain aspect ratio (adjust as needed)
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#EDEDED',
    fontSize: 16,
    fontStyle: 'italic',
  },
  toggleBox: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#DA0037',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#444444',
    marginBottom: 20,
    width: '100%',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: '#DA0037',
  },
  toggleText: { fontSize: 16, color: '#EDEDED', fontWeight: 'bold' },
  activeToggleText: { color: '#FFFFFF', fontWeight: 'bold' },
  label: { fontSize: 16, color: '#EDEDED', alignSelf: 'flex-start', marginBottom: 10 },
  input: {
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 3,
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
    width: '100%',
  },
  passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  showPassword: { fontSize: 16, color: '#CCCCCC', marginLeft: 10 },
  forgotPassword: { color: '#EDEDED', alignSelf: 'flex-end', fontSize: 14, marginBottom: 20 },
  loginButton: {
    backgroundColor: '#DA0037',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  line: { flex: 1, height: 1, backgroundColor: '#555555' },
  orText: { marginHorizontal: 10, color: '#EDEDED' },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#EDEDED',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#444444',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  signUpText: { color: '#EDEDED', fontSize: 18, fontWeight: 'bold' },
});
