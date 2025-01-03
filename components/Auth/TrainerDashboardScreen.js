import React, { useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../utils/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function TrainerDashboardScreen({ navigation, route }) {
  const { trainerData } = route.params || {};
  const trainerID = trainerData?.trainerID || '';
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!trainerID) {
          setErrorMessage('Trainer ID is missing. Please log in again.');
          return;
        }

        // Firestore query to fetch students with matching trainerID
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, where('trainerID', '==', trainerID));
        const querySnapshot = await getDocs(q);

        const studentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (studentsData.length === 0) {
          setErrorMessage('No students found. Ask students to join using your Trainer ID.');
        } else {
          setStudents(studentsData);
          setErrorMessage('');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setErrorMessage('Failed to fetch students. Please try again later.');
      }
    };

    fetchStudents();
  }, [trainerID]);

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentPage', { student: item })}
    >
      <Image
        style={styles.studentImage}
        source={{
          uri: item.image || 'https://via.placeholder.com/150',
        }}
      />
      <View style={styles.studentDetails}>
        <Text style={styles.studentName}>{item.name || 'Student Name'}</Text>
        <Text style={styles.studentRole}>{item.sport || 'Sport'}</Text>
        <Text style={styles.studentID}>ID: {item.studentID || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrainerProfile', { trainerID })}
            style={styles.profileTouchable}
          >
            <Image
              style={styles.trainerImage}
              source={{ uri: trainerData?.image || 'https://via.placeholder.com/150' }}
            />
            <Text style={styles.trainerName}>{trainerData?.name || 'Trainer'}</Text>
            <Text style={styles.trainerId}>ID: {trainerID}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#CCCCCC" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or ID..."
            placeholderTextColor="#CCCCCC"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Students List</Text>
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
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
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  errorText: { fontSize: 16, color: '#CCCCCC', textAlign: 'center' },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileTouchable: { alignItems: 'center' },
  trainerImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  trainerName: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  trainerId: { fontSize: 16, color: '#CCCCCC' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#DA0037', marginBottom: 10 },
  studentList: { paddingBottom: 20 },
  studentCard: { flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 15 },
  studentImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  studentDetails: { flex: 1 },
  studentName: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
  studentRole: { fontSize: 14, color: '#CCCCCC' },
  studentID: { fontSize: 12, color: '#AAAAAA' },
});