// Updated SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { uploadFile } from '../../utils/firebaseConfig'; 
import * as DocumentPicker from 'expo-document-picker';

export default function SettingsScreen({ navigation, route }) {
  const profileData = route.params?.profileData || {
    profileImage: 'https://via.placeholder.com/150',
    fullName: 'James Smith',
    age: '35',
    trainingCenter: 'Elite Fitness',
    sportSpecialty: 'Basketball',
    mobile: '+1 234 567 890',
    email: 'james.smith@elitefitness.com',
    biography: 'Dedicated sports trainer with over 10 years of experience.',
  };

  const updateProfileData = route.params?.updateProfileData || (() => {});

  const [profileImage, setProfileImage] = useState(profileData.profileImage);
  const [fullName, setFullName] = useState(profileData.fullName);
  const [age, setAge] = useState(profileData.age);
  const [trainingCenter, setTrainingCenter] = useState(profileData.trainingCenter);
  const [sportSpecialty, setSportSpecialty] = useState(profileData.sportSpecialty);
  const [mobile, setMobile] = useState(profileData.mobile);
  const [email, setEmail] = useState(profileData.email);
  const [biography, setBiography] = useState(profileData.biography);

  const pickAndUploadImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
      if (result.type === 'cancel') {
        console.log('Image selection canceled');
        return;
      }

      const uploadedFilePath = await uploadFile(result);
      setProfileImage(uploadedFilePath);
      Alert.alert('Success', 'Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile image.');
    }
  };

  const saveChanges = () => {
    const updatedData = {
      profileImage,
      fullName,
      age,
      trainingCenter,
      sportSpecialty,
      mobile,
      email,
      biography,
    };

    updateProfileData(updatedData);
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.profileSection} onPress={pickAndUploadImage}>
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
          <Text style={styles.profileName}>{fullName}</Text>
        </TouchableOpacity>

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

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logged Out')}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flexGrow: 1, padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20, marginTop: 50 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#DA0037',
    marginBottom: 10,
  },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555555',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#DA0037',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: '#444444',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
