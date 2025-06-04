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
  <div className="mt-6 bg-neutral text-accent p-6 space-y-6">
    {/* 標題 */}
    <h2 className="text-2xl font-extrabold tracking-wide text-primary font-[Girassol]">COMMENTS</h2>

    {/* 留言列表 */}
    <div className="space-y-6">
     {comments.map((c) => (
  <div key={c.id} className="border border-accent p-4 space-y-2">
    <div className="flex justify-between text-xs">
      <span className="uppercase font-bold text-secondary font-[Girassol]">{c.name}</span>
      <span>{new Date(c.date).toLocaleDateString("zh-TW")}</span>
    </div>
    <p className="text-sm tracking-wide leading-relaxed whitespace-pre-wrap font-[Girassol]">
      {c.text}
    </p>
  </div>
))}

    </div>

    {/* 留言表單 */}
    {showForm ? (
      <form onSubmit={handleSubmit} className="space-y-4 border border-accent p-4">
        <input
          type="text"
          placeholder="type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-neutral text-accent border border-accent px-3 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-[Girassol]"
          required
        />
        <textarea
          placeholder="add comment（140 words max）"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 140))}
          className="w-full h-24 resize-none bg-neutral text-accent border border-accent px-3 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-[Girassol]"
          required
        />
        <div className="flex justify-between items-center text-xs text-gray-400 font-[Girassol]">
  <span>{text.length}/140 words</span>
  <div className="space-x-2">
    <button
      type="button"
      onClick={() => {
        setShowForm(false);
        setText("");
      }}
      className="px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-neutral transition"
    >
      cancel
    </button>
    <button
      type="submit"
      className="px-6 py-2 bg-accent text-neutral font-bold hover:brightness-125 transition"
    >
      publish
    </button>
  </div>
</div>

      </form>
    ) : (
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-accent text-neutral font-bold hover:brightness-125 transition"
      >
        ADD COMMENT
      </button>
    )}
  </div>
);

 // return (
    <div className="p-6 border border-base-300 rounded-xl bg-base-100 shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">COMMENTS</h2>

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
  //);
}
