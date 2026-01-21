import { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  query,          
  orderBy         
} from 'firebase/firestore';
import { db } from '../Context/AuthProvider';

// Deterministic conversation ID 
function getConversationId(uid1, uid2) {
  if (!uid1 || !uid2) return null;
  const u1 = uid1.toLowerCase().trim();
  const u2 = uid2.toLowerCase().trim();
  return [u1, u2].sort().join('_');
}

export function UseChat(currentUserUid, otherUserUid) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize conversationId
  const conversationId = useMemo(() => {
    return getConversationId(currentUserUid, otherUserUid);
  }, [currentUserUid, otherUserUid]);

  useEffect(() => {
    if (!conversationId) return;

    const convoRef = doc(db, 'conversations', conversationId);
    const messagesRef = collection(convoRef, 'messages');

    
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Timestamp কে JS Date-এ কনভার্ট করা হলো (UI-তে সহজে ফরম্যাট করার জন্য)
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        console.error("Chat snapshot error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async (text) => {
    if (!conversationId || !text?.trim()) return;

    try {
      const convoRef = doc(db, 'conversations', conversationId);
      const messagesRef = collection(convoRef, 'messages');

      await addDoc(messagesRef, {
        text: text.trim(),
        senderId: currentUserUid,
        createdAt: serverTimestamp(),
        seen: false
      });
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  return {
    messages,
    sendMessage,
    loading,
    error
  };
}