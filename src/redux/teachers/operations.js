import { ref, get, child } from 'firebase/database';
import { database } from '../../db/firebaseConfig';

export const getTeachers = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `teachers`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};