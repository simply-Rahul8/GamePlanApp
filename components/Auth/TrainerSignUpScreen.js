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

export default function TrainerSignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [trainingCenter, setTrainingCenter] = useState('');
  const [sports, setSports] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [experience, setExperience] = useState('');
  const [trainerID, setTrainerID] = useState('TR12345'); // Example static trainer ID

  const handleGenerateTrainerID = () => {
    // Generate random trainer ID logic
    const newID = 'TR' + Math.floor(10000 + Math.random() * 90000);
    setTrainerID(newID);
    Alert.alert('Trainer ID Generated', `Your Trainer ID: ${newID}`);
  };

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all mandatory fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Trainer account created successfully!');
    navigation.navigate('Login'); // Navigate to login or another screen after signup
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Trainer Sign Up</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Training Center</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter training center"
        value={trainingCenter}
        onChangeText={setTrainingCenter}
      />

      <Text style={styles.label}>Sports</Text>
      <TextInput
        style={styles.input}
        placeholder="Select sports"
        value={sports}
        onChangeText={setSports}
      />

      <Text style={styles.label}>Mobile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Select gender"
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>About Me</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Write a short bio"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
      />

      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter years of experience"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGenerateTrainerID}
      >
        <Text style={styles.generateButtonText}>Generate Trainer ID</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Trainer ID</Text>
      <TextInput
        style={styles.input}
        value={trainerID}
        editable={false}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  generateButton: {
    backgroundColor: '#36aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signupButton: {
    backgroundColor: '#36aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
