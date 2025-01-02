import React, { useState, useEffect } from 'react';
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
import { db } from '../../utils/firebaseConfig'; // Import Firestore instance
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export default function TrainerDashboardScreen({ navigation, route }) {
  const { trainerID } = route.params || {}; // Fetch trainer ID from route params
  const [trainerName, setTrainerName] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!trainerID) {
      // Show an error message if trainerID is missing
      setErrorMessage('Trainer ID is missing. Please log in again.');
      return;
    }

    const fetchTrainerData = async () => {
      try {
        const trainerDocRef = doc(db, 'trainers', trainerID);
        const trainerDoc = await getDoc(trainerDocRef);

        if (trainerDoc.exists()) {
          const trainerData = trainerDoc.data();
          setTrainerName(trainerData.name || 'Trainer');
        } else {
          setErrorMessage('Trainer data not found.');
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error.message);
        setErrorMessage('Failed to fetch trainer data.');
      }
    };

    const fetchStudents = async () => {
      try {
        const studentsRef = collection(db, 'trainers', trainerID, 'students'); // Reference to students collection
        const studentsSnapshot = await getDocs(studentsRef); // Fetch documents
        const studentsData = studentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
        setErrorMessage('Failed to fetch students.');
      }
    };

    fetchTrainerData();
    fetchStudents();
  }, [trainerID]);

  // Filter students by name or ID based on the search query
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
        <Text style={styles.studentID}>ID: {item.id || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (errorMessage) {
    // Display an error message if there is an issue
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.retryButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#171717', '#444444']} style={styles.gradient}>
      <View style={styles.container}>
        {/* Trainer Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrainerProfile', { trainerID })}
            style={styles.profileTouchable}
          >
            <Image
              style={styles.trainerImage}
              source={{ uri: 'https://via.placeholder.com/150' }} // Default profile photo
            />
            <Text style={styles.trainerName}>{trainerName}</Text>
            <Text style={styles.trainerId}>@{trainerID}</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
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

        {/* Students List Section */}
        <Text style={styles.sectionTitle}>Students List</Text>
        {students.length === 0 ? (
          <View style={styles.noStudentsContainer}>
            <Text style={styles.noStudentsText}>No students joined yet.</Text>
            <Text style={styles.noStudentsSubText}>
              Ask students to join using your Trainer ID: @{trainerID}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentCard}
            contentContainerStyle={styles.studentList}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 1 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  errorText: { fontSize: 18, color: '#DA0037', textAlign: 'center' },
  retryButton: {
    backgroundColor: '#DA0037',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  retryButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
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
  studentID: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  noStudentsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  noStudentsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  noStudentsSubText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 10,
    textAlign: 'center',
  },
});
