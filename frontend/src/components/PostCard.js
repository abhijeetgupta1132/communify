import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PostCard({ post, currentUser, onUpdate }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");
  const isLiked = post.likes?.includes(currentUser);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `${API}/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onUpdate(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(
        `${API}/posts/${post._id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onUpdate(res.data);
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + "?post=" + post._id);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-header-left">
          <div className="avatar">{post.author[0].toUpperCase()}</div>
          <div className="post-user-info">
            <div className="username">{post.author}</div>
            <div className="handle">
              @{post.author.toLowerCase().replace(/\s/g, "")}
            </div>
            <div className="post-time">{timeAgo(post.createdAt)}</div>
          </div>
        </div>
        {post.author !== currentUser && (
          <button className="follow-btn">Follow</button>
        )}
      </div>

      {/* Content */}
      {post.text && <p className="post-text">{post.text}</p>}
      {post.image && <img src={post.image} alt="post" className="post-image" />}

      {/* Footer */}
      <div className="post-footer">
        <button
          className={`footer-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <span>{isLiked ? "❤️" : "🤍"}</span> {post.likes?.length || 0}
        </button>
        <button
          className="footer-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <span>💬</span> {post.comments?.length || 0}
        </button>
        <button className="footer-btn" onClick={handleShare}>
          <span>🔗</span> Share
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="comments-section">
          {post.comments?.map((c, i) => (
            <div key={i} className="comment-item">
              <div className="comment-avatar">{c.user[0].toUpperCase()}</div>
              <div className="comment-bubble">
                <div className="comment-user">{c.user}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            </div>
          ))}
          <div className="comment-input-row">
            <input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <button onClick={handleComment}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
