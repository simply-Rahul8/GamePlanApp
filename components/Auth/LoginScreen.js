import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [isTrainer, setIsTrainer] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isTrainer) {
      Alert.alert('Login Successful', 'Welcome Trainer!');
      navigation.navigate('TrainerDashboard');
    } else {
      Alert.alert('Login Successful', 'Welcome Student!');
      navigation.navigate('StudentDashboard');
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
        <Image
  source={require('/Users/suryapothuri/GamePlan/file_2024-12-24_13.37.52.png')}
  style={{
    width: 440, // Increased width
    height: 209, // Increased height
  }}
  resizeMode="contain"
/>

        </View>

        {/* User Role Selection */}
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

        {/* Input Fields */}
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
            <Text style={styles.showPassword}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() =>
            navigation.navigate(isTrainer ? 'TrainerSignUp' : 'StudentSignUp')
          }
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20, justifyContent: 'space-evenly' },
  imageContainer: {
    alignItems: 'center',
  },
  bannerImage: {
    width: 320, // Adjust size for better visibility
    height: 200,
    marginBottom: 10,
  },
  toggleBox: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#DA0037',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#444444',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activeToggle: {
    backgroundColor: '#DA0037',
  },
  toggleText: { fontSize: 16, color: '#EDEDED', fontWeight: 'bold' },
  activeToggleText: { color: '#FFFFFF', fontWeight: 'bold' },
  label: { fontSize: 16, color: '#EDEDED', marginBottom: 10 },
  input: {
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#1E1E1E',
  },
  passwordInput: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  showPassword: { fontSize: 16, color: '#CCCCCC', marginLeft: 10 },
  forgotPassword: { color: '#EDEDED', textAlign: 'right', fontSize: 14 },
  loginButton: {
    backgroundColor: '#DA0037',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  separator: { flexDirection: 'row', alignItems: 'center' },
  line: { flex: 1, height: 1, backgroundColor: '#555555' },
  orText: { marginHorizontal: 10, color: '#EDEDED' },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#EDEDED',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#444444',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  signUpText: { color: '#EDEDED', fontSize: 18, fontWeight: 'bold' },
});
