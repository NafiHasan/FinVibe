import "../styles/Post.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaComment, FaBookmark } from "react-icons/fa";
import stockimage from "../images/stockimage.jpg";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const navigate = useNavigate();

  return (
    <div className="postMainBody">
      <PostHeader {...props} />
      <PostBody {...props} />
      <PostFooter {...props} />
    </div>
  );
}

function PostHeader(props) {
  return (
    <div className="postHeader">
      <img src={props.image || stockimage} className="postUserIcon" />
      <button className="postUsernameButton">{props.username}</button>

      <button className="postOptionsButton">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "4vh",
          }}
        >
          <HiOutlineDotsCircleHorizontal />
        </IconContext.Provider>
      </button>
    </div>
  );
}

function PostBody(props) {
  return (
    <div className="postBody">
      <PostImage {...props} />
      <PostTag {...props} />
      <PostText {...props} />
    </div>
  );
}

function PostImage(props) {
  return (
    <div>
      <img src={props.image || stockimage} className="postImage" alt="Post" />
    </div>
  );
}

function PostTag(props) {
  return (
    <div>
      <button className="postTag">{props.tag}</button>
    </div>
  );
}

function PostText(props) {
  return <div className="postText">{props.content}</div>;
}

function PostFooter(props) {
  const navigate = useNavigate();

  return (
    <div className="postFooter">
      <button className="postCommentButton">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <BiSolidUpvote />
        </IconContext.Provider>
      </button>

      <button className="postCommentButton">
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

      <button
        className="postCommentButton"
        onClick={() =>
          navigate("/expandedpost", { state: { username: props.username } })
        }
      >
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <FaComment />
        </IconContext.Provider>
      </button>

      <button className="postCommentButton">
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <FaBookmark />
        </IconContext.Provider>
      </button>
    </div>
  );
}

export default Post;
