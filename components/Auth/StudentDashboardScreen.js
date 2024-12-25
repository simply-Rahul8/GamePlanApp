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
  container: { flex: 1, backgroundColor: '#171717', padding: 20 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#EDEDED', textAlign: 'center', marginBottom: 10 },
  profile: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#EDEDED' },
  profileId: { fontSize: 16, color: '#CCCCCC' },
  sportSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sportButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: '#444444',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  activeSportButton: { backgroundColor: '#DA0037', borderColor: '#DA0037' },
  sportButtonText: { fontSize: 14, color: '#EDEDED', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#EDEDED', marginBottom: 10 },
  taskList: { paddingBottom: 20 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  taskImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  taskDetails: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#EDEDED' },
  taskStatus: { fontSize: 14, color: '#CCCCCC' },
  taskStatusIcon: { fontSize: 16, fontWeight: 'bold' },
  complete: { color: '#27AE60' }, // Green for complete tasks
  incomplete: { color: '#DA0037' }, // Red for incomplete tasks
});
