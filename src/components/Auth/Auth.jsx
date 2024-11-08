import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../db/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { setUser, clearUser } from '../../redux/auth/slice';
import { addUser } from '../../redux/auth/operations'; 

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await addUser(user.uid, { displayName, email });

      dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {user && <p>Logged in as: {user.displayName || user.email}</p>}
    </div>
  );
};

export default Auth;
