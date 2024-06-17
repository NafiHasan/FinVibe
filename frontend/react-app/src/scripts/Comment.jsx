import "../styles/Comment.css";
import Reply from "./Reply";
import usericon from "../images/usericon.png";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import axios from "axios";

function Comment(props) {
  return (
    <div className="commentMainBody">
      <CommentBody {...props} />
    </div>
  );
}

function CommentBody(props) {
  // console.log("comment body props", props);

  const comment_id = props.data.comment_id;
  const upvoted_by = props.data.upvoted_by || [];
  const downvoted_by = props.data.downvoted_by || [];
  const username = props.current_user;
  const upvote_count = props.data.upvote_count || 0;
  const downvote_count = props.data.downvote_count || 0;
  // console.log("username ", username);
  // const { comment_id, upvoted_by, downvoted_by, upvote_count, downvote_count } =
  // props.data;
  // const username = props.current_user;

  const [isUpvotePressed, setIsUpvotePressed] = useState(
    upvoted_by.includes(username)
  );
  const [isDownvotePressed, setIsDownvotePressed] = useState(
    downvoted_by.includes(username)
  );
  const [score, setScore] = useState(upvote_count - downvote_count);

  useEffect(() => {
    setScore(upvote_count - downvote_count);
    setIsUpvotePressed(upvoted_by.includes(username));
    setIsDownvotePressed(downvoted_by.includes(username));
  }, [upvote_count, downvote_count, upvoted_by, downvoted_by, username]);

  const doUpvote = async () => {
    // console.log("upvote", comment_id, username);
    try {
      const response = await axios.post(
        `http://localhost:8000/upvote_comment/${comment_id}/${username}`
      );
      const updatedComment = response.data;
      setScore(updatedComment.upvote_count - updatedComment.downvote_count);
      setIsUpvotePressed(!isUpvotePressed);
      setIsDownvotePressed(false);
      props.getComments(); // Fetch updated comments
    } catch (error) {
      console.error("Error upvoting comment:", error);
    }
  };

  const doDownvote = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/downvote_comment/${comment_id}/${username}`
      );
      const updatedComment = response.data;
      setScore(updatedComment.upvote_count - updatedComment.downvote_count);
      setIsUpvotePressed(false);
      setIsDownvotePressed(!isDownvotePressed);
      props.getComments(); // Fetch updated comments
    } catch (error) {
      console.error("Error downvoting comment:", error);
    }
  };

  return (
    <div className="commentBody">
      <ProfilePlus {...props} />

      <div className="commentText">{props.data.content}</div>

      {/* <div className="commentInputBox">
        <textarea
          type="text"
          placeholder="Reply"
          style={{ width: "60%" }}
        ></textarea>
      </div> */}

      <div>
        <text style={{ marginLeft: "1%", marginRight: "1%" }}>{score}</text>
        {/* <button className="replyButton">Reply</button> */}

        <button className="commentReplyButton" onClick={doUpvote}>
          <IconContext.Provider
            value={{
              color: "white",
              className: "global-class-name",
              size: "3vh",
              marginLeft: "3vh",
            }}
          >
            <BiSolidUpvote />
          </IconContext.Provider>
        </button>

        <button className="commentReplyButton" onClick={doDownvote}>
          <IconContext.Provider
            value={{
              color: "white",
              className: "global-class-name",
              size: "3vh",
            }}
          >
            <BiSolidDownvote />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

function ProfilePlus(props) {
  const [showOptions, setShowOptions] = useState(false);
  // const [thisUserComment, setThisUserComment] = useState(true);

  function doesCommentBelongToCurrentUser() {
    setShowOptions(!showOptions);
  }

  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/delete_comment/${props.data.comment_id}`
      );
      props.getComments(); // Fetch updated comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const thisUserComment = props.current_user === props.data.username;

  return (
    <div className="profilePlusComment">
      <img src={usericon} className="userIconBodyComment" />

      <button className="sidebarUserButtonComment">
        {props.data.username}
      </button>

      <div className="commentOptions">
        <button
          className="commentOptionsButton"
          onClick={doesCommentBelongToCurrentUser}
        >
          <IconContext.Provider
            value={{
              color: "black",
              className: "global-class-name",
              size: "4vh",
            }}
          >
            <HiOutlineDotsCircleHorizontal />
          </IconContext.Provider>
        </button>
      </div>

      {showOptions &&
        (thisUserComment ? (
          <div
            style={{ backgroundColor: "red", height: "5vh", marginTop: "2vh" }}
          >
            <div className="postOptionItem">Edit Comment</div>
            <div className="postOptionItem" onClick={handleDeleteComment}>
              Delete Comment
            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "red", height: "5vh", marginTop: "2vh" }}
          >
            <div className="postOptionItem">Hide Comment</div>
            <div className="postOptionItem">Follow User</div>
          </div>
        ))}
    </div>
  );
}

export default Comment;
