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
            onChangeText={(task) => handleAssignTask(item.id, task)}
          />
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => handleAssignTask(item.id, item.task)}
          >
            <Text style={styles.assignButtonText}>Assign Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fc', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  trainerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  trainerImage: { width: 80, height: 80, borderRadius: 40, marginRight: 10 },
  trainerDetails: { flex: 1 },
  trainerName: { fontSize: 20, fontWeight: 'bold' },
  trainerId: { fontSize: 16, color: '#666' },
  subheading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  studentList: { paddingBottom: 20 },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  studentImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  studentDetails: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: 'bold' },
  studentTask: { fontSize: 14, color: '#666', marginBottom: 10 },
  taskControls: { flexDirection: 'row', alignItems: 'center' },
  dropdown: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  assignButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  assignButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});
