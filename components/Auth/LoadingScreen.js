import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    // Simulate a loading delay before navigating to the login screen
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Replace with Login Screen
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#213555', '#3E5879']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>GamePlan</Text>
        <ActivityIndicator size="large" color="#F5EFE7" style={styles.loader} />
        <Text style={styles.tagline}>Your sports journey begins here</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F5EFE7',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  loader: {
    marginVertical: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#D8C4B6',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
