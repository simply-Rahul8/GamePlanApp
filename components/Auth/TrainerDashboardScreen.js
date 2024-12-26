import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TrainerDashboardScreen({ navigation }) {
  const [students, setStudents] = useState([
    { id: '1', name: 'Emily Johnson', role: 'Yoga Enthusiast', image: 'https://via.placeholder.com/150', sport: 'Yoga' },
    { id: '2', name: 'Michael Brown', role: 'Weight Lifter', image: 'https://via.placeholder.com/150', sport: 'Weightlifting' },
    { id: '3', name: 'Sarah Davis', role: 'Cardio Lover', image: 'https://via.placeholder.com/150', sport: 'Cardio' },
    { id: '4', name: 'James Wilson', role: 'Fitness Trainer', image: 'https://via.placeholder.com/150', sport: 'Fitness' },
    { id: '5', name: 'Olivia Martinez', role: 'Strength Trainer', image: 'https://via.placeholder.com/150', sport: 'Strength Training' },
    { id: '6', name: 'Robert Taylor', role: 'Flexibility Expert', image: 'https://via.placeholder.com/150', sport: 'Flexibility' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentPage', { student: item })}
    >
      <Image style={styles.studentImage} source={{ uri: item.image }} />
      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Trainer Profile */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrainerProfile')}
            style={styles.profileTouchable}
          >
            <Image
              style={styles.trainerImage}
              source={{ uri: 'https://via.placeholder.com/150' }}
            />
            <Text style={styles.trainerName}>David Smith</Text>
            <Text style={styles.trainerId}>@davidsmith</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#CCCCCC" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search student..."
            placeholderTextColor="#CCCCCC"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Students List Section */}
        <Text style={styles.sectionTitle}>Students List</Text>
        <FlatList
          data={filteredStudents}
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
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 1 },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTouchable: {
    alignItems: 'center',
  },
  trainerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#DA0037',
  },
  trainerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  trainerId: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DA0037',
    marginBottom: 10,
  },
  studentList: {
    paddingBottom: 20,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  studentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#DA0037',
  },
  studentDetails: { flex: 1 },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  studentRole: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});
