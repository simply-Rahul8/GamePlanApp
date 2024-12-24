import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function StudentSignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [trainerID, setTrainerID] = useState('');
  const [address, setAddress] = useState('');
  const [sport, setSport] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all mandatory fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Student account created successfully!');
    navigation.navigate('Login'); // Redirect to login screen after successful sign-up
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Student Sign Up</Text>
      <Text style={styles.subheading}>Create your student profile</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Age */}
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      {/* Email Address */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Trainer ID */}
      <Text style={styles.label}>Trainer ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your trainer ID"
        value={trainerID}
        onChangeText={setTrainerID}
      />

      {/* Address */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Sport */}
      <Text style={styles.label}>Sport</Text>
      <TextInput
        style={styles.input}
        placeholder="Select your sport"
        value={sport}
        onChangeText={setSport}
      />

      {/* Emergency Contact */}
      <Text style={styles.label}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter emergency contact number"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        keyboardType="phone-pad"
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      {/* Already Have an Account */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirect}>Already have an account? Log in here.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subheading: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  signupButton: {
    backgroundColor: '#36aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: { color: '#666', fontSize: 16 },
  loginRedirect: {
    textAlign: 'center',
    color: '#36aaff',
    fontSize: 14,
    marginTop: 10,
  },
});
