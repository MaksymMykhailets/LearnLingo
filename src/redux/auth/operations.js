import { ref, set } from 'firebase/database';
import { database } from '../../db/firebaseConfig';

export const addUser = async (userId, userData) => {
  const userRef = ref(database, `users/${userId}`);
  await set(userRef, userData);
};
