import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';

export default function StudentDashboardScreen({ navigation }) {
  const [selectedToggle, setSelectedToggle] = useState('Exercise');
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [tasks, setTasks] = useState({
    Exercise: [
      { id: '1', name: 'Push-ups', completed: false },
      { id: '2', name: 'Sit-ups', completed: false },
      { id: '3', name: 'Running', completed: false },
      { id: '4', name: 'Stretching', completed: false },
    ],
    Practice: [
      { id: '1', name: 'Cover Drive', completed: false },
      { id: '2', name: 'Catching Practice', completed: false },
      { id: '3', name: 'Pull Shot', completed: false },
      { id: '4', name: 'Bowling Yorkers', completed: false },
    ],
  });
  const [attendanceDates, setAttendanceDates] = useState({});
  const [streak, setStreak] = useState(0);

  // Dummy student profile data
  const studentProfile = {
    name: 'Oliver Smith',
    id: '123456',
    image: 'https://via.placeholder.com/150',
    sport: 'Cricket',
  };

  const toggleTaskCompletion = (type, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks[type].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return { ...prevTasks, [type]: updatedTasks };
    });
  };

  const handleAttendance = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    if (!attendanceMarked) {
      setAttendanceMarked(true);
      setStreak(streak + 1); // Increment streak

      // Mark today's date in the calendar
      setAttendanceDates((prevDates) => ({
        ...prevDates,
        [today]: {
          selected: true,
          marked: true,
          selectedColor: '#DA0037',
        },
      }));
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <TouchableOpacity
          style={styles.header}
          onPress={() =>
            navigation.navigate('StudentProfile', { student: studentProfile })
          }
        >
          <Image
            source={{ uri: studentProfile.image }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{studentProfile.name}</Text>
          <Text style={styles.profileId}>ID: {studentProfile.id}</Text>
        </TouchableOpacity>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 Streak: {streak} days</Text>
        </View>

        {/* Mark Attendance Button */}
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            attendanceMarked && styles.attendanceButtonMarked,
          ]}
          onPress={handleAttendance}
          disabled={attendanceMarked}
        >
          <Text
            style={[
              styles.attendanceButtonText,
              attendanceMarked && styles.attendanceButtonTextMarked,
            ]}
          >
            {attendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
          </Text>
        </TouchableOpacity>

        {/* Sport Name */}
        <View style={styles.sportContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.sportImage}
          />
          <Text style={styles.sportName}>{studentProfile.sport}</Text>
        </View>

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
        {tasks[selectedToggle].map((item) => (
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
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileId: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  streakBadge: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  streakText: {
    color: '#DA0037',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  attendanceButton: {
    backgroundColor: '#DA0037',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  attendanceButtonMarked: {
    backgroundColor: '#1E1E1E',
    borderWidth: 2,
    borderColor: '#DA0037',
  },
  attendanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendanceButtonTextMarked: {
    color: '#DA0037',
  },
  sportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  sportImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeToggleButton: {
    backgroundColor: '#DA0037',
  },
  toggleText: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  activeToggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  taskName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DA0037',
  },
  saveButtonText: {
    color: '#171717',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
