import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function StudentDashboardScreen({ navigation, route }) {
  const { studentData } = route.params || {};
  const [tasks, setTasks] = useState({ Exercise: [], Practice: [] });
  const [selectedToggle, setSelectedToggle] = useState('Exercise');
  const [attendanceDates, setAttendanceDates] = useState({});
  const [streak, setStreak] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [isInTargetLocation, setIsInTargetLocation] = useState(false);

  useEffect(() => {
    if (!studentData) {
      Alert.alert('Error', 'Student data is missing. Please log in again.');
      navigation.goBack();
      return;
    }

    const loadTasksAndAttendance = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedAttendanceDates = await AsyncStorage.getItem('attendanceDates');
      const storedStreak = await AsyncStorage.getItem('streak');

      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedAttendanceDates) setAttendanceDates(JSON.parse(storedAttendanceDates));
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
    };

    const fetchTrainerLocation = async () => {
      try {
        const trainerID = studentData.trainerID;
        if (trainerID) {
          const trainerDoc = await getDoc(doc(db, 'trainers', trainerID));
          if (trainerDoc.exists()) {
            const { location } = trainerDoc.data();
            if (location) {
              checkLocation(location.latitude, location.longitude, location.radius);
            }
          } else {
            Alert.alert('Error', 'Trainer data not found.');
          }
        }
      } catch (error) {
        console.error('Error fetching trainer location:', error);
      }
    };

    loadTasksAndAttendance();
    fetchTrainerLocation();
  }, [studentData]);

  const checkLocation = async (latitude, longitude, radius) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Location permissions are required to mark attendance.'
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const distance = getDistance(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      { latitude, longitude }
    );

    setIsInTargetLocation(distance <= radius);
  };

  const toggleTaskCompletion = (type, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks[type].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      const newTasks = { ...prevTasks, [type]: updatedTasks };
      AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const handleAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!attendanceMarked && isInTargetLocation) {
      setAttendanceMarked(true);

      const updatedDates = {
        ...attendanceDates,
        [today]: {
          selected: true,
          marked: true,
          selectedColor: '#DA0037',
        },
      };
      setAttendanceDates(updatedDates);

      AsyncStorage.setItem('attendanceDates', JSON.stringify(updatedDates));
      Alert.alert('Attendance', 'Attendance marked successfully!');
    } else {
      Alert.alert('Error', 'You must be in the target location to mark attendance.');
    }
  };

  const saveProgress = async () => {
    if (
      tasks.Exercise.every((task) => task.completed) &&
      tasks.Practice.every((task) => task.completed)
    ) {
      setStreak((prevStreak) => prevStreak + 1);
      try {
        await AsyncStorage.setItem('streak', (streak + 1).toString());
        Alert.alert('Success', 'Progress saved successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save progress.');
      }
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <TouchableOpacity style={styles.header}>
          <Image
            source={{ uri: studentData?.image || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{studentData?.name || 'Student Name'}</Text>
          <Text style={styles.profileId}>ID: {studentData?.studentID}</Text>
        </TouchableOpacity>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 Streak: {streak} days</Text>
        </View>

        {/* Mark Attendance Button */}
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            (!isInTargetLocation || attendanceMarked) && styles.attendanceButtonDisabled,
          ]}
          onPress={handleAttendance}
          disabled={!isInTargetLocation || attendanceMarked}
        >
          <Text
            style={[
              styles.attendanceButtonText,
              (!isInTargetLocation || attendanceMarked) &&
                styles.attendanceButtonTextDisabled,
            ]}
          >
            {attendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
          </Text>
        </TouchableOpacity>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedToggle === 'Exercise' && styles.activeToggleButton,
            ]}
            onPress={() => setSelectedToggle('Exercise')}
          >
            <Text
              style={[
                styles.toggleText,
                selectedToggle === 'Exercise' && styles.activeToggleText,
              ]}
            >
              Exercise
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedToggle === 'Practice' && styles.activeToggleButton,
            ]}
            onPress={() => setSelectedToggle('Practice')}
          >
            <Text
              style={[
                styles.toggleText,
                selectedToggle === 'Practice' && styles.activeToggleText,
              ]}
            >
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks Section */}
        <Text style={styles.sectionTitle}>{selectedToggle}</Text>
        {tasks[selectedToggle]?.map((item) => (
          <View key={item.id} style={styles.taskItem}>
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => toggleTaskCompletion(selectedToggle, item.id)}
              color="#DA0037"
            />
            <Text style={styles.taskName}>{item.name}</Text>
          </View>
        ))}

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={attendanceDates}
            theme={{
              calendarBackground: '#171717',
              textSectionTitleColor: '#DA0037',
              dayTextColor: '#FFFFFF',
              todayTextColor: '#DA0037',
              monthTextColor: '#FFFFFF',
              arrowColor: '#DA0037',
              selectedDayBackgroundColor: '#DA0037',
              selectedDayTextColor: '#FFFFFF',
            }}
          />
        </View>

        {/* Save Progress Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            !tasks.Exercise.every((task) => task.completed) ||
            !tasks.Practice.every((task) => task.completed)
              ? styles.saveButtonDisabled
              : {},
          ]}
          onPress={saveProgress}
          disabled={
            !tasks.Exercise.every((task) => task.completed) ||
            !tasks.Practice.every((task) => task.completed)
          }
        >
          <Text
            style={[
              styles.saveButtonText,
              !tasks.Exercise.every((task) => task.completed) ||
              !tasks.Practice.every((task) => task.completed)
                ? styles.saveButtonTextDisabled
                : {},
            ]}
          >
            Save Progress
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flexGrow: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { fontSize: 20, color: '#FFFFFF' },
  profileId: { fontSize: 16, color: '#CCCCCC' },
  streakBadge: { alignItems: 'center', marginBottom: 20 },
  streakText: { color: '#DA0037', fontSize: 16 },
  attendanceButton: { backgroundColor: '#DA0037', padding: 15, borderRadius: 10 },
  attendanceButtonDisabled: { backgroundColor: '#CCCCCC' },
  attendanceButtonText: { color: '#FFFFFF', textAlign: 'center' },
  attendanceButtonTextDisabled: { color: '#000000' },
  toggleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeToggleButton: { backgroundColor: '#DA0037' },
  toggleText: { fontSize: 16, color: '#CCCCCC' },
  activeToggleText: { color: '#FFFFFF', fontWeight: 'bold' },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  taskName: { marginLeft: 10, fontSize: 16, color: '#FFFFFF' },
  calendarContainer: { marginBottom: 20 },
  saveButton: { backgroundColor: '#DA0037', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonDisabled: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#CCCCCC' },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  saveButtonTextDisabled: { color: '#CCCCCC' },
});