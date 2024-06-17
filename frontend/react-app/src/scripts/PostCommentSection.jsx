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
    // console.log("new comment", newComment);
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
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  function getComments() {
    axios
      .get(`http://localhost:8000/comments/${props.post_id}`)
      .then((response) => {
        // console.log("comments", response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }

  return (
    <div className="postCommentSectionMainBody">
      <div>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div>
        Comments
        <PostCommentsBody
          comments={comments}
          current_user={props.current_user}
          getComments={getComments}
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
