import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './components/Auth/RegisterScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import TrainerSignUpScreen from './components/Auth/TrainerSignUpScreen';
import StudentSignUpScreen from './components/Auth/StudentSignUpScreen';
import TrainerDashboardScreen from './components/Auth/TrainerDashboardScreen';
import StudentDashboardScreen from './components/Auth/StudentDashboardScreen';
import LoginScreen from './components/Auth/LoginScreen'; // Move the image to LoginScreen
import LoadingScreen from './components/Auth/LoadingScreen';

const Stack = createStackNavigator();

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
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen} 
          options={{ headerShown: false }} // Hide the header for the loading screen
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Remove header to make the login screen full UI
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Student Sign Up' }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: 'Forgot Password' }} 
        />
        <Stack.Screen 
          name="TrainerSignUp" 
          component={TrainerSignUpScreen} 
          options={{ title: 'Trainer Sign Up' }} 
        />
        <Stack.Screen 
          name="StudentSignUp" 
          component={StudentSignUpScreen} 
          options={{ title: 'Student Sign Up' }} 
        />
        <Stack.Screen 
          name="TrainerDashboard" 
          component={TrainerDashboardScreen} 
          options={{ title: 'Trainer Dashboard' }} 
        />
        <Stack.Screen 
          name="StudentDashboard" 
          component={StudentDashboardScreen} 
          options={{ title: 'Student Dashboard' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
