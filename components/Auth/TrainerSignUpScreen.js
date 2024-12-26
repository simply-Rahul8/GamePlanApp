import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
  const [trainerID, setTrainerID] = useState('TR12345');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleGenerateTrainerID = () => {
    const newID = 'TR' + Math.floor(10000 + Math.random() * 90000);
    setTrainerID(newID);
    Alert.alert('Trainer ID Generated', `Your Trainer ID: ${newID}`);
  };

  const handleSignUp = () => {
    if (!name || !age || !sports || !gender || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all mandatory fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Trainer account created successfully!');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Trainer Sign Up</Text>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#CCCCCC"
          value={name}
          onChangeText={setName}
        />

        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#CCCCCC"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Training Center */}
        <Text style={styles.label}>Training Center</Text>
        <GooglePlacesAutocomplete
          placeholder="Search for training center"
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
            setTrainingCenter(data.description);
            setRegion({
              ...region,
              latitude: lat,
              longitude: lng,
            });
            setSelectedLocation({
              latitude: lat,
              longitude: lng,
            });
          }}
          query={{
            key: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
            language: 'en',
          }}
          styles={{
            textInput: [
              styles.input,
              { color: '#FFFFFF', placeholderTextColor: '#FFFFFF' },
            ],
            listView: { backgroundColor: '#1E1E1E', borderRadius: 10 },
          }}
          textInputProps={{
            placeholderTextColor: '#FFFFFF', // White placeholder text
          }}
        />

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onPress={(e) =>
              setSelectedLocation(e.nativeEvent.coordinate)
            }
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} />
            )}
          </MapView>
        </View>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() =>
            Alert.alert(
              'Location Selected',
              `Latitude: ${selectedLocation?.latitude}, Longitude: ${selectedLocation?.longitude}`
            )
          }
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

        {/* Sports */}
        <Text style={styles.label}>Sports</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sports}
            onValueChange={(itemValue) => setSports(itemValue)}
            style={styles.picker}
            dropdownIconColor="#EDEDED"
          >
            <Picker.Item label="Select Sports" value="" />
            {[
              'Badminton',
              'Basketball',
              'Cricket',
              'Cycling',
              'Football',
              'Ice Hockey',
              'Karate',
              'Skying',
              'Swimming',
              'Volleyball',
            ].map((sport) => (
              <Picker.Item key={sport} label={sport} value={sport} />
            ))}
          </Picker>
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            dropdownIconColor="#EDEDED"
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
          </Picker>
        </View>

        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor="#CCCCCC"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#CCCCCC"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#CCCCCC"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#CCCCCC"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* About Me */}
        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Write a short bio"
          placeholderTextColor="#CCCCCC"
          value={aboutMe}
          onChangeText={setAboutMe}
          multiline
        />

        {/* Experience */}
        <Text style={styles.label}>Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter years of experience"
          placeholderTextColor="#CCCCCC"
          value={experience}
          onChangeText={setExperience}
          keyboardType="numeric"
        />

        {/* Generate Trainer ID */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateTrainerID}
        >
          <Text style={styles.generateButtonText}>Generate Trainer ID</Text>
        </TouchableOpacity>

        {/* Trainer ID */}
        <Text style={styles.label}>Trainer ID</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={trainerID}
          editable={false}
        />

        {/* Sign Up */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EDEDED',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#EDEDED',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
  },
  picker: {
    color: '#FFFFFF',
    height: Platform.OS === 'android' ? 50 : undefined,
  },
  mapContainer: {
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  doneButton: {
    backgroundColor: '#DA0037',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledInput: {
    backgroundColor: '#333333',
    color: '#AAAAAA',
  },
  generateButton: {
    backgroundColor: '#DA0037',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#DA0037',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
