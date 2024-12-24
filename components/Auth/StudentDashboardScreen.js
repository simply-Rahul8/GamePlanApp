import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function StudentDashboardScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Warm-up', status: 'Complete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
    { id: '2', title: 'Dribbling', status: 'Complete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
    { id: '3', title: 'Shooting', status: 'Incomplete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
    { id: '4', title: 'Passing', status: 'Incomplete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
    { id: '5', title: 'Defense', status: 'Incomplete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
    { id: '6', title: 'Cool Down', status: 'Complete', image: 'https://via.placeholder.com/80', sport: 'Soccer' },
  ]);
  const [selectedSport, setSelectedSport] = useState('Soccer');

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Image source={{ uri: item.image }} style={styles.taskImage} />
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>{item.status}</Text>
      </View>
      <Text style={[styles.taskStatusIcon, item.status === 'Complete' ? styles.complete : styles.incomplete]}>
        {item.status === 'Complete' ? '✔️' : '❌'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Dashboard</Text>
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Oliver Smith</Text>
            <Text style={styles.profileId}>@oliversmith</Text>
          </View>
        </View>
      </View>

      {/* Sport Selector */}
      <View style={styles.sportSelector}>
        <TouchableOpacity
          style={[styles.sportButton, selectedSport === 'Soccer' ? styles.activeSportButton : {}]}
          onPress={() => setSelectedSport('Soccer')}
        >
          <Text style={styles.sportButtonText}>Soccer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sportButton, selectedSport === 'Basketball' ? styles.activeSportButton : {}]}
          onPress={() => setSelectedSport('Basketball')}
        >
          <Text style={styles.sportButtonText}>Basketball</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sportButton, selectedSport === 'Tennis' ? styles.activeSportButton : {}]}
          onPress={() => setSelectedSport('Tennis')}
        >
          <Text style={styles.sportButtonText}>Tennis</Text>
        </TouchableOpacity>
      </View>

      {/* Assigned Tasks */}
      <Text style={styles.sectionTitle}>Assigned Tasks</Text>
      <FlatList
        data={tasks.filter((task) => task.sport === selectedSport)}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8fc', padding: 20 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  profile: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileId: { fontSize: 16, color: '#666' },
  sportSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sportButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  activeSportButton: { backgroundColor: '#e6f7ff', borderColor: '#36aaff' },
  sportButtonText: { fontSize: 14, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  taskList: { paddingBottom: 20 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  taskDetails: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskStatus: { fontSize: 14, color: '#666' },
  taskStatusIcon: { fontSize: 16, fontWeight: 'bold' },
  complete: { color: 'green' },
  incomplete: { color: 'red' },
});
