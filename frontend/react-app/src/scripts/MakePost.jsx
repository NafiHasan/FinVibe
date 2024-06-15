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

  function addTag(){
    
  }

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
        <textarea
          type="text"
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="postTextBox"
        />
      </div>

      <div className="right">
        <div>
          <input type = "text" placeholder="Enter Tag Name" className="tagInputBox"/>
          <button className="addTagButton" onClick={addTag}>Add</button>
        </div>

        <button onClick={createPost} className="makePostButton">Post</button>
      </div>
    </div>
  );
}

export default MakePost;
