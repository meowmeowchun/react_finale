import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Comment({ productId }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    if (!productId) return;

    const q = query(
      collection(db, "comments"),
      where("productId", "==", productId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });

    return () => unsubscribe();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    localStorage.setItem("username", name);

    await addDoc(collection(db, "comments"), {
      name,
      text,
      productId,
      createdAt: serverTimestamp(),
    });

    setText("");
    setShowForm(false);
  };

  return (
    <div className="p-6 border border-base-300 rounded-xl bg-base-100 shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">留言區</h2>

      <ul className="space-y-3 mb-4">
        {comments.map((c) => (
          <li key={c.id} className="p-4 rounded-lg bg-base-200 text-base-content">
            <span className="font-semibold text-secondary">{c.name}</span>
            <p className="mt-1 whitespace-pre-wrap">{c.text}</p>
          </li>
        ))}
      </ul>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          新增留言
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="輸入名稱"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="輸入留言（最多140字）"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 140))}
            className="textarea textarea-bordered w-full h-24 resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content opacity-60">
              {text.length}/140 字
            </span>
            <button type="submit" className="btn btn-success">
              發佈留言
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
