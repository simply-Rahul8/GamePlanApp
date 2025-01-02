import React, { useEffect, useState } from 'react';
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
import { db, uploadFile } from '../../utils/firebaseConfig'; // Adjust the path if necessary
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function StudentProfileScreen({ route, navigation }) {
  const { studentID } = route.params || {}; // Retrieve studentID from route.params
  const [student, setStudent] = useState(null); // State to hold student data

  useEffect(() => {
    if (!studentID) {
      Alert.alert('Error', 'Student ID is missing. Please log in again.');
      navigation.goBack();
      return;
    }

    const fetchStudentData = async () => {
      try {
        const studentDoc = await getDoc(doc(db, 'students', studentID)); // Fetch student data from Firestore
        if (studentDoc.exists()) {
          setStudent(studentDoc.data());
        } else {
          Alert.alert('Error', 'Student profile not found.');
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
        Alert.alert('Error', 'Failed to fetch student profile.');
      }
    };

    fetchStudentData();
  }, [studentID]);

  const handleImageUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
      if (result.type === 'cancel') return;

      const uploadedPath = await uploadFile(result); // Upload the file to Firestore or storage
      if (student) {
        const updatedStudent = { ...student, image: uploadedPath };
        await updateDoc(doc(db, 'students', studentID), updatedStudent); // Update Firestore
        setStudent(updatedStudent); // Update the local state
        Alert.alert('Success', 'Profile image updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile image.');
    }
  };

  if (!student) {
    return (
      <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading student profile...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image source={{ uri: student.image || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{student.name || 'Student Name'}</Text>
          <Text style={styles.profileId}>@{studentID}</Text>
          {/* Settings Button */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('StudentSettings', { student })}
          >
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{student.name || 'N/A'}</Text>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>{studentID}</Text>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{student.age || 'N/A'}</Text>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{student.gender || 'N/A'}</Text>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{student.email || 'N/A'}</Text>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{student.address || 'N/A'}</Text>
        </View>

        {/* Academic Information */}
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Trainer ID</Text>
          <Text style={styles.infoValue}>{student.trainerID || 'N/A'}</Text>
          <Text style={styles.infoLabel}>Trainer Name</Text>
          <Text style={styles.infoValue}>{student.trainerName || 'N/A'}</Text>
          <Text style={styles.infoLabel}>Sport</Text>
          <Text style={styles.infoValue}>{student.sport || 'N/A'}</Text>
        </View>

        {/* Emergency Contact */}
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Emergency Contact</Text>
          <Text style={styles.infoValue}>{student.emergencyContact || 'N/A'}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#FFFFFF', fontSize: 16 },
  header: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#DA0037',
    marginBottom: 10,
  },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  profileId: { fontSize: 16, color: '#CCCCCC' },
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
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#DA0037', marginBottom: 10, marginTop: 20 },
  infoSection: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoLabel: { fontSize: 14, color: '#CCCCCC', marginBottom: 5 },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15 },
});
