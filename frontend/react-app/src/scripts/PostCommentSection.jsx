import "../styles/PostCommentSection.css";
import Comment from "./Comment";
import { useState, useEffect } from "react";

function PostCommentSection(props) {
  const [newComment, setNewComment] = useState("");

  function handleCommentChange(event) {
    setNewComment(event.target.value);
  }

  function handleAddComment() {}

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
        <PostCommentsBody {...props.post} current_user={props.current_user} />
      </div>
    </div>
  );
}
//   return (
//     <div className="postCommentSectionMainBody">
//       Comments
//       <PostCommentsBody {...props.post} current_user={props.current_user} />
//     </div>
//   );
// }

function PostCommentsBody(props) {
  // Get all the comments from the database by the post id
  // For each comment, create a Comment component
  // Pass the comment data as props to the Comment component
  // Pass the current_user data as props to the Comment component

  const [comments, setComments] = useState([]);

  // get comments for the post from backend
  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    fetch(`/api/comments/${props.post_id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        // handle the error
      });
  }
  console.log("comments", comments);

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          post_id={props.post.post_id}
          data={comment}
          current_user={props.current_user}
        />
      ))}
    </div>
  );
}

export default PostCommentSection;
