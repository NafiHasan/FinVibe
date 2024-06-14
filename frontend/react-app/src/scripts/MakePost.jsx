import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MakePost.css";
import axios from "axios";
import { useState } from "react";

function MakePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username;

  return (
    <div>
      <NavigationBar username={username} />
      <MakePostBody username={username} navigate={navigate} />
    </div>
  );
}

function MakePostBody({ username, navigate }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const tag = tags;
  async function createPost() {
    const post = {
      post_id: 0,
      username,
      content,
      tag,
      image: image || null,
      comment_count: 0,
      upvote_count: 0,
      downvote_count: 0,
    };

    try {
      await axios.post("http://localhost:8000/create_post", post);
      navigate("/community", { state: { username } });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div className="makePostBody">
      <div className="left">
        <input
          type="text"
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="postTextBox"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="postTextBox"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="postTextBox"
        />
      </div>

      <div className="right">
        <button onClick={createPost}>Post</button>
      </div>
    </div>
  );
}

export default MakePost;
