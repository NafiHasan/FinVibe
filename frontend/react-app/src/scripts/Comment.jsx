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
  const [showOptions, setShowOptions] = useState(true);
  const [thisUserComment, setThisUserComment] = useState(true);

  //only this

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

  //this
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
    console.log("upvote", comment_id, username);
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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="commentBody">
        <ProfilePlus
          {...props}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          thisUserComment={thisUserComment}
          setThisUserComment={setThisUserComment}
        />

        {/* <hr></hr> */}

        <div className="commentText">{props.data.content}</div>
        {/* <div className="commentText">this is a comment</div>  */}

        {/* <div className="commentInputBox">
        <input
          type="text"
          placeholder="Reply"
          style={{ width: "80%" }}
        ></input>

        <button className="commentReplyButton">Reply</button>
      </div> */}

        <div
          style={{
            margin: "1%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginLeft: "1%", marginRight: "1%", flex: "1" }}>
            <text
              style={{
                border: "1px solid #242124",
                borderRadius: "100px",
                width: "2vh",
              }}
            >
              {score}
            </text>
          </div>
          {/* <button className="replyButton">Reply</button> */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: "white",
              flex: "1",
            }}
          >
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
      </div>
      {showOptions &&
        (thisUserComment ? (
          <div
            style={{
              backgroundColor: "white",
              height: "5vh",
              marginTop: "2vh",
            }}
          >
            <div className="commentOptionItem">Edit Comment</div>
            <div className="commentOptionItem" onClick={handleDeleteComment}>
              Delete Comment
            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "red", height: "5vh", marginTop: "2vh" }}
          >
            <div className="commentOptionItem">Hide Comment</div>
            <div className="commentOptionItem">Follow User</div>
          </div>
        ))}
    </div>
  );
}

function ProfilePlus(props) {
  function doesCommentBelongToCurrentUser() {
    props.setShowOptions(!props.showOptions);
  }

  // const handleDeleteComment = async () => {
  //   // try {
  //   //   await axios.delete(
  //   //     `http://localhost:8000/delete_comment/${props.data.comment_id}`
  //   //   );
  //   //   props.getComments(); // Fetch updated comments after deletion
  //   // } catch (error) {
  //   //   console.error("Error deleting comment:", error);
  //   // }
  // };

  const thisUserComment = props.current_user === props.data.username;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
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
      </div>
    </div>
  );
}

export default Comment;
