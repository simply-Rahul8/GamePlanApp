import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function StudentSettingsScreen({ route, navigation }) {
  const { student } = route.params;

  const [profileImage, setProfileImage] = useState(student.image);
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age.toString());
  const [gender, setGender] = useState(student.gender);
  const [email, setEmail] = useState(student.email);
  const [address, setAddress] = useState(student.address);
  const [trainerId, setTrainerId] = useState(student.trainerId);
  const [trainerName, setTrainerName] = useState(student.trainerName);
  const [sport, setSport] = useState(student.sport);
  const [emergencyContact, setEmergencyContact] = useState(student.emergencyContact);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const saveChanges = () => {
    const updatedStudent = {
      image: profileImage,
      name,
      age: parseInt(age),
      gender,
      email,
      address,
      trainerId,
      trainerName,
      sport,
      emergencyContact,
    };
    // Simulate saving data and navigating back
    console.log('Updated Student:', updatedStudent);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileId}>@{student.id}</Text>
      </View>

      {/* Profile Information */}
      <Text style={styles.sectionTitle}>Profile Information</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
      <Picker selectedValue={gender} onValueChange={(value) => setGender(value)} style={styles.picker}>
        <Picker.Item label="Select gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
      />

      {/* Trainer Information */}
      <Text style={styles.sectionTitle}>Trainer Information</Text>
      <TextInput style={styles.input} placeholder="Trainer ID" value={trainerId} onChangeText={setTrainerId} />
      <TextInput style={styles.input} placeholder="Trainer Name" value={trainerName} onChangeText={setTrainerName} />
      <TextInput style={styles.input} placeholder="Sport" value={sport} onChangeText={setSport} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#171717',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  picker: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#DA0037',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
