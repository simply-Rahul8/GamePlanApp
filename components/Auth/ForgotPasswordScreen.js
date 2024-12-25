import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Success', 'Password reset successful! You can now log in with your new password.');
    // Add backend reset password logic here
  };

  return (
    <LinearGradient
      colors={['#171717', '#444444']} // Consistent gradient colors
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subheading}>
            Let’s help you reset your password and get back on track!
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Stay Active, Stay Ahead!</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EDEDED',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subheading: {
    fontSize: 14,
    color: '#EDEDED',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#EDEDED',
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#444444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#EDEDED',
  },
  showPassword: {
    fontSize: 16,
    color: '#DA0037',
    marginLeft: 10,
  },
  resetButton: {
    backgroundColor: '#DA0037',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#DA0037',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  resetButtonText: {
    color: '#EDEDED',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#EDEDED',
    fontStyle: 'italic',
  },
});
