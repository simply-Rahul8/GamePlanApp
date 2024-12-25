import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TrainerDashboardScreen({ navigation }) {
  const [students, setStudents] = useState([
    { id: '1', name: 'Alice Johnson', task: 'Math Homework', progress: 50, attendance: 80 },
    { id: '2', name: 'Michael Brown', task: 'Science Project', progress: 70, attendance: 90 },
    { id: '3', name: 'Emily Davis', task: 'History Essay', progress: 60, attendance: 85 },
    { id: '4', name: 'David Wilson', task: 'Art Assignment', progress: 40, attendance: 75 },
  ]);

  const handleAssignTask = (studentId, task) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, task } : student
    );
    setStudents(updatedStudents);
    Alert.alert('Task Assigned', `Assigned "${task}" to ${studentId}`);
  };

  const renderStudentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentDetails', { student: item })}
    >
      <Image
        style={styles.studentImage}
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual student image
      />
      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentTask}>Task: {item.task}</Text>
        <View style={styles.taskControls}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select Task"
            placeholderTextColor="#CCCCCC"
            onChangeText={(task) => handleAssignTask(item.id, task)}
          />
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => handleAssignTask(item.id, item.task)}
          >
            <Text style={styles.assignButtonText}>Assign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#171717', '#444444']} // Gradient background
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Trainer Dashboard</Text>
        <View style={styles.trainerInfo}>
          <Image
            style={styles.trainerImage}
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual trainer image
          />
          <View style={styles.trainerDetails}>
            <Text style={styles.trainerName}>John Smith</Text>
            <Text style={styles.trainerId}>Trainer ID: @johnsmith</Text>
          </View>
        </View>

        <Text style={styles.subheading}>Students List</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderStudentCard}
          contentContainerStyle={styles.studentList}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EDEDED',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  trainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 15,
  },
  trainerImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  trainerDetails: { flex: 1 },
  trainerName: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  trainerId: { fontSize: 16, color: '#CCCCCC' },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
    textAlign: 'center',
  },
  studentList: { paddingBottom: 20 },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  studentImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  studentDetails: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  studentTask: { fontSize: 14, color: '#CCCCCC', marginBottom: 10 },
  taskControls: { flexDirection: 'row', alignItems: 'center' },
  dropdown: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
  },
  assignButton: {
    backgroundColor: '#DA0037',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  assignButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
});
