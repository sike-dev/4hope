import { createContext } from "react";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export default function useFirebaseAuth() {
  // ...
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email, password) =>
    Firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () => Firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
