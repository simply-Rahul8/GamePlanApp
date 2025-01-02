import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { db } from '../../utils/firebaseConfig'; // Import Firestore instance
import { doc, getDoc } from 'firebase/firestore';

export default function TrainerProfileScreen({ navigation, route }) {
  const { trainerID } = route.params || {}; // Retrieve trainerID from route params
  const [profileData, setProfileData] = useState({
    profileImage: 'https://via.placeholder.com/150', // Default profile image
  });

  useEffect(() => {
    if (!trainerID) {
      Alert.alert('Error', 'Trainer ID is missing. Please log in again.');
      navigation.goBack();
      return;
    }

    const fetchTrainerData = async () => {
      try {
        const trainerDocRef = doc(db, 'trainers', trainerID); // Reference to trainer document in Firestore
        const trainerDoc = await getDoc(trainerDocRef);

        if (trainerDoc.exists()) {
          setProfileData((prev) => ({
            ...prev,
            ...trainerDoc.data(),
          }));
        } else {
          Alert.alert('Error', 'Trainer data not found.');
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error.message);
        Alert.alert('Error', 'Failed to fetch trainer data.');
      }
    };

    fetchTrainerData();
  }, [trainerID]);

  const handleImageUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
      if (result.type === 'cancel') {
        console.log('Image selection canceled');
        return;
      }

      // TODO: Replace this with your Firebase file upload logic
      const uploadedPath = result.uri; // Assuming this is the uploaded image URL
      setProfileData((prev) => ({ ...prev, profileImage: uploadedPath }));
      Alert.alert('Success', 'Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile image.');
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() =>
            navigation.navigate('SettingsScreen', {
              profileData,
              updateProfileData: setProfileData,
            })
          }
        >
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image
              style={styles.profileImage}
              source={{
                uri: profileData.profileImage || 'https://via.placeholder.com/150',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profileData.name || 'Trainer Name'}</Text>
          <Text style={styles.profileId}>@{profileData.trainerID || 'TrainerID'}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Personal Information</Text>
          <Text style={styles.infoText}>
            Trainer ID: {profileData.trainerID || 'N/A'}
          </Text>
          <Text style={styles.infoText}>Age: {profileData.age || 'N/A'}</Text>
          <Text style={styles.infoText}>
            Training Center: {profileData.trainingCenter || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            Sport Specialty: {profileData.sports || 'N/A'}
          </Text>
          <Text style={styles.infoText}>Mobile: {profileData.mobile || 'N/A'}</Text>
          <Text style={styles.infoText}>Email: {profileData.email || 'N/A'}</Text>
        </View>

        {/* Biography Section */}
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Biography</Text>
          <Text style={styles.bioText}>
            {profileData.aboutMe || 'No biography available. Please update your profile.'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#DA0037',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#DA0037',
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
  infoSection: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bioSection: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
