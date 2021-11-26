import { useEffect, useState } from 'react';
import { firestoreApp } from '../config/firebase';

export const useItems = (collection) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const subscribe = firestoreApp.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });

      setItems(documents);
    });

    return () => subscribe();
  }, [collection]);

  return { items };
};