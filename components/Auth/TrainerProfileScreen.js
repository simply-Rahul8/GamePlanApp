import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TrainerProfileScreen({ navigation }) {
  const [profileData, setProfileData] = useState({
    profileImage: 'https://via.placeholder.com/150',
    fullName: 'James Smith',
    age: '35',
    trainingCenter: 'Elite Fitness',
    sportSpecialty: 'Basketball',
    mobile: '+1 234 567 890',
    email: 'james.smith@elitefitness.com',
    biography: 'James Smith is a dedicated sports trainer with over 10 years of experience in the fitness industry...'
  });

  const updateProfileData = (updatedData) => {
    setProfileData(updatedData);
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
              updateProfileData,
            })
          }
        >
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image style={styles.profileImage} source={{ uri: profileData.profileImage }} />
          <Text style={styles.profileName}>{profileData.fullName}</Text>
          <Text style={styles.profileId}>@jamesmith</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Personal Information</Text>
          <Text style={styles.infoText}>Trainer ID: 12345</Text>
          <Text style={styles.infoText}>Age: {profileData.age}</Text>
          <Text style={styles.infoText}>Training Center: {profileData.trainingCenter}</Text>
          <Text style={styles.infoText}>Sport Specialty: {profileData.sportSpecialty}</Text>
          <Text style={styles.infoText}>Mobile: {profileData.mobile}</Text>
          <Text style={styles.infoText}>Email: {profileData.email}</Text>
        </View>

        {/* Biography Section */}
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Biography</Text>
          <Text style={styles.bioText}>{profileData.biography}</Text>
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
