import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { Checkbox } from 'react-native-paper';

export default function StudentPage({ route }) {
  const { student } = route.params;
  const [selectedToggle, setSelectedToggle] = useState('Exercise');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState({
    Exercise: [],
    Practice: [],
  });
  const [markedDates, setMarkedDates] = useState({});
  const [streakDays, setStreakDays] = useState(0);

  const toggleTaskCompletion = (type, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks[type].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return { ...prevTasks, [type]: updatedTasks };
    });
  };

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: (tasks[selectedToggle].length + 1).toString(),
        name: taskInput,
        completed: false,
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks[selectedToggle], newTask];
        return { ...prevTasks, [selectedToggle]: updatedTasks };
      });
      setTaskInput('');
    }
  };

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: student.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{student.name}</Text>
          <Text style={styles.profileId}>@{student.id}</Text>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>Streak Badge</Text>
          <Text style={styles.streakNumber}>{streakDays} Days</Text>
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

        {/* Task Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskInput}
            onChangeText={setTaskInput}
            placeholder="Enter task"
            placeholderTextColor="#CCCCCC"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Tasks Section */}
        <Text style={styles.sectionTitle}>{selectedToggle}</Text>
        {tasks[selectedToggle].map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Checkbox
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={() => toggleTaskCompletion(selectedToggle, task.id)}
              color="#DA0037"
            />
            <Text style={styles.taskName}>{task.name}</Text>
          </View>
        ))}

        {/* Calendar */}
        <Calendar
          style={styles.calendar}
          markedDates={markedDates}
          theme={{
            calendarBackground: '#1E1E1E',
            textSectionTitleColor: '#DA0037',
            selectedDayBackgroundColor: '#DA0037',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#DA0037',
            dayTextColor: '#FFFFFF',
            textDisabledColor: '#555555',
            monthTextColor: '#FFFFFF',
            indicatorColor: '#DA0037',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
          }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 }, // Updated gradient style
  container: {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileId: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  streakContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  streakText: {
    fontSize: 18,
    color: '#DA0037',
    fontWeight: 'bold',
  },
  streakNumber: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#DA0037',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#DA0037',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
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
  calendar: {
    marginVertical: 20,
  },
});
