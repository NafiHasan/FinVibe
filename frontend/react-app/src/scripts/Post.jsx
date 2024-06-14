import "../styles/Post.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaComment, FaBookmark } from "react-icons/fa";
import stockimage from "../images/stockimage.jpg";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

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
  console.log("props", props);
  const [showOptions, setShowOptions] = useState(false);

  const handleDeletePost = async () => {
    try {
      console.log("post id " + props.post_id);
      // Assuming postId is passed as a prop to PostHeader
      const response = await axios.delete(
        `http://localhost:8000/delete_post/${props.post_id}`
      );
      console.log("Post deleted successfully", response.data);
      props.fetchPosts();
      // Optionally, you can update the UI to reflect the post deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error or display a notification to the user
    }
  };

  return (
    <div className="postHeader">
      <img src={props.image || stockimage} className="postUserIcon" />
      <button className="postUsernameButton">{props.username}</button>

      <div className="postOptions">
        {showOptions && (
          <div className="postOptionsMenu">
            {/* Edit Post Option */}
            <button className="postOptionItem">Edit Post</button>

            {/* Delete Post Option */}
            <button
              className="postOptionItem deletePostButton"
              onClick={handleDeletePost}
            >
              Delete Post{" "}
              <IconContext.Provider
                value={{
                  color: "red", // Customize the delete icon color
                  className: "global-class-name",
                  size: "2vh", // Customize the delete icon size
                }}
              >
                <FaTrashAlt />
              </IconContext.Provider>
            </button>
          </div>
        )}

        <button
          className="postOptionsButton"
          onClick={() => setShowOptions(!showOptions)}
        >
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
