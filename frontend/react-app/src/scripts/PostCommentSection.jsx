import "../styles/PostCommentSection.css";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import axios from "axios";

function PostCommentSection(props) {
  console.log("PostCommentSection props", props);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  function handleCommentChange(event) {
    setNewComment(event.target.value);
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:8000/comments/${props.post_id}`,
        {
          comment_id: Date.now(), // Generate a unique ID for the new comment
          post_id: props.post_id,
          username: props.current_user,
          content: newComment,
          upvote_count: 0,
          downvote_count: 0,
          upvoted_by: [],
          downvoted_by: [],
        }
      );
      // After successfully adding a comment, fetch the updated comments
      await getComments(); // Ensure getComments completes before setting state
      setNewComment(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  async function getComments() {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/${props.post_id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  return (
    <div className="postCommentSectionMainBody">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <textarea
          className="commentBox"
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button className="addCommentButton" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <text style={{ fontFamily: "Montserrat", marginTop: "5vh" }}>
        Comments
      </text>
      <div>
        <PostCommentsBody
          comments={comments}
          current_user={props.current_user}
          getComments={getComments} // Pass the function down to update comments
        />
      </div>
    </div>
  );
}

function PostCommentsBody({ comments, current_user, getComments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.comment_id}
          post_id={comment.post_id}
          data={comment}
          current_user={current_user}
          getComments={getComments}
        />
      ))}
    </div>
  );
}

export default PostCommentSection;
