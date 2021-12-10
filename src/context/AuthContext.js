import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  const register = (email, password) => {
    return authApp.createUserWithEmailAndPassword( email, password);
  };

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return authApp.signOut();
  };

  const bidAuction = (auctionId, deliver) => {

    const db = firestoreApp.collection('orders');

    return db.doc(auctionId, deliver).update({
      entregado: true,
      deliver: deliver
    });
  };

  const UTaken = (OId,selectState) => {

    const db = firestoreApp.collection('orders');

    return db.doc(OId).update({
      taken:true,
      recogerEn:selectState
    });
  };

  const UStock = (IdP, qty, selectState, prevStock, global) => {

    let newStock = prevStock - qty

    /* console.log(IdP,'--', qty, '--', selectState, '--', prevStock, '--', newStock, '--', global)  */

    const db = firestoreApp.collection('items');

    return db.doc(IdP).update({
      [selectState]:newStock,
      stock:global - qty
    });   

  };

  const endAuction = (auctionId) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).delete();
  };

  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        UStock,
        UTaken,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
