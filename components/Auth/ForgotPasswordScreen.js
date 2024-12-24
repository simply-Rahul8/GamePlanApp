import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>
      <Text style={styles.subheading}>
        Please enter your email address and new password to reset your password.
      </Text>

      {/* Email Input */}
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPassword}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f8fc' },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subheading: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: { flex: 1, fontSize: 16 },
  showPassword: { fontSize: 16, color: '#666' },
  resetButton: {
    backgroundColor: '#36aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
