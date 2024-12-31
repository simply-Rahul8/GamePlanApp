<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, Text, StyleSheet } from 'react-native';
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
import RegisterScreen from './components/Auth/RegisterScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import TrainerSignUpScreen from './components/Auth/TrainerSignUpScreen';
import StudentSignUpScreen from './components/Auth/StudentSignUpScreen';
import TrainerDashboardScreen from './components/Auth/TrainerDashboardScreen';
import StudentDashboardScreen from './components/Auth/StudentDashboardScreen';
import LoginScreen from './components/Auth/LoginScreen';
import LoadingScreen from './components/Auth/LoadingScreen';
import TrainerProfileScreen from './components/Auth/TrainerProfileScreen';
import SettingsScreen from './components/Auth/SettingsScreen';
import StudentProfileScreen from './components/Auth/StudentProfileScreen';
import StudentSettingsScreen from './components/Auth/StudentSettingsScreen';
import StudentPage from './components/Auth/StudentPage'; // Import StudentPage if added for individual student profiles.
<<<<<<< HEAD
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

const targetLocation = {
  latitude: 34.0549, // Replace with your latitude
  longitude: 118.2426, // Replace with your longitude
  radius: 10, // Radius in meters
};
=======
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869

const Stack = createStackNavigator();

const HeaderLogo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require('./assets/logo.png')}
      style={styles.logo}
      resizeMode="cover"
    />
    <Text style={styles.logoText}>
      <Text style={{ color: '#DA0037' }}>GAME</Text>
      <Text style={{ color: '#EDEDED' }}>PLAN</Text>
    </Text>
  </View>
);

export default function App() {
<<<<<<< HEAD
  const [isInTargetLocation, setIsInTargetLocation] = useState(false);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Location permission is required to access location-based features. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const checkLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    const locationServicesEnabled = await Location.hasServicesEnabledAsync();
    if (!locationServicesEnabled) {
      Alert.alert(
        'Location Services Disabled',
        'Location services are turned off. Please enable them in your device settings.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const distance = getDistance(
        { latitude: coords.latitude, longitude: coords.longitude },
        { latitude: targetLocation.latitude, longitude: targetLocation.longitude }
      );

      if (distance <= targetLocation.radius) {
        setIsInTargetLocation(true);
        Alert.alert('Success', 'You are within the attendance zone!');
      } else {
        setIsInTargetLocation(false);
        Alert.alert('Out of Range', `You are ${Math.round(distance)} meters away from the target location.`);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Failed to fetch your location. Please try again.');
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const renderAttendanceButton = () => {
    return (
      <TouchableOpacity
        style={[styles.button, !isInTargetLocation && styles.buttonDisabled]}
        disabled={!isInTargetLocation}
        onPress={() => Alert.alert('Attendance', 'Attendance marked successfully!')}
      >
        <Text style={styles.buttonText}>
          {isInTargetLocation ? 'Mark Attendance' : 'Attendance Disabled'}
        </Text>
      </TouchableOpacity>
    );
  };

=======
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerStyle: { backgroundColor: '#171717' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
        }}
      >
        {/* Loading Screen */}
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />

        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        {/* Forgot Password Screen */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />

        {/* Trainer Sign Up Screen */}
        <Stack.Screen
          name="TrainerSignUp"
          component={TrainerSignUpScreen}
        />

        {/* Student Sign Up Screen */}
        <Stack.Screen
          name="StudentSignUp"
          component={StudentSignUpScreen}
        />

        {/* Trainer Dashboard Screen */}
        <Stack.Screen
          name="TrainerDashboard"
          component={TrainerDashboardScreen}
        />

        {/* Student Dashboard Screen */}
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboardScreen}
        />

        {/* Trainer Profile Screen */}
        <Stack.Screen
          name="TrainerProfile"
          component={TrainerProfileScreen}
        />

        {/* Settings Screen */}
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />

        {/* Student Profile Screen */}
        <Stack.Screen
          name="StudentProfile"
          component={StudentProfileScreen}
        />

<<<<<<< HEAD
        {/* StudentSettingsScreen */}
=======
        {/* Student Settings Screen */}
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
        <Stack.Screen
          name="StudentSettings"
          component={StudentSettingsScreen}
        />

        {/* Student Page */}
        <Stack.Screen
          name="StudentPage"
          component={StudentPage} // Add this if you have a separate StudentPage component.
        />
      </Stack.Navigator>
<<<<<<< HEAD
      <View style={styles.attendanceButtonContainer}>{renderAttendanceButton()}</View>
=======
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DA0037',
  },
  logoText: {
    fontSize: 29,
    fontWeight: 'bold',
    marginLeft: 10,
  },
<<<<<<< HEAD
  attendanceButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
=======
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
});
