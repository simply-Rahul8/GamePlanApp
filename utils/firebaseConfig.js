<<<<<<< HEAD
import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth';
=======
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCoWztCI0SkAOewUPjjYFsJ-t9Htcgd7Eg",
  authDomain: "gameplan-be6a8.firebaseapp.com",
  projectId: "gameplan-be6a8",
  storageBucket: "gameplan-be6a8.appspot.com",
  messagingSenderId: "695994204932",
  appId: "1:695994204932:android:6ccc6ef7dc600518738651",
  measurementId: "G-788DS1JWN5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
// Export Firebase services
export const auth = getAuth(app);
=======
// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase Firestore and Storage services
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
export const db = getFirestore(app);
export const storage = getStorage(app);

// Firestore Functions

// Add Trainer Data
export const addTrainer = async (trainerData) => {
  try {
    await addDoc(collection(db, "trainers"), trainerData);
    console.log("Trainer added successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error adding trainer:", error);
=======
    console.error("Error adding trainer:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Add Student Data
export const addStudent = async (studentData) => {
  try {
    await addDoc(collection(db, "students"), studentData);
    console.log("Student added successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error adding student:", error);
=======
    console.error("Error adding student:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Fetch All Trainers
export const fetchTrainers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "trainers"));
    const trainers = [];
    querySnapshot.forEach((doc) => trainers.push({ id: doc.id, ...doc.data() }));
    return trainers;
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching trainers:", error);
=======
    console.error("Error fetching trainers:", error.message);
    throw error;
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Fetch All Students
export const fetchStudents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = [];
    querySnapshot.forEach((doc) => students.push({ id: doc.id, ...doc.data() }));
    return students;
  } catch (error) {
<<<<<<< HEAD
    console.error("Error fetching students:", error);
=======
    console.error("Error fetching students:", error.message);
    throw error;
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Update Trainer Data
export const updateTrainer = async (trainerId, updatedData) => {
  try {
    const trainerDoc = doc(db, "trainers", trainerId);
    await updateDoc(trainerDoc, updatedData);
    console.log("Trainer updated successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error updating trainer:", error);
=======
    console.error("Error updating trainer:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Update Student Data
export const updateStudent = async (studentId, updatedData) => {
  try {
    const studentDoc = doc(db, "students", studentId);
    await updateDoc(studentDoc, updatedData);
    console.log("Student updated successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error updating student:", error);
=======
    console.error("Error updating student:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Delete Trainer
export const deleteTrainer = async (trainerId) => {
  try {
    await deleteDoc(doc(db, "trainers", trainerId));
    console.log("Trainer deleted successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error deleting trainer:", error);
=======
    console.error("Error deleting trainer:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Delete Student
export const deleteStudent = async (studentId) => {
  try {
    await deleteDoc(doc(db, "students", studentId));
    console.log("Student deleted successfully!");
  } catch (error) {
<<<<<<< HEAD
    console.error("Error deleting student:", error);
=======
    console.error("Error deleting student:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
  }
};

// Upload File to Firebase Storage
export const uploadFile = async (file) => {
  try {
    // Convert the file URI to a Blob
    const response = await fetch(file.uri);
    const blob = await response.blob();

    // Reference the file path in Firebase Storage
<<<<<<< HEAD
    const storageRef = ref(storage, `uploads/${file.name}`); 
=======
    const storageRef = ref(storage, `uploads/${file.name}`);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);

    console.log("File uploaded successfully:", snapshot);

    // Return the file's full path
    return snapshot.metadata.fullPath;
  } catch (error) {
<<<<<<< HEAD
    console.error("Error uploading file:", error);
=======
    console.error("Error uploading file:", error.message);
>>>>>>> d25250144073fcb2eb587e0f8039f7c364e41869
    throw error;
  }
};
