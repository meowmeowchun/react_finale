import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function CommentBoard() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const commentRef = collection(db, "comments");

  useEffect(() => {
    const q = query(commentRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await addDoc(commentRef, {
      content: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="comment-board">
      <h2>留言區</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入留言..."
          rows={3}
        />
        <br />
        <button type="submit">送出留言</button>
      </form>

      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
}
