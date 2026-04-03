import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result); // convert to base64
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!text && !image) return alert("Write something or add an image!");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/posts`,
        { text, image },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setText("");
      setImage("");
      onPostCreated(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating post");
    }
    setLoading(false);
  };

  return (
    <div className="create-post">
      <h3>✍️ Create Post</h3>
      <textarea
        rows="3"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="post-actions">
        <input type="file" accept="image/*" onChange={handleImage} />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
        />
      )}
    </div>
  );
}

export default CreatePost;
