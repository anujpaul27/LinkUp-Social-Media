import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Context/AuthProvider";

async function CreateConversation (conversationID, uid1, uid2) {
    const convoRef = doc(db, "conversations", conversationID)

    await setDoc (convoRef, {
        members: [uid1,uid2],
        createAt: serverTimestamp(),
        lastMessage: "" 
    })

    return (
        <div>
            
        </div>
    );
};

export default CreateConversation;