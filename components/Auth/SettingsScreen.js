import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../../utils/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

export default function SettingsScreen({ navigation, route }) {
  const profileData = route.params?.profileData || {};
  const updateProfileData = route.params?.updateProfileData || (() => {});
  const trainerID = profileData.trainerID;

  const [fullName, setFullName] = useState(profileData.name || '');
  const [age, setAge] = useState(profileData.age || '');
  const [trainingCenter, setTrainingCenter] = useState(profileData.trainingCenter || '');
  const [sportSpecialty, setSportSpecialty] = useState(profileData.sports || '');
  const [mobile, setMobile] = useState(profileData.mobile || '');
  const [email, setEmail] = useState(profileData.email || '');
  const [biography, setBiography] = useState(profileData.aboutMe || '');

  const saveChanges = async () => {
    const updatedData = {
      name: fullName,
      age,
      trainingCenter,
      sports: sportSpecialty,
      mobile,
      email,
      aboutMe: biography,
    };

    try {
      const trainerDocRef = doc(db, 'trainers', trainerID);
      await updateDoc(trainerDocRef, updatedData);
      updateProfileData(updatedData);
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#CCCCCC"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#CCCCCC"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.sectionTitle}>Training Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Training Center"
          placeholderTextColor="#CCCCCC"
          value={trainingCenter}
          onChangeText={setTrainingCenter}
        />
        <TextInput
          style={styles.input}
          placeholder="Sport Specialty"
          placeholderTextColor="#CCCCCC"
          value={sportSpecialty}
          onChangeText={setSportSpecialty}
        />

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#CCCCCC"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#CCCCCC"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Biography"
          placeholderTextColor="#CCCCCC"
          multiline
          value={biography}
          onChangeText={setBiography}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flexGrow: 1, padding: 20 },
  sectionTitle: { fontSize: 18, color: '#DA0037', marginBottom: 10 },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555555',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#DA0037', padding: 15, borderRadius: 10, marginTop: 20 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});