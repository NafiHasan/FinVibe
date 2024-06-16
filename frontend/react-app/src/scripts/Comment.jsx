import "../styles/Comment.css";
import Reply from "./Reply";
import usericon from "../images/usericon.png";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from "react";
import { IconContext } from "react-icons";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

function Comment(props) {
  console.log("comment props", props);
  return (
    <div className="commentMainBody">
      <CommentBody />
      <Reply />
    </div>
  );
}

function CommentBody() {
  const [isUpvotePressed, setIsUpvotePressed] = useState(false);
  const [isDownvotePressed, setIsDownvotePressed] = useState(false);
  const [score, setScore] = useState(0);

  function doUpvote() {
    if (isUpvotePressed) {
      setIsUpvotePressed(false);
      setScore(score - 1);
    } else if (isDownvotePressed) {
      setIsDownvotePressed(false);
      setScore(score + 2);
      setIsUpvotePressed(true);
    } else {
      setIsUpvotePressed(true);
      setScore(score + 1);
    }
  }

  function doDownvote() {
    if (isDownvotePressed) {
      setIsDownvotePressed(false);
      setScore(score + 1);
    } else if (isUpvotePressed) {
      setIsUpvotePressed(false);
      setScore(score - 2);
      setIsDownvotePressed(true);
    } else {
      setIsDownvotePressed(true);
      setScore(score - 1);
    }
  }

  return (
    <div className="commentBody">
      <ProfilePlus />

      <div className="commentText">This is the comment text</div>

      <div className="commentInputBox">
        <textarea
          type="text"
          placeholder="Reply"
          style={{ width: "60%" }}
        ></textarea>
      </div>

      <div>
        <text style={{ marginLeft: "1%", marginRight: "1%" }}>{score}</text>
        <button className="replyButton">Reply</button>

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

function ProfilePlus() {
  const [showOptions, setShowOptions] = useState(false);
  const [thisUserComment, setThisUserComment] = useState(true);

  function doesCommentBelongToCurrentUser() {
    setShowOptions(!showOptions);
  }

  function handleDeleteComment() {}

  return (
    <div className="profilePlusComment">
      <img src={usericon} className="userIconBodyComment" />

      <button className="sidebarUserButtonComment">David Outunga</button>

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
