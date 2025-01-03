import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { db, storage } from '../../utils/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function TrainerProfileScreen({ navigation, route }) {
  const { trainerID } = route.params || {};
  const [profileData, setProfileData] = useState({
    profileImage: 'https://via.placeholder.com/150',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trainerID) {
      Alert.alert('Error', 'Trainer ID is missing. Please log in again.');
      navigation.goBack();
      return;
    }

    const fetchTrainerData = async () => {
      try {
        const trainerDocRef = doc(db, 'trainers', trainerID);
        const trainerDoc = await getDoc(trainerDocRef);

        if (trainerDoc.exists()) {
          setProfileData(trainerDoc.data());
        } else {
          Alert.alert('Error', 'Trainer data not found.');
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error.message);
        Alert.alert('Error', 'Failed to fetch trainer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, [trainerID]);

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Allow access to media to upload a profile image.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (pickerResult.cancelled) return;

      const { uri } = pickerResult;

      // Ensure the file is compatible with Firebase Storage
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        Alert.alert('Error', 'File does not exist.');
        return;
      }

      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `trainers/${trainerID}/profileImage`);
      await uploadBytes(storageRef, blob);

      const uploadedUrl = await getDownloadURL(storageRef);

      const trainerDocRef = doc(db, 'trainers', trainerID);
      await updateDoc(trainerDocRef, { profileImage: uploadedUrl });

      setProfileData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      Alert.alert('Success', 'Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile image. Ensure you are using a development build.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
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

        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image
              style={styles.profileImage}
              source={{
                uri: profileData?.profileImage || 'https://via.placeholder.com/150',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profileData?.name || 'Trainer Name'}</Text>
          <Text style={styles.profileId}>@{profileData?.trainerID || 'TrainerID'}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Personal Information</Text>
          <Text style={styles.infoText}>Trainer ID: {profileData?.trainerID || 'N/A'}</Text>
          <Text style={styles.infoText}>Age: {profileData?.age || 'N/A'}</Text>
          <Text style={styles.infoText}>
            Training Center: {profileData?.trainingCenter || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            Sport Specialty: {profileData?.sports || 'N/A'}
          </Text>
          <Text style={styles.infoText}>Mobile: {profileData?.mobile || 'N/A'}</Text>
          <Text style={styles.infoText}>Email: {profileData?.email || 'N/A'}</Text>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Biography</Text>
          <Text style={styles.bioText}>
            {profileData?.aboutMe || 'No biography available. Please update your profile.'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  loaderText: { fontSize: 18, color: '#FFFFFF' },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#DA0037',
    padding: 10,
    borderRadius: 20,
  },
  profileHeader: { alignItems: 'center', marginBottom: 20, marginTop: 50 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#DA0037',
  },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  profileId: { fontSize: 16, color: '#CCCCCC' },
  infoSection: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#DA0037', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#FFFFFF', marginBottom: 5 },
  bioSection: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10 },
  bioTitle: { fontSize: 18, fontWeight: 'bold', color: '#DA0037', marginBottom: 10 },
  bioText: { fontSize: 16, color: '#FFFFFF' },
});