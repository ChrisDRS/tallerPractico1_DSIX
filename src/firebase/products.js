import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './config';

// Initialize Firestore
const db = getFirestore(app);

// Reference to the products collection
const productsCollection = collection(db, 'products');

// Add a new product
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsCollection, productData);
        return { id: docRef.id, ...productData };
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(productsCollection);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting products: ", error);
        throw error;
    }
};

// Get a single product by ID
export const getProduct = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting product: ", error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (id, productData) => {
    try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, productData);
        return { id, ...productData };
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
}; 