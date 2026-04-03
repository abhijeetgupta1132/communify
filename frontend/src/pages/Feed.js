import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const API = "https://communify-wizt.onrender.com/api";
const TABS = ["All Post", "Most Liked", "Most Commented"];

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Post");
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [posting, setPosting] = useState(false);
  const [search, setSearch] = useState("");
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let result = [...posts];
    if (search) {
      result = result.filter(
        (p) =>
          p.author.toLowerCase().includes(search.toLowerCase()) ||
          p.text?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (activeTab === "Most Liked")
      result.sort((a, b) => b.likes.length - a.likes.length);
    else if (activeTab === "Most Commented")
      result.sort((a, b) => b.comments.length - a.comments.length);
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(result);
  }, [posts, activeTab, search]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    if (!text && !image) return alert("Add text or image!");
    setPosting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/posts`,
        { text, image },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setPosts([res.data, ...posts]);
      setText("");
      setImage("");
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error posting");
    }
    setPosting(false);
  };

  const updatePost = (updated) => {
    setPosts(posts.map((p) => (p._id === updated._id ? updated : p)));
  };

  return (
    <div className="feed-page">
      <div className="search-bar">
        <span>🔍</span>
        <input
          placeholder="Search posts, users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading posts...
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No posts yet</p>
          <span>Be the first to share something!</span>
        </div>
      ) : (
        filtered.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={currentUser}
            onUpdate={updatePost}
          />
        ))
      )}

      <button className="fab" onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle"></div>
            <h3>✍️ Create Post</h3>
            <div className="modal-user-row">
              <div className="modal-avatar">
                {currentUser?.[0]?.toUpperCase()}
              </div>
              <div className="modal-username">{currentUser}</div>
            </div>
            <textarea
              rows="4"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {image && <img src={image} alt="preview" className="img-preview" />}
            <div className="modal-actions">
              <label>
                📷 Add Photo
                <input type="file" accept="image/*" onChange={handleImage} />
              </label>
              <button
                className="modal-submit"
                onClick={handlePost}
                disabled={posting}
              >
                {posting ? "⏳ Posting..." : "🚀 Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
