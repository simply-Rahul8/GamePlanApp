import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import RegisterScreen from './components/Auth/RegisterScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import TrainerSignUpScreen from './components/Auth/TrainerSignUpScreen';
import StudentSignUpScreen from './components/Auth/StudentSignUpScreen';
import TrainerDashboardScreen from './components/Auth/TrainerDashboardScreen';
import StudentDashboardScreen from './components/Auth/StudentDashboardScreen';
import LoginScreen from './components/Auth/LoginScreen'; // Move the image to LoginScreen
import LoadingScreen from './components/Auth/LoadingScreen';

const Stack = createStackNavigator();

const HeaderLogo = ({ height, width }) => (
  <View style={styles.logoContainer}>
    <Image
      source={require('/Users/suryapothuri/GamePlan/file_2024-12-24_13.07.06.png')}
      style={{ height, width }}
      resizeMode="contain"
    />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading" // Start with the Loading Screen
        screenOptions={{
          headerStyle: { backgroundColor: '#171717' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        {/* Loading Screen */}
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }} // Hide the header for the loading screen
        />

        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Remove header to make the login screen full UI
        />

        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />

        {/* Forgot Password Screen */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />

        {/* Trainer Sign Up Screen */}
        <Stack.Screen
          name="TrainerSignUp"
          component={TrainerSignUpScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />

        {/* Student Sign Up Screen */}
        <Stack.Screen
          name="StudentSignUp"
          component={StudentSignUpScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />

        {/* Trainer Dashboard Screen */}
        <Stack.Screen
          name="TrainerDashboard"
          component={TrainerDashboardScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />

        {/* Student Dashboard Screen */}
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboardScreen}
          options={{
            headerTitle: () => <HeaderLogo height={200} width={380} />, // Replace title with logo
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
