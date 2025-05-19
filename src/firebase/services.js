import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './config';

// Initialize Firestore
const db = getFirestore(app);

// Reference to the services collection
const servicesCollection = collection(db, 'services');

// Add a new service
export const addService = async (serviceData) => {
    try {
        const docRef = await addDoc(servicesCollection, serviceData);
        return { id: docRef.id, ...serviceData };
    } catch (error) {
        console.error("Error adding service: ", error);
        throw error;
    }
};

// Get all services
export const getServices = async () => {
    try {
        const querySnapshot = await getDocs(servicesCollection);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting services: ", error);
        throw error;
    }
};

// Get a single service by ID
export const getService = async (id) => {
    try {
        const docRef = doc(db, 'services', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting service: ", error);
        throw error;
    }
};

// Update a service
export const updateService = async (id, serviceData) => {
    try {
        const docRef = doc(db, 'services', id);
        await updateDoc(docRef, serviceData);
        return { id, ...serviceData };
    } catch (error) {
        console.error("Error updating service: ", error);
        throw error;
    }
};

// Delete a service
export const deleteService = async (id) => {
    try {
        const docRef = doc(db, 'services', id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting service: ", error);
        throw error;
    }
}; 