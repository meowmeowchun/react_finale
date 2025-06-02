import { useEffect, useState } from "react";
import { db } from "../firebase"; // 根據你的專案位置調整
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
      productId, // 記錄品項 ID
      createdAt: serverTimestamp(),
    });

    setText("");
    setShowForm(false);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-md mt-6">
      <h2 className="text-xl font-bold mb-2 text-gray-700">留言區</h2>

      <ul className="space-y-2 mb-4">
        {comments.map((c) => (
          <li key={c.id} className="border p-3 rounded-md bg-gray-50">
            <span className="font-semibold">{c.name}</span>
            <p className="text-gray-700 whitespace-pre-wrap">{c.text}</p>
          </li>
        ))}
      </ul>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          新增留言
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="輸入名稱"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
          <textarea
            placeholder="輸入留言（最多140字）"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 140))}
            className="w-full border rounded-md p-2 h-24 resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {text.length}/140 字
            </span>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              發佈留言
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
