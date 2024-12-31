import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../../utils/firebaseConfig'; // Adjust the path if necessary

export default function StudentProfileScreen({ route, navigation }) {
  const student = {
    id: 'S123456',
    name: 'Emily Johnson',
    image: 'https://via.placeholder.com/150',
    age: 16,
    gender: 'Female',
    email: 'emily.johnson@example.com',
    address: '123 Maple Street, Springfield',
    trainerId: 'T98765',
    trainerName: 'John Smith',
    sport: 'Basketball',
    emergencyContact: 'Sarah Johnson, Mother, 555-1234',
  };

  const handleImageUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
      if (result.type === 'cancel') return;

      const uploadedPath = await uploadFile(result);
      student.image = uploadedPath; // Update the student's profile image URL
      Alert.alert('Success', 'Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile image.');
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image source={{ uri: student.image }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{student.name}</Text>
          <Text style={styles.profileId}>@{student.id}</Text>
          {/* Settings Button */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() =>
              navigation.navigate('StudentSettings', {
                student,
              })
            }
          >
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{student.name}</Text>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>{student.id}</Text>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{student.age}</Text>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{student.gender}</Text>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{student.email}</Text>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{student.address}</Text>
        </View>

        {/* Academic Information */}
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Trainer ID</Text>
          <Text style={styles.infoValue}>{student.trainerId}</Text>
          <Text style={styles.infoLabel}>Trainer Name</Text>
          <Text style={styles.infoValue}>{student.trainerName}</Text>
          <Text style={styles.infoLabel}>Sport</Text>
          <Text style={styles.infoValue}>{student.sport}</Text>
        </View>

        {/* Emergency Contact */}
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Emergency Contact</Text>
          <Text style={styles.infoValue}>{student.emergencyContact}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#DA0037',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileId: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DA0037',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
    marginTop: 20,
  },
  infoSection: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
});
